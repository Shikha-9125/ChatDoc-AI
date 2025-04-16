import { Tooltip } from "@nextui-org/react";
import {
  AlignRight,
  ChevronRight,
  CopyIcon,
  CornerRightDown,
  MoveRight,
} from "lucide-react";
import React, { useState } from "react";

function CopyButton({ text }: any) {
  const [isCopy, setIsCopy] = useState(false);
  const onCopy = () => {
    navigator.clipboard.writeText(text);
    setIsCopy(true);
    setTimeout(() => {
      setIsCopy(false);
    }, 2000);
  };
  return (
    <div className="ml-2">
      <button onClick={onCopy} disabled={isCopy} className="">
        {!isCopy ? (
          <Tooltip content="Copy Message">
            <CopyIcon className="h-3 w-3 hover:text-blue-600" />
          </Tooltip>
        ) : (
          <ChevronRight className="h-4 w-4  text-green-500 " />
        )}
      </button>
    </div>
  );
}

export default CopyButton;
