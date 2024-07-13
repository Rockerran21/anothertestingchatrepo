import { ChatMessage, LLMID } from ".";

export interface ChatSettings {
  model: LLMID;
  prompt: string;
  temperature: number;
  contextLength: number;
  includeProfileContext: boolean;
  includeWorkspaceInstructions: boolean;
  embeddingsProvider: "openai" | "local";
}

export interface ChatPayload {
  chatSettings: ChatSettings;
  workspaceInstructions: string;
  chatMessages: ChatMessage[];
  assistant: {
    id: string;
    name: string;
    description: string;
    // add other properties of the assistant table as needed
  } | null;
  messageFileItems: {
    id: string;
    name: string;
    path: string;
    // add other properties of the file_items table as needed
  }[];
  chatFileItems: {
    id: string;
    name: string;
    path: string;
    // add other properties of the file_items table as needed
  }[];
}

export interface ChatAPIPayload {
  chatSettings: ChatSettings;
  messages: {
    id: string;
    content: string;
    role: string;
    // add other properties of the messages table as needed
  }[];
}
