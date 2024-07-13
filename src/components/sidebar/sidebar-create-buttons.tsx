import { FC } from "react";

import { IconFolderPlus, IconEdit } from "@tabler/icons-react";

import { WithTooltip } from "../ui/with-tooltip";

interface SidebarCreateButtonsProps {
  hasData: boolean;
  onAddNewFolder: () => void;
  onAddNewChat: () => void;
}

export const SidebarCreateButtons: FC<SidebarCreateButtonsProps> = ({
  hasData,
  onAddNewFolder,
  onAddNewChat,
}) => {
  return (
    <div className="flex w-full space-x-2 justify-between">
      {hasData && (
        <div
          className="size-[36px] p-1 hover:opacity-100"
          onClick={onAddNewFolder}
        >
          <WithTooltip
            delayDuration={0}
            display={<div>Add Folder</div>}
            trigger={<IconFolderPlus size={20} />}
          />
        </div>
      )}

      <div className="flex h-[36px] hover:opacity-100" onClick={onAddNewChat}>
        <WithTooltip
          delayDuration={0}
          display={<div>New Chat</div>}
          trigger={<IconEdit size={20} stroke={2} />}
        />
      </div>
    </div>
  );
};
