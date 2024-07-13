import { FC } from "react";

interface ChatHelpProps {}

export const ChatInfo: FC<ChatHelpProps> = ({}) => {
  return (
    <div className="text-xs mt-2">
      Rh GPT can make mistakes. So please verify important information.
    </div>
  );
};
