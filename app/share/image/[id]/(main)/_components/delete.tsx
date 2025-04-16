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
import {
  DeleteIcon,
  DownloadCloud,
  Pencil,
  RotateCcwIcon,
  Share as ShareIcon,
  Trash,
  Trash2Icon,
} from "lucide-react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { usePathname, useRouter } from "next/navigation";
import getId from "@/lib/get-route-id";
import toast from "react-hot-toast";
import { useEdgeStore } from "@/components/providers/edgestore-provider";
function Delete({ user, imageDocument }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const pathname = usePathname();
  const id = getId(pathname);
  const router = useRouter();
  const { edgestore } = useEdgeStore();
  const deleteDocument = () => {
    let newPromise = new Promise(async (resolve, reject) => {
      try {
        const documentRef = doc(db, `${user?.email}/files/image/${id}`);
        await deleteDoc(documentRef);
        router.push("/image");
        resolve("Document deleted...");
      } catch (error) {
        reject("Please try again...");
      }
    });
    toast.promise(newPromise, {
      success: "Document deleted...",
      error: "Please try again...",
      loading: "Document deleteting..",
    });
  };
  return (
    <>
      <Tooltip content="Delete document">
        <button className="hover:text-blue-500" onClick={onOpen}>
          <Trash2Icon className="h-4 w-4 text-red-500" />
        </button>
      </Tooltip>

      <Modal
        size="xl"
        placement="center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Document
              </ModalHeader>
              <ModalBody>
                <p>Do you really want to delete this document?</p>
                <p className="text-gray-400">
                  This will permanently delete the chat and PDF content from
                  Chat Pdf.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={deleteDocument}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Delete;
