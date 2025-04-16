import { Loader2Icon } from "lucide-react";
import React from "react";

function LoadingPage() {
  return (
    <div className="w-full flex h-screen bg-white items-center flex-col justify-center">
      <Loader2Icon className="animate-spin" />
      <span className="mt-2 ">Page loading...</span>
    </div>
  );
}

export default LoadingPage;
