"use client";
import { Button, Input } from "@nextui-org/react";
import {
  ChevronDown,
  ChevronUp,
  Loader2,
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
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
function ShowPdf({ pdfDocument, setPageNo }: any) {
  const [numPages, setNumPages] = useState<any>();
  const [currPage, setCurrPage] = useState<number>(1);
  const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([1]));
  const [scale, setScale] = useState<number>(1);
  const selectedValue: any = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  let url = pdfDocument?.pdfURL;
  const { width, ref } = useResizeDetector();
  return (
    <div className="w-full h-full  rounded-sm shadow flex flex-col items-center">
      <div className="h-14 w-full  dark:bg-gray-800 bg-white flex justify-between items-center   px-4">
        <div className="flex items-center gap-1.5">
          <Button
            disabled={currPage <= 1}
            onClick={() => {
              setCurrPage(Math.max(currPage - 1, 1));
              setPageNo(Math.max(currPage - 1, 1));
            }}
            size="sm"
            variant="light"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1.5">
            <input
              onChange={(e: any) => {
                let enterPage = Number(e.target.value);
                if (enterPage <= 0) return;
                else if (enterPage > numPages) return;
                setCurrPage(Math.min(enterPage, numPages));
                setPageNo(Math.min(enterPage, numPages));
              }}
              accept="number"
              value={currPage}
              className="w-12 px-2 h-8 border rounded-sm "
            />
            <p className="text-zinc-700 text-sm space-x-1">
              <span className="dark:text-white text-black">/</span>
              <span className="dark:text-white text-black">
                {numPages ?? "x"}{" "}
              </span>
            </p>
          </div>
          <Button
            disabled={currPage >= numPages}
            onClick={() => {
              setCurrPage(Math.min(currPage + 1, numPages));
              setPageNo(Math.min(currPage + 1, numPages));
            }}
            size="sm"
            variant="light"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-x-2">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="light">
                <SearchIcon className="hover:cursor-pointer h-4 w-4" />
                {selectedValue * 100}%{" "}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Single selection example"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
            >
              <DropdownItem
                onSelect={() => {
                  setScale(1);
                }}
                key="1"
              >
                100%
              </DropdownItem>
              <DropdownItem
                onSelect={() => {
                  setScale(1.5);
                }}
                key="1.5"
              >
                150%
              </DropdownItem>
              <DropdownItem
                onSelect={() => {
                  setScale(2);
                  console.log(scale);
                }}
                key="2"
              >
                200%
              </DropdownItem>
              <DropdownItem
                onSelect={() => {
                  setScale(2.5);
                }}
                key="2.5"
              >
                250%
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="items-center justify-center flex h-screen  w-full  bg-white ">
        <SimpleBar
          autoHide={false}
          className="w-full max-h-[calc(100vh-3.5rem)] "
        >
          <div
            className="flex items-center justify-center h-full dark:bg-gray-800 bg-white"
            ref={ref}
          >
            <Document
              onLoadSuccess={({ numPages }) => {
                setNumPages(numPages);
              }}
              loading={
                <div className="flex justify-center bg-white">
                  <Loader2 className="my-24 h-6 w-6 animate-spin" />
                </div>
              }
              onLoadError={() => {
                toast.error("Error loading page!!");
              }}
              file={url}
              className="max-h-full dark:bg-gray-800 bg-white"
            >
              <Page
                loading={
                  <div className="flex items-center">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                }
                scale={selectedValue}
                width={width}
                className="w-full shadow-lg mb-2"
                pageNumber={currPage}
              />
            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
}

export default ShowPdf;
