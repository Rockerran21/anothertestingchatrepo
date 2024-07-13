import { ChatMessage, ChatMessagesListState } from "@/types/chat-message";
import { consumeReadableStream } from "@/lib/consume-stream";
import { buildFormatedMessages } from "@/lib/build-prompt";

export const handleHostedChat = async (
  message: string,
  payload: ChatMessage[],
) => {
  const newAbortController = new AbortController();

  const provider = "azure";
  const apiEndpoint = `/api/${provider}`;

  const formattedMessages = await buildFormatedMessages(message, payload);

  const chatSettings = {
    model: "gpt-3.5-turbo",
    prompt: "You are a friendly, helpful AI assistant.",
    temperature: 0.5,
    contextLength: 4096,
    includeProfileContext: false,
    includeWorkspaceInstructions: false,
    embeddingsProvider: "openai",
  };

  const requestBody = {
    chatSettings: chatSettings,
    messages: formattedMessages,
    customModelId: "",
  };

  const response = await fetchChatResponse(
    apiEndpoint,
    requestBody,
    newAbortController,
  );

  if (response) {
    return await processResponse(response, newAbortController);
  } else {
    // Handle the undefined case, e.g., throw an error or return a default value
    throw new Error("Response is undefined");
  }
};

const fetchChatResponse = async (
  url: string,
  body: object,
  controller: AbortController,
) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

const processResponse = async (
  response: Response,
  controller: AbortController,
) => {
  let fullText = "";
  let contentToAdd = "";

  if (response.body) {
    await consumeReadableStream(
      response.body,
      (chunk) => {
        try {
          contentToAdd = chunk;
          fullText += contentToAdd;
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      },
      controller.signal,
    );
    return fullText;
  } else {
    throw new Error("Response body is null");
  }
};

export const handleCreateMessages = (
  chatMessages: ChatMessage[],
  messageContent: string,
  generatedText: string,
  isRegeneration: boolean,
  setChatMessagesList: React.Dispatch<
    React.SetStateAction<ChatMessagesListState>
  >,
  paramsId: string,
) => {
  const newMessage: ChatMessage = {
    fileItems: [],
    message: {
      content: messageContent,
      sequence_number: chatMessages.length,
      chat_id: Math.random().toString(),
      role: "user",
      id: Math.random().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      image_paths: null,
      model: null,
      assistant_id: null,
      user_id: Math.random().toString(),
    },
  };

  const responseMessage: ChatMessage = {
    fileItems: [],
    message: {
      id: Math.random().toString(),
      user_id: Math.random().toString(),
      content: generatedText,
      sequence_number: chatMessages.length + 1,
      chat_id: Math.random().toString(),
      role: "system",
    },
  };

  const updatedMessages = [...chatMessages, newMessage, responseMessage];

  if (isRegeneration) {
    setChatMessagesList((prevState) => ({
      ...prevState,
      [paramsId]: updatedMessages,
    }));
  }

  return updatedMessages;
};
