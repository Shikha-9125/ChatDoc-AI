import { StickyNote } from "lucide-react";
import React from "react";

function NotAMember() {
  return (
    <div className="w-full bg-white h-screen flex items-center justify-center flex-col">
      <StickyNote className="h-6 w-6 " />
      <span className="mt-2"> You are not a member</span>
    </div>
  );
}

export default NotAMember;
