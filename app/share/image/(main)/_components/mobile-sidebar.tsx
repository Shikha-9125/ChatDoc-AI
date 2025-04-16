"use client";
import { auth, db } from "@/firebase/config";
import { Skeleton } from "@nextui-org/react";
import { ChatBubbleIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { collection, query } from "firebase/firestore";
import { SidebarCloseIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import AddNewImage from "./add-new-image";
import Link from "next/link";

function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(!isOpen);
  };
  const pathname: string = usePathname();
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  let routes = pathname.split("/");
  let id = routes[routes.length - 1];
  const [user, userLoading, userError]: any = useAuthState(auth);
  const q = query(collection(db, `${user?.email}/files/image`));
  let [data, loading, error]: any = useCollection(q);
  const documents = data?.docs?.map((doc: any) => {
    return { id: doc.id, ...doc.data() };
  });
  return (
    <div className="lg:hidden flex  z-10 ">
      <div className="fixed z-50 top-2 left-3">
        <button onClick={onOpen}>
          {isOpen ? (
            <SidebarCloseIcon className="h-6 w-6 " />
          ) : (
            <HamburgerMenuIcon className="h-6 w-6 " />
          )}
        </button>
      </div>
      <div
        className={` ${
          isOpen ? "w-full" : "w-0"
        }  bg-white max-w-96 duration-100 absolute z-20  h-screen`}
      >
        {userLoading || loading ? (
          <>
            <div className="mt-10  flex flex-col overflow-y-hidden h-screen px-2">
              <div className={`${isOpen ? "block" : "hidden"}`}>
                <AddNewImage user={user} />
              </div>
              <div className=" overflow-y-auto  h-screen pr-2 my-4">
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
        ) : (
          <>
            <div className="mt-10 px-2">
              <div className={`duration-100 ${isOpen ? "block" : "hidden"}`}>
                <AddNewImage user={user} />
              </div>
              <div className=" overflow-y-auto  h-[90vh]  my-4">
                {documents?.map((e: any) => {
                  return (
                    <>
                      <Link href={`/image/${e.id}`}>
                        <div
                          className={`flex my-2 ${
                            e.id === id
                              ? "bg-blue-500 text-white"
                              : "bg-gray-100 "
                          } px-2 py-2 rounded-sm items-center`}
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
        )}
      </div>
    </div>
  );
}

export default MobileSidebar;
