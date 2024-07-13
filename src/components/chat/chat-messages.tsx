import { FC } from "react";

import { ChatMessage } from "@/types";
import { Message } from "../messages/message";

interface ChatMessagesProps {
  chatMessageData: ChatMessage[];
}

export const ChatMessages: FC<ChatMessagesProps> = ({ chatMessageData }) => {
  return chatMessageData
    .sort((a, b) => a.message.sequence_number - b.message.sequence_number)
    .map((chatMessage, index, array) => {
      return (
        <Message
          key={index}
          message={chatMessage.message}
          fileItems={[]}
          isLast={index === array.length - 1}
        />
      );
    });
};
