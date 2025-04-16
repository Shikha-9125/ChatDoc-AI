import { Button, Input, code } from "@nextui-org/react";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { MailIcon, SendIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import ChatList from "../@chat/chat-list";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { usePathname } from "next/navigation";
import getId from "@/lib/get-route-id";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import model from "@/gemini/model";
import { useCollection } from "react-firebase-hooks/firestore";
import { useTheme } from "next-themes";
interface MessageProps {
  text: string;
  timestamp: any;
  msgBy: boolean;
}

function SendMessage({ pdfDocument, pageNo }: any) {
  const { theme, setTheme } = useTheme();
  const [user, _, error] = useAuthState(auth);
  const pathname = usePathname();
  let id = getId(pathname);
  const [message, setMessage] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState<any>();
  const [streamData, setStreamData] = useState("");

  const q = query(
    collection(db, `${user?.email}/files/pdf/${id}/chats`),
    orderBy("timestamp")
  );
  const [_snapshot, chatLoading, chatError] = useCollection(q);
  const chatData = _snapshot?.docs?.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const onSend = async () => {
    try {
      if (message?.length == 0) {
        toast.error("Please enter some message...");
        return;
      }
      let body: any = {
        pdfURL: pdfDocument?.pdfURL,
        message: message,
        pageNo: pageNo,
        user: {
          email: user?.email,
        },
        messageId: id,
      };
      await addDoc(collection(db, `${user?.email}/files/pdf/${id}/chats`), {
        text: message,
        timestamp: serverTimestamp(),
        email: user?.email,
        name: user?.displayName,
        sender: true,
      });

      setIsGenerating(true);
      setMessage("");
      const response = await fetch("/api/generate-text-from-pdf", {
        method: "POST",
        body: JSON.stringify(body),
      });
      if (response.status === 400) throw new Error("Please try again");
      if (!response.body) {
        toast.error("Please try again...");
        setIsGenerating(false);
        return;
      }

      const reader = response.body.getReader();
      let text = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          await addDoc(collection(db, `${user?.email}/files/pdf/${id}/chats`), {
            text: text,
            timestamp: serverTimestamp(),
            email: "chatai@gmail.com",
            name: "Chat AI",
            sender: false,
          });
          setIsGenerating(false);
          setStreamData("");
          break;
        }
        setIsGenerating(false);
        setStreamData((prev) => prev + new TextDecoder().decode(value));
        text += new TextDecoder().decode(value);
      }
    } catch (error) {
      toast.error("Please try again...");
      setIsGenerating(false);
    }
  };

  if (_) {
    return (
      <div className={`${theme === "light" ? "bg-white" : "bg-[#171717]"}`}>
        Loading chat...
      </div>
    );
  }
  if (error) {
    return <div>Error...</div>;
  }
  return (
    <div className="h-full w-full ">
      <div className="h-[94%] w-full  overflow-y-hidden">
        <ChatList
          user={user}
          chatLoading={chatLoading}
          isGenerating={isGenerating}
          chatData={chatData}
          pdfDocument={pdfDocument}
          routeId={id}
          streamData={streamData}
        />
      </div>
      <div
        className={` ${
          theme === "light" ? "bg-white" : "bg-black"
        } h-[6%]  w-full pb-5`}
      >
        <div className="flex px-2">
          <Input
            autoFocus
            value={message}
            onChange={(e: any) => {
              setMessage(e.target.value);
            }}
            className="w-full "
            radius="none"
            variant="bordered"
            type="text"
            color="primary"
            placeholder="Hey there ! How can I assist you ?"
            labelPlacement="outside"
            startContent={
              <ChatBubbleIcon className="text-2xl text-default-400 h-6 w-6 pointer-events-none flex-shrink-0" />
            }
          />
          <Button
            color="primary"
            disabled={chatLoading || isGenerating}
            onClick={onSend}
            className="h-10"
            size="sm"
            radius="none"
          >
            <SendIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SendMessage;
