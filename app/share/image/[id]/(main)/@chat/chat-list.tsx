import React, { useEffect, useRef } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Share from "../_components/collab-button";
import Rename from "../_components/rename";
import Download from "../_components/download";
import Reset from "../_components/reset";
import Delete from "../_components/delete";
import { Loader2Icon } from "lucide-react";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { LoaderIcon } from "react-hot-toast";
import View from "../_components/view";
import CopyButton from "../_components/copy-button";
import ProfileIcon from "@/app/(main)/_components/profile-icon";
function ChatList({
  chatData,
  isGenerating,
  chatLoading,
  user,
  imageDocument,
  routeId,
}: any) {
  const messagesEndRef = useRef<any>(null);
  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({
      behaviour: "smooth",
      block: "end",
    });
  }, [chatData]);
  if (chatLoading) {
    return (
      <div className="h-full flex items-center justify-center flex-col">
        <Loader2Icon className="h-6 w-6 animate-spinner-linear-spin" />
        <span className="mt-2">Loading chat...</span>
      </div>
    );
  }
  if (!chatData || chatData.length <= 0) {
    return (
      <>
        <div className="h-full flex items-center justify-center flex-col">
          <ChatBubbleIcon className="h-6 w-6" />
          <span className="mt-2">No chat history...</span>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="h-10  sticky top-0 items-center  py-2 px-2 z-10 bg-white  flex justify-end sm:justify-between">
        <h4 className="sm:block hidden font-bold">Chat</h4>
        <div className="flex  text-gray-600 gap-3 pt-4 pr-3 ">
          {/* <View imageDocument={imageDocument} />
          <Share routeId={routeId} user={user} imageDocument={imageDocument} />
          <Rename user={user} imageDocument={imageDocument} />
          <Download chatData={chatData} />
          <Reset user={user} />
          <Delete imageDocument={imageDocument} user={user} /> */}
          <ProfileIcon user={user} />
        </div>
      </div>
      <div className="w-full mt-4 -5 pb-5 overflow-hidden h-  ">
        <div className="px-2">
          {chatData?.map((e: any, index: any) => {
            if (e.email === user?.email) {
              return (
                <>
                  <div className={`mb-2  flex justify-end`}>
                    <Card
                      radius="sm"
                      className={`bg-blue-600 text-white max-w-lg shadow-none border`}
                    >
                      <CardBody className="py-1 flex flex-row">
                        <Markdown
                          className="text-sm"
                          remarkPlugins={[remarkGfm]}
                        >
                          {e?.text}
                        </Markdown>

                        {/* <p className="text-sm">{e?.text}</p> */}
                      </CardBody>
                    </Card>
                  </div>
                </>
              );
            }
            return (
              <>
                <div className={`mb-2  flex justify-start `}>
                  <Card
                    radius="sm"
                    className={` bg-[#f9f9fe] text-black max-w-lg shadow-none border`}
                  >
                    <CardBody className="py-1 flex  flex-col">
                      <div className="flex flex-col">
                        <div className="flex justify-between mb-1">
                          <h3 className="font-semibold">{e.name}</h3>
                          <CopyButton text={e?.text} />
                        </div>
                        <Markdown
                          className="text-sm"
                          remarkPlugins={[remarkGfm]}
                        >
                          {e?.text}
                        </Markdown>
                      </div>
                      {/* <p className="text-sm">{e?.text}</p> */}
                    </CardBody>
                  </Card>
                </div>
              </>
            );
          })}
          {isGenerating ? (
            <div className={`mb-2  h-10 flex justify-start `}>
              <Card
                radius="sm"
                className={` bg-[#f9f9fe] text-black max-w-lg shadow-none border`}
              >
                <CardBody className="py-1">
                  <Loader2Icon className="animate-spin h-6 w-6" />
                </CardBody>
              </Card>
            </div>
          ) : (
            <></>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </>
  );
}

export default ChatList;
