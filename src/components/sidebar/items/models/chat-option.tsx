import { FC } from "react";
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChatOptionItem } from "./chat-option-item";

interface ChatOptionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChatOptionClicked: (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => void;
  onEditClicked: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onDeleteClicked: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
}

export const ChatOption: FC<ChatOptionProps> = ({
  open,
  onOpenChange,
  onChatOptionClicked,
  onEditClicked,
  onDeleteClicked,
}) => {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger>
        <IconDots size={20} onClick={onChatOptionClicked} />
      </PopoverTrigger>

      <PopoverContent className="p-2 w-auto">
        <ChatOptionItem
          label="Rename"
          Icon={IconEdit}
          className="hover:opacity-50"
          onClick={onEditClicked}
        />
        <ChatOptionItem
          label="Delete"
          Icon={IconTrash}
          className="text-red-500 hover:opacity-50"
          onClick={onDeleteClicked}
        />
      </PopoverContent>
    </Popover>
  );
};
