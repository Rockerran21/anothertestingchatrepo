import { Dispatch, SetStateAction, createContext } from "react";

import { ChatMessage, ChatItem, Folder, ChatMessagesListState } from "@/types";

interface ChatbotUIContext {
  // ACTIVE CHAT STORE
  isGenerating: boolean;
  setIsGenerating: Dispatch<SetStateAction<boolean>>;
  firstTokenReceived: boolean;
  setFirstTokenReceived: Dispatch<SetStateAction<boolean>>;
  abortController: AbortController | null;
  setAbortController: Dispatch<SetStateAction<AbortController | null>>;

  // PASSIVE CHAT STORE
  // chatMessages: ChatMessage[];
  // setChatMessages: Dispatch<SetStateAction<ChatMessage[]>>;

  // PASSIVE CHAT STORE
  userInput: string;
  setUserInput: Dispatch<SetStateAction<string>>;

  // ITEMS STORE
  chatList: {
    folders: Folder[];
    chats: ChatItem[];
  };
  setChatList: Dispatch<
    SetStateAction<{ folders: Folder[]; chats: ChatItem[] }>
  >;

  // CHAT MESSAGES LIST STORE
  chatMessagesList: ChatMessagesListState;
  setChatMessagesList: Dispatch<SetStateAction<ChatMessagesListState>>;
}

export const ChatbotUIContext = createContext<ChatbotUIContext>({
  // ACTIVE CHAT STORE
  isGenerating: false,
  setIsGenerating: () => {},
  firstTokenReceived: false,
  setFirstTokenReceived: () => {},
  abortController: null,
  setAbortController: () => {},

  // PASSIVE CHAT STORE
  // chatMessages: [],
  // setChatMessages: () => {},
  userInput: "",
  setUserInput: () => {},

  // ITEMS STORE
  chatList: { folders: [], chats: [] },
  setChatList: () => {},

  // CHAT MESSAGES LIST STORE
  chatMessagesList: {},
  setChatMessagesList: () => {},
});
