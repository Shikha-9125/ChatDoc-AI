"use client";
import { auth, db } from "@/firebase/config";
import getId from "@/lib/get-route-id";
import { collection, documentId, query, where } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import LoadingPage from "./_components/loading-page";
import PageNotFound from "./_components/page-not-found";
import ShotPdf from "./@pdf/show-pdf";
import SendMessage from "./_components/send-message";
import NotAMember from "./_components/not-a-member";
import toast from "react-hot-toast";
import { Router } from "lucide-react";

function Page() {
  const [pageNo, setPageNo] = useState(1);
  const [user, userLoading, userError] = useAuthState(auth);
  const pathname = usePathname();
  const routeId = getId(pathname);
  const shareQuery = query(collection(db, `share/pdf/${routeId}`));
  const router = useRouter();
  const [shareSnapshot, shareLoading, shareError] = useCollection(shareQuery);
  const creatorDetails: any = shareSnapshot?.docs?.map((doc: any) => {
    return { id: doc.id, ...doc.data() };
  })?.[0];
  //   console.log(creatorDetails);

  const memberQuery = query(
    collection(db, `${creatorDetails?.email}/files/pdf/${routeId}/members`)
  );
  const [memberSnapshot, memberLoading, memberError] =
    useCollection(memberQuery);
  const memberList = memberSnapshot?.docs
    ?.map((doc: any) => {
      return { id: doc.id, ...doc.data() };
    })
    ?.filter((member: any) => {
      return member.email === user?.email;
    })?.[0];
  console.log(memberList);
  const q = query(
    collection(db, `${creatorDetails?.email}/files/pdf`),
    where(documentId(), "in", [routeId])
  );

  const [data, loadingPdf, errorImage] = useCollection(q);
  let document = data?.docs.map((doc: any) => {
    return { id: doc.id, ...doc.data() };
  })?.[0];
  //   console.log(document);
  if (userLoading || shareLoading || loadingPdf || memberLoading) {
    return <LoadingPage />;
  }
  if (!user) {
    toast.error("Please login!");
    router.push("/");
  }
  if (!creatorDetails || !data) {
    return <PageNotFound />;
  }
  if (!memberList) {
    return <NotAMember />;
  }
  return (
    <>
      <div className="w-6/12   sm:flex items-center justify-center hidden h-screen   border ">
        <ShotPdf
          setPageNo={setPageNo}
          loadingPdf={loadingPdf}
          pdfDocument={document}
        />
      </div>
      <div className="flex items-center justify-center bg-white w-full sm:w-6/12 h-screen  ">
        <SendMessage
          creatorEmail={creatorDetails.email}
          routeId={routeId}
          pdfDocument={document}
          loadingPdf={loadingPdf}
          pageNo={pageNo}
        />
      </div>
    </>
  );
}

export default Page;
