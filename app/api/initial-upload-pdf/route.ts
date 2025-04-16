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
    const { pdfURL, pageNo } = body;
    let pdfResponse = await fetch(pdfURL);
    let blob = await pdfResponse.blob();
    const loader = new PDFLoader(blob);
    const pageLevelDocs = await loader.load();
    const pagesAmt = pageLevelDocs.length;
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
          content: `User the following context and summarize this context and create 3 question related to this and please don't add summary word in response.
          \n---------------\n
          CONTEXT:
          ${pageLevelDocs[pageNo - 1].pageContent}

          
          `,
        },
      ],
    });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
