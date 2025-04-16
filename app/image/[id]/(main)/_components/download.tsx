import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import { DownloadCloud, Pencil, Share as ShareIcon } from "lucide-react";
import toast from "react-hot-toast";
function Download({ chatData }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const exportChat = () => {
    let promise = new Promise((resolve, reject) => {
      try {
        let filterText = chatData
          ?.map((doc: any) => {
            if (doc.msgBy) {
              return `Me: ${doc.text}`;
            } else {
              return `Chat PDF: ${doc.text}`;
            }
          })
          .join("\n\n");
        const blob = new Blob([filterText], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "export_chat.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        resolve("Chat export");
      } catch (error) {
        reject("Please try again...");
      }
    });
    toast.promise(promise, {
      success: "Chat exported...",
      loading: "Exporting chat...",
      error: "Please try again...",
    });
  };
  return (
    <>
      <Tooltip content="Export Chat">
        <button className="hover:text-blue-500" onClick={exportChat}>
          <DownloadCloud className="h-4 w-4" />
        </button>
      </Tooltip>
    </>
  );
}

export default Download;
