import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { chatSettings, messages } = json;

    const ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT;
    const KEY = process.env.AZURE_OPENAI_API_KEY;
    const DEPLOYMENT_ID = process.env.AZURE_MODELS;

    if (!ENDPOINT || !KEY || !DEPLOYMENT_ID) {
      return new Response(
        JSON.stringify({ message: "Azure resources not found" }),
        { status: 400 },
      );
    }

    const azureOpenai = new OpenAI({
      apiKey: KEY,
      baseURL: `${ENDPOINT}/openai/deployments/${DEPLOYMENT_ID}`,
      defaultQuery: { "api-version": "2023-12-01-preview" },
      defaultHeaders: { "api-key": KEY },
    });

    const response = await azureOpenai.chat.completions.create({
      model: DEPLOYMENT_ID,
      messages: messages,
      temperature: chatSettings.temperature,
      max_tokens: chatSettings.contextLength,
      stream: true,
    });

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
  } catch (error: any) {
    const errorMessage = error.error?.message || "An unexpected error occurred";
    const errorCode = error.status || 500;
    return new Response(JSON.stringify({ message: errorMessage }), {
      status: errorCode,
    });
  }
}
