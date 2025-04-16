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
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import UploadFromComputer from "./upload-from-computer";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { PenBoxIcon } from "lucide-react";

function AddNewImage({ user, documents }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const onModal = () => {
    if (documents?.length >= 15) {
      toast.error("Max file limit reached");
      return;
    } else {
      onOpen();
    }
  };
  return (
    <>
      <button
        className="w-full px-2 hover:bg-[#ececec] gap-2 py-2 flex items-center justify-start rounded-lg mt-4"
        onClick={onModal}
      >
        <span>
          <PenBoxIcon size={20} />
        </span>
        New chat
      </button>
      <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add new pdf
              </ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-col">
                  <Tabs aria-label="Options">
                    <Tab key="computer" title="Computer">
                      <UploadFromComputer onClose={onClose} user={user} />
                    </Tab>
                  </Tabs>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddNewImage;
