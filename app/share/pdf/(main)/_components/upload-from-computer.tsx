import { useEdgeStore } from "@/components/providers/edgestore-provider";
import { db } from "@/firebase/config";
import { Button, Progress } from "@nextui-org/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function UploadFromComputer({ user, onClose }: any) {
  const [file, setFile] = useState<any>();
  const [isUploading, setInUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
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
    let newPromise = new Promise((resolve, reject) => {
      try {
        edgestore.publicFiles
          .upload({
            file,
            onProgressChange: (progress) => {
              setProgress(progress);
            },
          })
          .then((res) => {
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
            addDoc(ref, postData).then((res: any) => {
              router.push(`/pdf/${res.id}`);
              onClose();
              resolve(res.id);
            });
          });
      } catch (error) {
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
          data-max-size="1024"
        />
        <span className="text-sm mt-1 text-gray-600">Max 1 MB file</span>
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
