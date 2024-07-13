export interface MessageInterface {
  id: string | undefined;
  chat_id?: string;
  created_at?: string | undefined;
  updated_at?: string | undefined;
  content: string;
  image_paths?: string[] | null;
  model?: string | null;
  role: "system" | "user" | "assistant";
  sequence_number: number;
  assistant_id?: null;
  user_id: string | null | undefined;
}
export interface ChatMessage {
  message: MessageInterface;
  fileItems: string[];
}

export type ChatItem = {
  id: string;
  chatName: string;
  created_at: string;
  updated_at: string;
  chatMessageKey: string; // Unique identifier for chat messages
  index: number; // Order for sorting
};

export type Folder = {
  id: string;
  folderName: string;
  created_at: string;
  updated_at: string;
  items: ChatItem[];
  index: number; // Order for sorting
};

// Define the state shape for chatMessagesList
export interface ChatMessagesListState {
  [chatMessageKey: string]: ChatMessage[];
}
