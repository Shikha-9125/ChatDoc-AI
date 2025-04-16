import { Loader2Icon } from "lucide-react";
import React from "react";

function LoadingPdf() {
  return (
    <div className="h-full justify-center items-center flex flex-col bg-white w-full">
      <Loader2Icon className="h-6 w-6 animate-spin" />
      <span className="mt-2">Loading pdf</span>
    </div>
  );
}

export default LoadingPdf;
