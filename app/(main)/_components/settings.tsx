"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Divider,
} from "@nextui-org/react";
import { Loader, Settings, Settings2, Settings2Icon } from "lucide-react";
import { ThemeSwitcher } from "@/components/ui/theme-switch";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import ThemeButton from "./theme-button";

function SettingButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = useState<any>("photos");

  return (
    <>
      <Button
        size="sm"
        startContent={<Settings size={20} />}
        className="w-full flex justify-start"
        onPress={onOpen}
      >
        Settings
      </Button>
      <Modal placement="top" size="xl" backdrop="opaque" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                My settings
              </ModalHeader>
              <Divider />
              <ModalBody>
                <div className="flex w-full flex-col">
                  <Tabs
                    aria-label="Options"
                    selectedKey={selected}
                    onSelectionChange={setSelected}
                  >
                    <Tab key="photos" title={
                      <div className="flex items-center space-x-2">
                        <Settings size={16} />
                        <span>General</span>

                      </div>
                    }>
                      <div className="space-y-2">
                        <ThemeButton />
                      </div>
                    </Tab>
                    <Tab key="music" title={
                      <div className="flex items-center space-x-2">
                        <Settings2Icon size={16} />
                        <span>Advance</span>

                      </div>
                    }>
                      <div className="flex justify-center space-x-2">
                        <span>Comming soon..</span>
                        <Loader className="animate-spin" />
                      </div>
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

export default SettingButton;
