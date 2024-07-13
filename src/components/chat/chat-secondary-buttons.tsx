import { FC } from "react";
import { IconInfoCircle } from "@tabler/icons-react";

import { WithTooltip } from "@/components/ui/with-tooltip";

import { ChatTheme } from "../ui/chat-theme";

interface ChatSecondaryButtonsProps {}

export const ChatSecondaryButtons: FC<ChatSecondaryButtonsProps> = ({}) => {
  return (
    <div className="flex flex-row gap-x-4 absolute right-2 top-2">
      <WithTooltip
        delayDuration={200}
        display={
          <div>
            <div className="text-xl font-bold">Chat Info</div>
            <div className="mx-auto mt-2 max-w-xs space-y-2 sm:max-w-sm md:max-w-md lg:max-w-lg">
              <div>Model: gpt-3.5-turbo</div>
              <div>Temperature: 0.5</div>
              <div>Context Length: 4096</div>
              <div>Embedded Provider: openai</div>
            </div>
          </div>
        }
        trigger={
          <div className="mt-1">
            <IconInfoCircle
              className="cursor-default hover:opacity-50"
              size={24}
            />
          </div>
        }
      />
      <ChatTheme />
    </div>
  );
};
