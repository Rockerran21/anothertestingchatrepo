"use client";

import { FC, useState, useEffect } from "react";
import { ChatbotUIContext } from "@/context/context";
import { loadState, saveState } from "@/lib/utils";
import { ChatMessage, ChatItem, Folder, ChatMessagesListState } from "@/types";

interface GlobalStateProps {
  children: React.ReactNode;
}

const whitelist = ["chatList", "chatMessagesList"];
const blacklist = [
  "userInput",
  "chatMessages",
  "isGenerating",
  "firstTokenReceived",
  "abortController",
];

export const GlobalState: FC<GlobalStateProps> = ({ children }) => {
  // Load persisted state on initial render
  const persistedState = loadState();

  // PASSIVE CHAT STORE
  const [userInput, setUserInput] = useState<string>("");

  // ITEMS STORE
  const [chatList, setChatList] = useState<{
    folders: Folder[];
    chats: ChatItem[];
  }>(persistedState?.chatList || { folders: [], chats: [] });

  // ACTIVE CHAT STORE
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [firstTokenReceived, setFirstTokenReceived] = useState<boolean>(false);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  // CHAT MESSAGES LIST STORE
  const [chatMessagesList, setChatMessagesList] =
    useState<ChatMessagesListState>(persistedState?.chatMessagesList || {});

  // Persist state whenever it changes
  useEffect(() => {
    const state = {
      chatList,
      userInput,
      isGenerating,
      abortController,
      chatMessagesList,
      firstTokenReceived,
    };
    saveState(state, whitelist, blacklist);
  }, [
    chatList,
    userInput,
    isGenerating,
    abortController,
    chatMessagesList,
    firstTokenReceived,
  ]);

  return (
    <ChatbotUIContext.Provider
      value={{
        // PASSIVE CHAT STORE
        userInput,
        setUserInput,

        // ACTIVE CHAT STORE
        isGenerating,
        setIsGenerating,
        firstTokenReceived,
        setFirstTokenReceived,
        abortController,
        setAbortController,

        // ITEMS STORE
        chatList,
        setChatList,

        // CHAT MESSAGES LIST STORE
        chatMessagesList,
        setChatMessagesList,
      }}
    >
      {children}
    </ChatbotUIContext.Provider>
  );
};
