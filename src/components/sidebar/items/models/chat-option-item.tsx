import { FC } from "react";
import { cn } from "@/lib/utils";

interface ChatOptionItemProps {
  Icon: any;
  label: string;
  className?: string;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const ChatOptionItem: FC<ChatOptionItemProps> = ({
  Icon,
  label,
  onClick,
  className,
}) => (
  <div
    className={cn(
      "flex flex-row items-center justify-start p-2 cursor-pointer rounded gap-2",
      className,
    )}
    onClick={onClick}
  >
    <Icon size={18} />
    <div className="text-sm font-semibold">{label}</div>
  </div>
);
