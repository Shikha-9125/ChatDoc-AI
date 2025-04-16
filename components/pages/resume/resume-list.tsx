import { db } from '@/firebase/config';
import { collection, query } from 'firebase/firestore';
import Link from 'next/link';
import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore';
import DrapAndDrop from './drag-and-drop';
import ShowResume from './show-resume';
// import { Document, Page } from "react-pdf";
// import { pdfjs } from "react-pdf";
// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";
// // import { useResizeDetector } from "react-resize-detector";
// import toast from 'react-hot-toast';
// import { Loader2 } from 'lucide-react';
// import SimpleBar from 'simplebar-react';
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
function ResumeList({ id, user }: any) {
  // alert(id);
  // console.log(user);
  const q = query(collection(db, `${user?.email}/files/resume`));
  // const { width, ref } = useResizeDetector();
  let [data, loading, error]: any = useCollection(q);
  if (loading) {
    return <p>Loading</p>
  }
  if (error) {
    return <p>Please try again</p>
  }
  const documents = data.docs.map((doc: any) => {
    return { id: doc.id, ...doc.data() };
  });
  // console.log(documents);
  // console.log(documents);
  return (
    <>
      {documents?.map((e: any) => {
        return <Link key={e.id} href={`/resume/${e?.id}`}>
          <ShowResume url={e.pdfURL} resumeId={e.id } id={id} />
        </Link>
      })}


      <DrapAndDrop user={user} />
    </>
  )
}

export default ResumeList