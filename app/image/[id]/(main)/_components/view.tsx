/* eslint-disable @next/next/no-img-element */
import { Tooltip } from "@nextui-org/react";
import { EyeIcon, ViewIcon } from "lucide-react";
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
function View({ imageDocument }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Tooltip content="View">
        <button className="hover:text-blue-500" onClick={onOpen}>
          <EyeIcon className="h-4 w-4" />
        </button>
      </Tooltip>
      <Modal
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
        backdrop="opaque"
        size="5xl"
        isOpen={isOpen}
        placement="center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">View</ModalHeader>
              <ModalBody>
                <img
                  className="max-h-[80vh]"
                  src={imageDocument?.imageURL}
                  alt=""
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default View;
