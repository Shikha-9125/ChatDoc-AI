import { metadata } from "@/app/layout";
import { useEdgeStore } from "@/components/providers/edgestore-provider";
import { db, storage } from "@/firebase/config";
import { Button, Progress } from "@nextui-org/react";
import axios from "axios";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function UploadFromComputer({ user, onClose }: any) {
  const [file, setFile] = useState<any>();
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const [promiseMessage, setPromiseMessage] = useState("Data extracting...");
  const { edgestore } = useEdgeStore();
  const onUploading = () => {
    if (!file) {
      toast.error("Please select a file!!");
      return;
    }
    if (!user) {
      toast.error("Please login...");
      router.push("/");
    }
    if (file.size > 2000000) {
      toast.error("Max file size 2 MB");
      return;
    }
    setIsUploading(true);
    let newPromise = new Promise((resolve, reject) => {
      try {
        edgestore.publicFiles
          .upload({
            file,
            onProgressChange: (progress) => {
              console.log(progress);
              setProgress(progress);
            },
          })
          .then(async (res) => {
            let postData: any = {
              pdfName: file.name,
              username: user.displayName,
              email: user.email,
              phoneNo: user.phoneNumber,
              pdfURL: res.url,
              createdDate: serverTimestamp(),
              idPublished: false,
            };
            const ref = collection(db, `${user.email}/files/pdf`);
            let response = await addDoc(ref, postData);
            let bodyData = {
              pdfURL: res.url,
              pageNo: 1,
            };
            let data = await axios.post("/api/initial-upload-pdf", bodyData);
            await addDoc(
              collection(db, `${user?.email}/files/pdf/${response.id}/chats`),
              {
                text: data.data,
                timestamp: serverTimestamp(),
                email: "chatai@gmail.com",
                name: "Chat AI",
                sender: false,
              }
            );
            onClose();
            setIsUploading(false);
            router.push(`/pdf/${response.id}`);

            resolve(response.id);
          });
      } catch (error) {
        setIsUploading(false);

        reject("Failed upload...");
      }
    });
    toast.promise(newPromise, {
      success: "File uploaded successfully!",
      error: "Upload failed...",
      loading: "File uploading",
    });
  };
  return (
    <div className="">
      <div className="my-4 ">
        <div className="mb-1">
          {isUploading ? (
            <Progress size="sm" aria-label="Loading..." value={progress} />
          ) : (
            <></>
          )}
        </div>
        <input
          onChange={(e: any) => {
            setFile(e.target.files[0]);
          }}
          className="w-full py-1 px-2 bg-gray-200 shadow-sm border rounded-sm"
          id="file_input"
          type="file"
          accept="application/pdf"
        />
      </div>
      <div className="flex justify-end gap-3">
        <Button variant="flat" color="danger">
          Cancel
        </Button>
        <Button
          disabled={isUploading}
          onClick={onUploading}
          variant="flat"
          color="primary"
        >
          Upload
        </Button>
      </div>
    </div>
  );
}

export default UploadFromComputer;
