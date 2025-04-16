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
  // return NextResponse.json({success:"done"})
  try {
    // return NextResponse.json({success:"Done"})
    const body = await req.json();
    console.log(body);
    const { pdfURL,  user, messageId, jobDesc } = body;
    // console.log({pdfURL, jobDesc, user, messageId});
    let pdfResponse = await fetch(pdfURL);
    let blob = await pdfResponse.blob();
    const loader = new PDFLoader(blob);
    const pageLevelDocs = await loader.load();
    // console.dir(pageLevelDocs);
    // const pagesAmt = pageLevelDocs.length;
    // const messageRef = collection(
    //   db,
    //   `${user?.email}/files/pdf/${messageId}/chats`
    // );
    // const q = query(messageRef, orderBy("timestamp", "desc"), limit(5));
    // const querySnapshot = await getDocs(q);
    // let prevMessages: any[] = [];
    // querySnapshot.forEach((doc: any) => {
    //   prevMessages.push({ id: doc.id, ...doc.data() });
    // });
    // const formattedPrevMessages = prevMessages?.map((msg: any) => ({
    //   role: msg.sender ? ("user" as const) : ("assistant" as const),
    //   content: msg.text,
    // }));

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
          content: `Please provide a complete analysis of the resume in relation to the given job description. Identify which requirements are fulfilled and which are not in two different section for detailed information. Additionally, offer suggestions to improve the resume based on the job description, and finally, showcase the total score out of 100 and also provide what keyword this resume need to for better ATS score. If a job description is not provided, please simply respond with "Please provide a job description."
          \n---------------\n
          JOB DESCRIPTION: ${jobDesc}
          \n---------------\n
          RESUME:
          ${pageLevelDocs[0].pageContent}
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
