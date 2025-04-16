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

function ImageButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const openModal = () => {
    if (user) {
      router.push("/image");
      return;
    } else {
      onOpen();
    }
  };

  const onLoginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        router.push("/image");
        toast.success("Sign in successfully...");
      })
      .catch((err) => {
        toast.error("Please try again...");
      });
  };
  return (
    <>
      <Button radius="full" size="lg" onPress={openModal}>
        Try Image&apos;s
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
                {/* <Button className="w-full" startContent={<GitHubLogoIcon />}>
                  Login with github
                </Button> */}
                {/* <hr />
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div> */}
              </ModalBody>
              {/* <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ImageButton;
