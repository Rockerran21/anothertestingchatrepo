import { FC, useState } from "react";
import { IconQuestionMark } from "@tabler/icons-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface ChatHelpProps {}

export const ChatHelp: FC<ChatHelpProps> = ({}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <IconQuestionMark className="bg-primary text-secondary size-[24px] cursor-pointer rounded-full p-0.5 opacity-60 hover:opacity-50 lg:size-[30px] lg:p-1" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex items-center justify-between">
          <div className="flex cursor-pointer">Short cut key</div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex justify-between">
          <div>Show Help</div>
          <div className="flex opacity-60">
            <div className="min-w-[30px] rounded border-DEFAULT p-1 text-center">
              ⌘
            </div>
            <div className="min-w-[30px] rounded border-DEFAULT p-1 text-center">
              Shift
            </div>
            <div className="min-w-[30px] rounded border-DEFAULT p-1 text-center">
              /
            </div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex w-[300px] justify-between">
          <div>New Chat</div>
          <div className="flex opacity-60">
            <div className="min-w-[30px] rounded border-DEFAULT p-1 text-center">
              ⌘
            </div>
            <div className="min-w-[30px] rounded border-DEFAULT p-1 text-center">
              Shift
            </div>
            <div className="min-w-[30px] rounded border-DEFAULT p-1 text-center">
              O
            </div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex justify-between">
          <div>Focus Chat</div>
          <div className="flex opacity-60">
            <div className="min-w-[30px] rounded border-DEFAULT p-1 text-center">
              ⌘
            </div>
            <div className="min-w-[30px] rounded border-DEFAULT p-1 text-center">
              Shift
            </div>
            <div className="min-w-[30px] rounded border-DEFAULT p-1 text-center">
              L
            </div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex justify-between">
          <div>Toggle Files</div>
          <div className="flex opacity-60">
            <div className="min-w-[30px] rounded border-DEFAULT p-1 text-center">
              ⌘
            </div>
            <div className="min-w-[30px] rounded border-DEFAULT p-1 text-center">
              Shift
            </div>
            <div className="min-w-[30px] rounded border-DEFAULT p-1 text-center">
              F
            </div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex justify-between">
          <div>Toggle Sidebar</div>
          <div className="flex opacity-60">
            <div className="min-w-[30px] rounded border-DEFAULT p-1 text-center">
              ⌘
            </div>
            <div className="min-w-[30px] rounded border-DEFAULT p-1 text-center">
              Shift
            </div>
            <div className="min-w-[30px] rounded border-DEFAULT p-1 text-center">
              S
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
