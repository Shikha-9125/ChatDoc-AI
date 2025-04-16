import { NextRequest, NextResponse } from "next/server";

import { openai } from "@/lib/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code } = body;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0,
      stream: true,
      messages: [
        {
          role: "system",
          content:
            "Use the following pieces of code  and provide the plag free code in same programming language.",
        },
        {
          role: "user",
          content: `Use the following peices of code and provide the plag free code in same programming lanauge, no need to change any logic used in code just simply change the function and variable names that's it. 
          \n---------------\n
          Given code:
          ${code}
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
