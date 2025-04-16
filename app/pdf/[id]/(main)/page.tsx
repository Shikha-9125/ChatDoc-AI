"use client";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { File } from "lucide-react";
import React, { useEffect, useState } from "react";
import SendMessage from "./_components/send-message";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/config";
import ShowPdf from "./@pdf/show-pdf";
import { extractData } from "@/database/tempdata";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  collection,
  doc,
  documentId,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import getId from "@/lib/get-route-id";
import toast from "react-hot-toast";
import LoadingPage from "./_components/loading-page";
import PageNotFound from "./_components/page-not-found";
import Head from "next/head";
function Page() {
  const pathname = usePathname();
  const [user, loadingUser, errorUser] = useAuthState(auth);
  const id = getId(pathname);
  const router = useRouter();
  const q = query(
    collection(db, `${user?.email}/files/pdf`),
    where(documentId(), "in", [id])
  );
  const [pageNo, setPageNo] = useState(1);
  const [data, loadingPDF, errroPDF] = useCollection(q);
  let document = data?.docs.map((doc: any) => {
    return { id: doc.id, ...doc.data() };
  })?.[0];
  if (loadingPDF || loadingUser) {
    return <LoadingPage />;
  }
  if (!user) {
    router.push("/");
    return;
  }
  if (!document) {
    return <PageNotFound />;
  }

  return (
    <>
      <Head>
        <title>{document?.pdfName}</title>
      </Head>
      <div className="w-6/12 sm:flex items-center justify-center hidden h-screen   bg-white dark:bg-gray-800 ">
        <ShowPdf setPageNo={setPageNo} pdfData={document} />
      </div>
      <div className="flex items-center justify-center bg-white w-full sm:w-6/12   ">
        <SendMessage pageNo={pageNo} pdfDocument={document} />
      </div>
    </>
  );
}

export default Page;
