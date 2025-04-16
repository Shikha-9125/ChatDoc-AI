import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import {
  DownloadCloud,
  Pencil,
  RotateCcwIcon,
  Share as ShareIcon,
} from "lucide-react";
import { Tooltip } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import getId from "@/lib/get-route-id";
import { collection, deleteDoc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import toast from "react-hot-toast";

function Reset({ user }: any) {
  const pathname = usePathname();
  let id = getId(pathname);
  const resetChat = async () => {
    const collectionRef = collection(
      db,
      `${user?.email}/files/pdf/${id}/chats`
    );
    let newPromise = new Promise(async (resolve, reject) => {
      try {
        const querySnapshot = await getDocs(collectionRef);
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
        resolve("Chat cleared...");
      } catch (error) {
        reject("Please try again...");
      }
    });
    toast.promise(newPromise, {
      success: "Chat cleared...",
      error: "Please try again",
      loading: "Chat clearing...",
    });
  };
  return (
    <>
      <Tooltip content="reset chat">
        <button onClick={resetChat} className="hover:text-blue-500">
          {" "}
          <RotateCcwIcon className="h-4 w-4 " />
        </button>
      </Tooltip>
    </>
  );
}

export default Reset;
