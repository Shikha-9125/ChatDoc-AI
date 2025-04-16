"use client";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { File } from "lucide-react";
import React, { useState } from "react";
import SendMessage from "./_components/send-message";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/config";
import ShowImage from "./@image/show-image";
import { extractData } from "@/database/tempdata";
import { usePathname, useRouter } from "next/navigation";
import getId from "@/lib/get-route-id";
import {
  collection,
  documentId,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import PageNotFound from "./_components/page-not-found";
import LoadingPage from "./_components/loading-page";
import Head from "next/head";
import toast from "react-hot-toast";
function Page() {
  const [user, loadingUser, errorUser] = useAuthState(auth);

  const router = useRouter();
  const pathname = usePathname();

  const id = getId(pathname);
  const q = query(
    collection(db, `${user?.email}/files/image`),
    where(documentId(), "in", [id])
  );

  const [data, loadingImage, errorImage] = useCollection(q);
  let document = data?.docs.map((doc: any) => {
    return { id: doc.id, ...doc.data() };
  })?.[0];

  if (loadingImage || loadingUser) {
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
      <div className="w-6/12   sm:flex items-center justify-center hidden h-screen    ">
        <ShowImage loadingImage={loadingImage} imageDocument={document} />
      </div>
      <div className="flex items-center justify-center bg-white w-full sm:w-6/12 h-screen  ">
        <SendMessage imageDocument={document} loadingImage={loadingImage} />
      </div>
    </>
  );
}

export default Page;
