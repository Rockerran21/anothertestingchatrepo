import { FC, useState } from "react";

import { ChatOption } from "../models/chat-option";
import { UpdateChat } from "./update-chat";
import { DeleteChat } from "./delete-chat";

interface ChatListItemProps {
  type: "chat" | "folder";
  title: string;
  isItemSelected?: boolean;
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  handleUpdateChat: (title: string) => void;
  handleDeleteChat: () => void;
  handleChatItemClicked?: () => void;
}

export const ChatListItem: FC<ChatListItemProps> = ({
  type,
  title,
  isItemSelected = false,
  onDragStart,
  handleUpdateChat,
  handleDeleteChat,
  handleChatItemClicked,
}) => {
  const [showChatOptionPopover, setShowChatOptionPopover] = useState(false);
  const [updateChatVisible, setUpdateChatVisible] = useState(false);
  const [deleteChatVisible, setDeleteChatVisible] = useState(false);

  const handleEditClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setShowChatOptionPopover(false);
    setUpdateChatVisible(true);
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setShowChatOptionPopover(false);
    setDeleteChatVisible(true);
  };

  return (
    <>
      <div
        draggable
        onDragStart={onDragStart}
        className={`flex flex-row items-center justify-between p-2 group my-1 rounded ${type === "chat" && "hover:bg-selected"} ${type === "chat" && isItemSelected && "bg-muted"}`}
        onClick={handleChatItemClicked}
      >
        <div
          className={`truncate text-sm font-semibold ${type === "chat" && "ml-2"}`}
        >
          {title}
        </div>
        <div className="invisible group-hover:visible">
          <ChatOption
            open={showChatOptionPopover}
            onOpenChange={setShowChatOptionPopover}
            onChatOptionClicked={(
              event: React.MouseEvent<SVGSVGElement, MouseEvent>,
            ) => {
              event.stopPropagation();
              setShowChatOptionPopover(!showChatOptionPopover);
            }}
            onEditClicked={handleEditClick}
            onDeleteClicked={handleDeleteClick}
          />
        </div>
      </div>
      <UpdateChat
        title={title}
        dialogTitle={`${type === "folder" ? "Rename Folder" : "Rename Chat"}`}
        open={updateChatVisible}
        onOpenChange={setUpdateChatVisible}
        onCancelUpdateChat={() => setUpdateChatVisible(false)}
        onUpdateChat={(updatedTitle) => {
          handleUpdateChat(updatedTitle);
          setUpdateChatVisible(false);
        }}
      />
      <DeleteChat
        open={deleteChatVisible}
        dialogTitle={`${type === "folder" ? "Delete Folder" : "Delete Chat"}`}
        onOpenChange={setDeleteChatVisible}
        onCancelChat={() => setDeleteChatVisible(false)}
        onDeleteChat={() => {
          handleDeleteChat();
          setDeleteChatVisible(false);
        }}
      />
    </>
  );
};
