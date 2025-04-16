"use client";
import { Button } from "@nextui-org/react";
import { Cloud, File, Loader2Icon, UploadCloudIcon } from "lucide-react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import Sidebar from "./_components/sidebar";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";
import { useTheme } from "next-themes";

function Page() {
  const { theme, setTheme } = useTheme();
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  if (loading) {
    return (
      <>
        <div className="h-screen flex flex-col w-full justify-center items-center">
          <Loader2Icon className="h-6 w-6 animate-spin" />
          <span>Loading page...</span>
        </div>
      </>
    );
  }
  if (!user) {
    router.push("/");
    return;
  }

  return (
    <>
      <div
        className={`flex h-screen ${theme === "light" ? "bg-white text-black" : "bg-[#2c2c2c] text-white"
          } flex-col items-center w-full    justify-center px-4`}
      >
        <File className="h-6 w-6" />
        <p className="mt-2 text-center">Please select a pdf file.</p>
      </div>
    </>
  );
}

export default Page;
