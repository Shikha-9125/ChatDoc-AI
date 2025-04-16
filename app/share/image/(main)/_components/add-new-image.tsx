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
      <Button
        className="w-full mt-4 font-semibold relative shadow-lg"
        radius="none"
        onPress={onModal}
      >
        Add New Image
      </Button>
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
