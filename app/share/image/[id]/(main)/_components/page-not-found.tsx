import { StickyNote } from "lucide-react";
import React from "react";

function PageNotFound() {
  return (
    <div className="w-full bg-white h-screen flex items-center justify-center flex-col">
      <StickyNote className="h-6 w-6 " />
      <span className="mt-2"> Page Not Found</span>
    </div>
  );
}

export default PageNotFound;
