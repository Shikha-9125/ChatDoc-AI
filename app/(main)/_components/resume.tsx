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
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, provider } from "@/firebase/config";
import { signInWithPopup, signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { LockIcon, LogInIcon, MailIcon } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

function ResumeButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const openModal = () => {
    if (user) {
      router.push("/resume");
      return;
    } else {
      onOpen();
    }
  };

  const onLoginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        router.push("/resume");
        toast.success("Sign in successfully...");
      })
      .catch((err) => {
        toast.error("Please try again...");
      });
  };
  return (
    <>
      <Button radius="full" size="lg" onPress={openModal} color="primary">
        Try Resume
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody className="mb-4">
                <Button
                  onClick={onLoginWithGoogle}
                  className="w-full"
                  startContent={<LogInIcon />}
                >
                  Login with google
                </Button>

              </ModalBody>

            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ResumeButton;
