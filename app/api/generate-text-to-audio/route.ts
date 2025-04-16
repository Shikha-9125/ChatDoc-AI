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
import { db, storage } from "@/firebase/config";
import { openai } from "@/lib/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, email } = body;
    console.log(text);
    const mp3: any = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    });
    const buffer = Buffer.from(await mp3.arrayBuffer());
    const fileName = new Date();
    const audioRef = ref(
      storage,
      "/files/audios/" + `${email}-${fileName.toString()}` + ".mp3"
    );
    await uploadBytes(audioRef, buffer);

    const downloadURL = await getDownloadURL(audioRef);
    console.log(downloadURL);
    return NextResponse.json({ src: downloadURL });
    return NextResponse.json({ src: mp3 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
