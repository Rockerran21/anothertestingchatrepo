import { encode } from "gpt-tokenizer";

import { ChatMessage } from "@/types/chat-message";

export async function buildFormatedMessages(
  message: string,
  chatMessages: ChatMessage[],
) {
  const assistant = null;

  const chatSettings = {
    model: "gpt-3.5-turbo",
    prompt: "You are a friendly, helpful AI assistant.",
    temperature: 0.5,
    contextLength: 4096,
    includeProfileContext: false,
    includeWorkspaceInstructions: false,
    embeddingsProvider: "openai",
  };

  const BUILT_PROMPT = buildBasePrompt(
    chatSettings.prompt,
    chatSettings.includeProfileContext ? "" : "",
    chatSettings.includeWorkspaceInstructions ? "" : "",
    assistant,
  );

  const CHUNK_SIZE = chatSettings.contextLength;
  const PROMPT_TOKENS = encode(chatSettings.prompt).length;

  let remainingTokens = CHUNK_SIZE - PROMPT_TOKENS;
  let usedTokens = 0;
  usedTokens += PROMPT_TOKENS;

  const processedChatMessages = chatMessages.map((chatMessage, index) => {
    const nextChatMessage = chatMessages[index + 1];

    if (nextChatMessage === undefined) {
      return chatMessage;
    }

    return chatMessage;
  });

  let finalMessages = [];

  for (let i = processedChatMessages.length - 1; i >= 0; i--) {
    const message = processedChatMessages[i].message;
    const messageTokens = encode(message.content).length;

    if (messageTokens <= remainingTokens) {
      remainingTokens -= messageTokens;
      usedTokens += messageTokens;
      finalMessages.unshift(message);
    } else {
      break;
    }
  }

  let tempSystemMessage = {
    chat_id: "",
    assistant_id: null,
    content: BUILT_PROMPT,
    created_at: "",
    id: processedChatMessages.length.toString(),
    image_paths: [],
    model: chatSettings.model,
    role: "system" as const,
    sequence_number: processedChatMessages.length,
    updated_at: "",
    user_id: "",
  };

  finalMessages.unshift(tempSystemMessage);

  finalMessages = finalMessages.map((message) => {
    let content;

    if (message.image_paths && message.image_paths.length > 0) {
      content = [
        {
          type: "text",
          text: message.content,
        },
        ...message.image_paths.map((path) => {
          let formedUrl = "";

          if (path.startsWith("data")) {
            formedUrl = path;
          } else {
            console.log("else");
          }

          return {
            type: "image_url",
            image_url: formedUrl,
          };
        }),
      ];
    } else {
      content = message.content;
    }

    return {
      role: message.role,
      content,
    };
  });

  // Add the user message to the final messages array
  finalMessages.push({
    role: "user",
    content: message,
  });
  return finalMessages;
}

const buildBasePrompt = (
  prompt: string,
  profileContext: string,
  workspaceInstructions: string,
  assistant: { name: string } | null,
) => {
  let fullPrompt = "";

  if (assistant) {
    fullPrompt += `<INJECT ROLE>\nYou are not an AI. You are ${assistant.name}.\n</INJECT ROLE>\n\n`;
  }

  fullPrompt += `Today is ${new Date().toLocaleDateString()}.\n\n`;

  if (profileContext) {
    fullPrompt += `User Info:\n${profileContext}\n\n`;
  }

  if (workspaceInstructions) {
    fullPrompt += `System Instructions:\n${workspaceInstructions}\n\n`;
  }

  fullPrompt += `User Instructions:\n${prompt}`;

  return fullPrompt;
};
