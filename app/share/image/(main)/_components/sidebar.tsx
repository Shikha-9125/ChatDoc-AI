"use client";
import { Skeleton } from "@nextui-org/react";
import React from "react";
import AddNewImage from "./add-new-image";
import Link from "next/link";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { collection, query } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { usePathname, useRouter } from "next/navigation";
function Sidebar() {
  const router = useRouter();
  const pathname: string = usePathname();
  let routes = pathname.split("/");
  let id = routes[routes.length - 1];
  const [user]: any = useAuthState(auth);
  const q = query(collection(db, `${user?.email}/files/image`));
  let [data, loading, error]: any = useCollection(q);

  if (loading) {
    return (
      <>
        <div className="w-full px-2 py-2">
          <AddNewImage user={user} />
          <div className=" overflow-y-auto  h-[90vh] pr-2 my-4">
            {Array(10)
              .fill(0)
              .map((e: any) => {
                return (
                  <>
                    <div className="flex my-2  bg-gray-100 px-2 py-2 rounded-sm items-center">
                      <Skeleton className="rounded-lg">
                        <div className="h-8 rounded-lg bg-default-300"></div>
                      </Skeleton>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </>
    );
  }
  if (error) {
    return <>Error</>;
  }
  const documents = data.docs.map((doc: any) => {
    return { id: doc.id, ...doc.data() };
  });
  return (
    <>
      <div className="w-full  flex flex-col h-screen  px-2 ">
        <AddNewImage documents={documents} user={user} />
        <div className=" overflow-y-auto  h-screen pr-2 my-4">
          {documents?.map((e: any) => {
            return (
              <>
                <Link href={`/image/${e.id}`}>
                  <div
                    className={`flex my-2 ${
                      e.id === id ? "bg-blue-500 text-white" : "bg-gray-100 "
                    } px-2 py-2 shadow-lg rounded-sm items-center`}
                  >
                    <ChatBubbleIcon className="mr-2" />
                    <span>
                      {" "}
                      {e?.imageName?.length < 17
                        ? e?.imageName
                        : e?.imageName?.slice(0, 17) + "..."}
                    </span>
                  </div>
                </Link>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
