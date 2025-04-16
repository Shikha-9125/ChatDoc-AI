import { Button, Input } from "@nextui-org/react";
import { FileText, MailIcon, Text } from "lucide-react";
import React from "react";

function UploadFromURL() {
  return (
    <div className="">
      <div className="my-2">
        <Input
          type="email"
          placeholder="https://www.youtube.com/ujjawa_rachhhoya"
          labelPlacement="outside"
          startContent={
            <FileText className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
      </div>
      <div className="flex justify-end gap-3">
        <Button variant="flat" color="danger">
          Cancel
        </Button>
        <Button variant="flat" color="primary">
          Upload
        </Button>
      </div>
    </div>
  );
}

export default UploadFromURL;
