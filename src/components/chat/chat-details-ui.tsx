import { FC, useContext, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { ChatInfo } from "../ui/chat-info";
import { ChatTheme } from "../ui/chat-theme";
import { ChatMessages } from "./chat-messages";
import { useScroll } from "./chat-hooks/use-scroll";
import { ChatbotUIContext } from "@/context/context";
import { ChatDetailsInput } from "./chat-details-input";
import { ChatScrollButtons } from "./chat-scroll-buttons";
import { ChatMessage } from "@/types";
import { useChatHandler } from "./chat-hooks/use-chat-handler";

interface ChatDetailsUIProps {}

export const ChatDetailsUI: FC<ChatDetailsUIProps> = () => {
  const params = useParams();
  const router = useRouter();
  const { chatMessagesList, chatList, setChatList } =
    useContext(ChatbotUIContext);
  const { handleSendMessage } = useChatHandler();

  const hasCheckedStorageMessage = useRef(false);

  const chatId = Array.isArray(params.chatid)
    ? params.chatid[0]
    : params.chatid;

  const chatMessageData: ChatMessage[] | undefined =
    chatMessagesList?.[chatId] ?? [];

  const checkStorageMessage = useCallback(async () => {
    if (hasCheckedStorageMessage.current) return;
    try {
      const storedMessage = await localStorage.getItem(`chat-${chatId}`);
      if (storedMessage) {
        const newChat = {
          id: `${chatList.chats.length + 1}`,
          chatName: storedMessage,
          chatMessageKey: chatId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          index: chatList.chats.length,
        };

        setChatList((prevState) => ({
          ...prevState,
          chats: [...prevState.chats, newChat],
        }));

        handleSendMessage(storedMessage, chatMessagesList || {}, false, chatId);
        localStorage.removeItem(`chat-${chatId}`);
      } else if (!chatMessageData.length && !storedMessage) {
        toast.error(`Unable to load conversation ${chatId}`);
        router.push("/");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      hasCheckedStorageMessage.current = true;
    }
  }, []);

  useEffect(() => {
    checkStorageMessage();
  }, [checkStorageMessage]);

  const {
    isAtTop,
    isAtBottom,
    isOverflowing,
    messagesEndRef,
    messagesStartRef,
    scrollToTop,
    handleScroll,
    scrollToBottom,
  } = useScroll();

  useEffect(() => {
    if (isAtBottom && isOverflowing) {
      scrollToBottom();
    }
  }, [chatMessageData.length]);

  return (
    <div className="relative flex h-screen flex-col items-center">
      {chatMessageData.length > 0 && (
        <div className="absolute left-4 top-2.5 flex justify-center">
          <ChatScrollButtons
            isAtTop={isAtTop}
            isAtBottom={isAtBottom}
            isOverflowing={isOverflowing}
            scrollToTop={scrollToTop}
            scrollToBottom={scrollToBottom}
          />
        </div>
      )}

      <div className="absolute right-4 top-1 flex h-[40px] items-center space-x-2">
        <ChatTheme />
      </div>

      <div
        className="flex size-full flex-col overflow-auto border-b"
        onScroll={handleScroll}
      >
        <div ref={messagesStartRef} />
        <ChatMessages chatMessageData={chatMessageData} />
        <div ref={messagesEndRef} />
      </div>

      <div className="relative w-full min-w-[300px] items-end px-2 pb-3 pt-0 sm:w-[600px] sm:pb-8 sm:pt-5 md:w-[700px] lg:w-[700px] xl:w-[800px]">
        <ChatDetailsInput paramsId={chatId} />
      </div>

      <div className="absolute bottom-1 md:bottom-2 md:block hidden">
        <ChatInfo />
      </div>
    </div>
  );
};
