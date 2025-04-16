const geminiAPI: any = process.env.NEXT_PUBLIC_GEMINI_PRO_API;
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(geminiAPI);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
export default model;
