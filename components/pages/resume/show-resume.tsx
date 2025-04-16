import React from 'react'
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useResizeDetector } from "react-resize-detector";
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import SimpleBar from 'simplebar-react';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
function ShowResume({url, id, resumeId}:any) {
  const { width, ref } = useResizeDetector();
  return (<SimpleBar
    autoHide={false}
    className="w-full "
  >
    <div ref={ref} className={`border ${id==resumeId ? "border-blue-600" :""} overflow-hidden bg-gray-100 aspect-[9/12] rounded-lg`}>
      <Document
        onLoadSuccess={({ numPages }) => {
          // setNumPages(numPages);
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
          scale={1}
          width={width}
          className="w-full shadow-lg mb-2"
          pageNumber={1}
        />
      </Document>
    </div>

  </SimpleBar>
  )
}

export default ShowResume