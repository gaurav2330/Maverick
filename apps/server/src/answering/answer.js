import { buildPrompt } from './prompt.js';
import { GoogleGenerativeAI } from "@google/generative-ai";


export async function generateAnswer({ question, chunks }) {
  const prompt = buildPrompt({ question, chunks });
  // Call your LLM API or processing function here with the prompt
  const response = await callLLMApi(prompt, question);
  return response;
}

async function callLLMApi(prompt, question) {
  console.log("Calling LLM API with prompt");

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const result = await model.generateContent(prompt);
  console.log('LLM API call initiated:', result.response.text());

  return result.response.text();
}
