import { FC, useContext, useState } from "react";
import { IconCaretDownFilled, IconCaretRightFilled } from "@tabler/icons-react";

import { cn } from "@/lib/utils";

import { ChatbotUIContext } from "@/context/context";
import { LLM_LIST } from "@/lib/models/llm/llm-list";
import { MessageInterface } from "@/types";
import { ModelIcon } from "../models/model-icon";

// ui
import { WithTooltip } from "../ui/with-tooltip";

// message
import { MessageActions } from "./message-actions";
import { MessageMarkdown } from "./message-markdown";
import { useChatHandler } from "../chat/chat-hooks/use-chat-handler";

const ICON_SIZE = 32;

interface MessageProps {
  message: MessageInterface;
  fileItems: string[];
  isLast: boolean;
}

export const Message: FC<MessageProps> = ({ message, fileItems, isLast }) => {
  const { isGenerating, setIsGenerating, firstTokenReceived } =
    useContext(ChatbotUIContext);
  const { handleSendMessage } = useChatHandler();

  const [isHovering, setIsHovering] = useState(false);
  const [viewSources, setViewSources] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(message.content);
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = message.content;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  };

  const handleRegenerate = async () => {
    // setIsGenerating(true);
    // const value = chatMessages[chatMessages.length - 2].message.content;
    // await handleSendMessage(value, chatMessages, true);
  };

  const modelDetails = LLM_LIST.find(
    (model) => model.modelId === message.model,
  );

  // Retrieve user info from localStorage
  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = userInfoString
    ? JSON.parse(userInfoString)
    : { userName: "User" };

  // Access userName property
  const userID = userInfo.userID;
  const userName = userInfo.userName;

  return (
    <div
      className={cn(
        "flex w-full justify-center",
        message.role === "user" ? "" : "bg-secondary",
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative flex w-full flex-col p-6 sm:w-[550px] sm:px-0 md:w-[650px] lg:w-[650px] xl:w-[700px]">
        <div className="absolute right-5 top-7 sm:right-0">
          <MessageActions
            isLast={isLast}
            isHovering={isHovering}
            isSystemResponse={message.role === "system"}
            onCopy={handleCopy}
            onRegenerate={handleRegenerate}
            onLike={() => console.log("onLike clicked")}
            onDislike={() => console.log("onDislike clicked")}
            onFeedback={() => console.log("onFeedback clicked")}
          />
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-4">
            {message.role === "system" ? (
              <div className="flex items-center space-x-4">
                <WithTooltip
                  display={<div>Robert Half GPT</div>}
                  trigger={
                    <ModelIcon
                      provider={"openai"}
                      height={ICON_SIZE}
                      width={ICON_SIZE}
                    />
                  }
                />
                <div className="text-lg font-semibold">rhGPT</div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <WithTooltip
                  display={<div>{userID}</div>}
                  trigger={
                    <ModelIcon
                      provider="rh"
                      height={ICON_SIZE}
                      width={ICON_SIZE}
                    />
                  }
                />
                <div className="font-semibold">{userName}</div>
              </div>
            )}
          </div>
          {!firstTokenReceived &&
          isGenerating &&
          isLast &&
          message.role === "assistant" ? (
            <>{/* Add the code for showing the tool in use here */}</>
          ) : (
            <MessageMarkdown content={message.content} />
          )}
        </div>

        {fileItems.length > 0 && (
          <div className="border-primary mt-6 border-t pt-4 font-bold">
            {!viewSources ? (
              <div
                className="flex cursor-pointer items-center text-lg hover:opacity-50"
                onClick={() => setViewSources(true)}
              >
                {fileItems.length}
                {fileItems.length > 1 ? " Sources " : " Source "}
                from
                <IconCaretRightFilled className="ml-1" />
              </div>
            ) : (
              <>
                <div
                  className="flex cursor-pointer items-center text-lg hover:opacity-50"
                  onClick={() => setViewSources(false)}
                >
                  {fileItems.length}
                  {fileItems.length > 1 ? " Sources " : " Source "}
                  from
                  <IconCaretDownFilled className="ml-1" />
                </div>
                <div className="mt-3 space-y-4">
                  {/* Add code to display file summaries and file items here */}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
