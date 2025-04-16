import { StickyNote } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

function PageNotFound() {
  const { theme, setTheme } = useTheme();
  return (
    <div className={`  ${theme === "light" ? "bg-white" : "bg-[#2c2c2c]"} w-full  h-screen flex items-center justify-center flex-col`}>
      <StickyNote className="h-6 w-6 " />
      <span className="mt-2"> Page Not Found</span>
    </div>
  );
}

export default PageNotFound;
