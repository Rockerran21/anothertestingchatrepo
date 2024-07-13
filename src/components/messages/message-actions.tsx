import { FC, useContext, useEffect, useState } from "react";
import {
  IconCheck,
  IconCopy,
  IconRepeat,
  IconThumbUp,
  IconThumbDown,
  IconMessageReport,
} from "@tabler/icons-react";

import { WithTooltip } from "../ui/with-tooltip";
import { ChatbotUIContext } from "@/context/context";

export const MESSAGE_ICON_SIZE = 18;

interface MessageActionsProps {
  isAssistant?: boolean;
  isLast: boolean;
  isHovering: boolean;
  isSystemResponse: boolean;
  onCopy: () => void;
  onRegenerate: () => void;
  onLike: () => void;
  onDislike: () => void;
  onFeedback: () => void;
}

export const MessageActions: FC<MessageActionsProps> = ({
  isLast,
  isHovering,
  isSystemResponse,
  onCopy,
  onRegenerate,
  onLike,
  onDislike,
  onFeedback,
}) => {
  const { isGenerating } = useContext(ChatbotUIContext);

  const [showCheckmark, setShowCheckmark] = useState(false);

  const handleCopy = () => {
    onCopy();
    setShowCheckmark(true);
  };

  useEffect(() => {
    if (showCheckmark) {
      const timer = setTimeout(() => {
        setShowCheckmark(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showCheckmark]);

  if (isLast && isGenerating) return null;

  return isLast && isGenerating ? null : (
    <div className="text-muted-foreground flex items-center space-x-2">
      {isHovering && (
        <>
          <WithTooltip
            delayDuration={1000}
            side="bottom"
            display={<div>Copy</div>}
            trigger={
              showCheckmark ? (
                <IconCheck size={MESSAGE_ICON_SIZE} />
              ) : (
                <IconCopy
                  className="cursor-pointer hover:opacity-50"
                  size={MESSAGE_ICON_SIZE}
                  onClick={handleCopy}
                />
              )
            }
          />
          {isSystemResponse && (
            <>
              <WithTooltip
                delayDuration={1000}
                side="bottom"
                display={<div>Like</div>}
                trigger={
                  <IconThumbUp
                    className="cursor-pointer hover:opacity-50"
                    size={MESSAGE_ICON_SIZE}
                    onClick={onLike}
                  />
                }
              />

              <WithTooltip
                delayDuration={1000}
                side="bottom"
                display={<div>Dislike</div>}
                trigger={
                  <IconThumbDown
                    className="cursor-pointer hover:opacity-50"
                    size={MESSAGE_ICON_SIZE}
                    onClick={onDislike}
                  />
                }
              />

              <WithTooltip
                delayDuration={1000}
                side="bottom"
                display={<div>Feedback</div>}
                trigger={
                  <IconMessageReport
                    className="cursor-pointer hover:opacity-50"
                    size={MESSAGE_ICON_SIZE}
                    onClick={onFeedback}
                  />
                }
              />
            </>
          )}
          {isLast && (
            <WithTooltip
              delayDuration={1000}
              side="bottom"
              display={<div>Regenerate</div>}
              trigger={
                <IconRepeat
                  className="cursor-pointer hover:opacity-50"
                  size={MESSAGE_ICON_SIZE}
                  onClick={onRegenerate}
                />
              }
            />
          )}
        </>
      )}
    </div>
  );
};
