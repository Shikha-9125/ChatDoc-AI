"use client";
import { auth } from "@/firebase/config";
import { ImageIcon, Loader2Icon } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";

function Page() {
  const { theme, setTheme } = useTheme();
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  if (loading) {
    return (
      <>
        <div className="h-screen flex flex-col justify-center w-full items-center">
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
    <div className={`h-screen flex-col flex items-center w-full ${theme === "light" ? "bg-white text-black" : "bg-[#171717] text-white"} justify-center`}>
      <ImageIcon className="h-6 w-6" />
      <span className="mt-2">Please select an image</span>
    </div>
  );
}

export default Page;
