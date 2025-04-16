import { Loader2Icon } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

function LoadingPage() {
  const { theme, setTheme } = useTheme();
  return (
    <div className={` ${theme === "light" ? "bg-white text-black" : "bg-[#2c2c2c] text-white"} w-full flex h-screen  items-center flex-col justify-center`}>
      <Loader2Icon className="animate-spin " />
      <span className="mt-2  ">Page loading...</span>
    </div>
  );
}

export default LoadingPage;
