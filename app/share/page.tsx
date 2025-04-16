"use client";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Page() {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, []);
  return (
    <div className="flex flex-col h-screen w-full justify-center items-center">
      <Loader2Icon className="h-6 w-6 animate-spin" />
      <span>Page loading...</span>
    </div>
  );
}

export default Page;
