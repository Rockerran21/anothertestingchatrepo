import { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

interface WithTooltipProps {
  display: React.ReactNode;
  trigger: React.ReactNode;
  delayDuration?: number;
  side?: "left" | "right" | "top" | "bottom";
  className?: string;
}

export const WithTooltip: FC<WithTooltipProps> = ({
  display,
  trigger,
  side = "right",
  delayDuration = 500,
  className,
}) => {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip>
        <TooltipTrigger>{trigger}</TooltipTrigger>
        <TooltipContent side={side} className={className}>
          {display}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
