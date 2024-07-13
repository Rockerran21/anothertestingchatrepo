import { FC, useEffect, useState } from "react";

import Loading from "@/app/loading";
import { Brand } from "../ui/brand";
import { ChatInput } from "./chat-input";
import { ChatInfo } from "../ui/chat-info";
import { ChatTheme } from "../ui/chat-theme";

interface ChatUIProps {}

export const ChatUI: FC<ChatUIProps> = ({}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-10">
        <Brand />
      </div>

      <div className="absolute right-2 top-2">
        <ChatTheme />
      </div>

      <div className="flex grow flex-col items-center justify-center" />

      <div className="w-full min-w-[300px] items-end px-2 pb-3 pt-0 sm:w-[600px] sm:pb-8 sm:pt-5 md:w-[700px] lg:w-[700px] xl:w-[800px]">
        <ChatInput />
      </div>

      <div className="absolute bottom-1 md:bottom-2 md:block hidden">
        <ChatInfo />
      </div>
    </div>
  );
};
