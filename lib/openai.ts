import OpenAI from "openai"
// console.log()
export const openai = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY
})