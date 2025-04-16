/* eslint-disable @next/next/no-img-element */
"use client";
import { Button, Input } from "@nextui-org/react";
import {
  ChevronDown,
  ChevronUp,
  Loader2,
  Loader2Icon,
  Search,
  SearchCheckIcon,
  SearchIcon,
} from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useResizeDetector } from "react-resize-detector";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import SimpleBar from "simplebar-react";
import Image from "next/image";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
function ShowImage({ imageDocument, loadingImage }: any) {
  const [numPages, setNumPages] = useState<any>();
  const [currPage, setCurrPage] = useState<number>(1);
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([1]));
  const [scale, setScale] = useState<number>(1);
  const selectedValue: any = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  const { width, ref } = useResizeDetector();
  if (loadingImage) {
    return (
      <div className="w-full h-screen justify-center  rounded-sm shadow flex flex-col items-center bg-white px-2">
        <Loader2Icon className="h-6 w-6 animate-spin" />
        <span className="mt-2">Loading image...</span>
      </div>
    );
  }
  return (
    <div className="w-full h-screen border justify-center  rounded-sm shadow- flex flex-col items-center bg-white px-2">
      <div className="h-14 w-full  items-center flex justify-start">
        <h2 className="lg:block hidden font-bold">
          {imageDocument?.imageName}
        </h2>
      </div>
      <div className="h-full flex justify-center items-center">
        <img
          alt="img.png"
          className="shadow-large max-h-[90vh] rounded-lg"
          src={`${imageDocument?.imageURL}`}
        />
      </div>
    </div>
  );
}

export default ShowImage;
