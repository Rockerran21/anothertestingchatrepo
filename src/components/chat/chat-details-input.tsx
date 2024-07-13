import { FC, useContext, useState } from "react";
import { IconPlayerStopFilled, IconArrowUp } from "@tabler/icons-react";

import { cn } from "@/lib/utils";
import { ChatbotUIContext } from "@/context/context";
import { TextareaAutosize } from "../ui/textarea-autosize";
import { usePromptAndCommand } from "./chat-hooks/use-prompt-and-command";
import { useChatHandler } from "./chat-hooks/use-chat-handler";

interface ChatDetailsInputProps {
  paramsId: string;
}

export const ChatDetailsInput: FC<ChatDetailsInputProps> = (props) => {
  const { paramsId } = props;

  const [isTyping, setIsTyping] = useState<boolean>(false);

  const { userInput, chatMessagesList, isGenerating } =
    useContext(ChatbotUIContext);

  const { chatInputRef, handleSendMessage } = useChatHandler();

  const { handleInputChange } = usePromptAndCommand();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isTyping && event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage(userInput, chatMessagesList, false, paramsId);
    }
  };

  return (
    <>
      <div className="border-input relative mt-3 flex min-h-[60px] w-full items-center justify-center rounded-xl border-2">
        <TextareaAutosize
          textareaRef={chatInputRef}
          className="ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring text-md flex w-full resize-none rounded-md border-none bg-transparent px-6 py-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Message RH GPT"
          minRows={1}
          maxRows={18}
          value={userInput}
          onValueChange={handleInputChange}
          onKeyDown={handleKeyDown}
          // onPaste={handlePaste}
          onCompositionStart={() => setIsTyping(true)}
          onCompositionEnd={() => setIsTyping(false)}
        />

        <div className="absolute bottom-[14px] right-3 cursor-pointer hover:opacity-50">
          {isGenerating ? (
            <IconPlayerStopFilled
              size={30}
              stroke={2}
              className="bg-primary text-secondary rounded-full p-1 animate-pulse"
              // onClick={handleStopMessage}
            />
          ) : (
            <IconArrowUp
              size={30}
              stroke={2}
              className={cn("bg-primary text-secondary rounded-full p-1")}
              onClick={() => {
                // if (!userInput) return;
                handleSendMessage(userInput, chatMessagesList, false, paramsId);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};
