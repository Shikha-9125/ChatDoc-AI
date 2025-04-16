import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Tooltip,
} from "@nextui-org/react";
import { ImageIcon, MailIcon, Pencil, Share as ShareIcon } from "lucide-react";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import getId from "@/lib/get-route-id";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
function Rename({ imageDocument, user }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [changeName, setChangeName] = useState(imageDocument?.imageName);
  const pathname = usePathname();
  const id = getId(pathname);
  const onRenameChange = (onClose: any) => {
    if (!changeName || changeName.length <= 0) {
      toast.error("Please enter name...");
      return;
    }
    const docRef = doc(db, `${user?.email}/files/image/${id}`);
    const updateData = {
      imageName: changeName,
    };
    let promise = new Promise((resolve, reject) => {
      try {
        updateDoc(docRef, updateData)
          .then((res) => {
            onClose();
            resolve("Update image name...");
          })
          .catch((error: any) => {
            throw new Error("Please try again...");
          });
      } catch (error) {
        reject("Please try again...");
      }
    });
    toast.promise(promise, {
      success: "Image name changed...",
      loading: "Image name changing...",
      error: "Please try again",
    });
  };
  return (
    <>
      <Tooltip content="Rename">
        <button
          className="hover:text-blue-500"
          onClick={() => {
            setChangeName(imageDocument?.imageName);
            onOpen();
          }}
        >
          <Pencil className="h-4 w-4" />
        </button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Rename image
              </ModalHeader>
              <ModalBody>
                <Input
                  value={changeName}
                  onChange={(e: any) => {
                    setChangeName(e.target.value);
                  }}
                  type="text"
                  placeholder="image.png"
                  labelPlacement="outside"
                  startContent={
                    <ImageIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button onClick={() => onRenameChange(onClose)} color="primary">
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Rename;
