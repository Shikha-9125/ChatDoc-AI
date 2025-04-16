import { NextRequest, NextResponse } from "next/server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { openai } from "@/lib/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pdfURL, message, pageNo, user, messageId } = body;
    let pdfResponse = await fetch(pdfURL);
    let blob = await pdfResponse.blob();
    const loader = new PDFLoader(blob);
    const pageLevelDocs = await loader.load();
    console.dir(pageLevelDocs);
    const pagesAmt = pageLevelDocs.length;
    const messageRef = collection(
      db,
      `${user?.email}/files/pdf/${messageId}/chats`
    );
    const q = query(messageRef, orderBy("timestamp", "desc"), limit(5));
    const querySnapshot = await getDocs(q);
    let prevMessages: any[] = [];
    querySnapshot.forEach((doc: any) => {
      prevMessages.push({ id: doc.id, ...doc.data() });
    });
    const formattedPrevMessages = prevMessages?.map((msg: any) => ({
      role: msg.sender ? ("user" as const) : ("assistant" as const),
      content: msg.text,
    }));

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0,
      stream: true,
      messages: [
        {
          role: "system",
          content:
            "Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format.",
        },
        {
          role: "user",
          content: `Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format. \nif you can provide relavent answer please provide

          \n--------------\n

          PREVIOUS CONVERSATION:
          ${formattedPrevMessages.map((message: any) => {
            if (message.role === "user") return `User: ${message.cotent}\n`;
            return `Assistant: ${message.content}`;
          })}

          \n---------------\n
          CONTEXT:
          ${pageLevelDocs[pageNo - 1].pageContent}

          \n---------------\n
          USER INPUT: ${message}
          `,
        },
      ],
      max_tokens: 4096,
    });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
