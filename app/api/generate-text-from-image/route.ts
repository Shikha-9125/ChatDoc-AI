import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { openai } from "@/lib/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

export async function POST(request: NextRequest) {
  let { imageURL, prompt } = await request.json();
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    temperature: 0,
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "Please provide the answer to the users question in markdown format.",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `
            USER Question: ${prompt}
            `,
          },
          {
            type: "image_url",
            image_url: {
              url: imageURL,
            },
          },
        ],
      },
    ],
    max_tokens:4096
  });
  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);

  return NextResponse.json({ text: response }, { status: 200 });
}
