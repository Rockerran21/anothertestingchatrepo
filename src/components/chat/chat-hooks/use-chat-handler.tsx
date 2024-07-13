import { useContext, useRef } from "react";

import { ChatMessagesListState } from "@/types";
import { ChatbotUIContext } from "@/context/context";
import { handleHostedChat, handleCreateMessages } from "../chat-helpers";

export const useChatHandler = () => {
  const {
    userInput,
    setUserInput,
    setChatMessagesList,
    setIsGenerating,
    setFirstTokenReceived,
  } = useContext(ChatbotUIContext);

  const chatInputRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = async (
    messageContent: string,
    chatMessagesList: ChatMessagesListState,
    isRegeneration: boolean,
    paramsId: string,
  ) => {
    const startingInput = messageContent;

    try {
      setUserInput("");
      setIsGenerating(true);

      const obtainResponseFromAzure = await handleHostedChat(
        messageContent,
        chatMessagesList[paramsId] || [],
      );

      const updatedChatMessagesList = {
        ...chatMessagesList,
        [paramsId]: handleCreateMessages(
          chatMessagesList[paramsId] || [],
          messageContent || userInput,
          obtainResponseFromAzure,
          isRegeneration,
          setChatMessagesList,
          paramsId,
        ),
      };

      setChatMessagesList(updatedChatMessagesList);

      setIsGenerating(false);
      setFirstTokenReceived(false);
      setUserInput("");
    } catch (error) {
      setIsGenerating(false);
      setFirstTokenReceived(false);
      setUserInput(startingInput);
    }
  };

  return {
    chatInputRef,
    handleSendMessage,
  };
};
