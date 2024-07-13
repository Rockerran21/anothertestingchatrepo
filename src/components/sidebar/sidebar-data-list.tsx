import React, { FC, useRef, useState, useEffect } from "react";
import {
  format,
  isToday,
  isYesterday,
  parseISO,
  subDays,
  isAfter,
  startOfDay,
} from "date-fns";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";

import { ChatListItem } from "./items/chat/chat-list-item";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../ui/collapsible";
import { ChatItem, Folder } from "@/types";

type GroupedItems = {
  [key: string]: ChatItem[];
};

type SidebarDataListProps = {
  items: ChatItem[];
  folders: Folder[];
  paramsId: string;
  setItems: (items: ChatItem[]) => void;
  setFolders: (folders: Folder[]) => void;
  onUpdateItem: (id: string, title: string, type: "chat" | "folder") => void;
  onDeleteItem: (
    id: string,
    chatId: string | null,
    type: "chat" | "folder",
  ) => void;
  onChatItemClicked: (chatMessageKey: string, type: "chat" | "folder") => void;
};

const SidebarDataList: FC<SidebarDataListProps> = ({
  items,
  folders,
  paramsId,
  setItems,
  setFolders,
  onUpdateItem,
  onDeleteItem,
  onChatItemClicked,
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [draggedItem, setDraggedItem] = useState<ChatItem | null>(null);
  const [isFolderListVisible, setFolderListVisible] = useState(true);

  useEffect(() => {
    if (divRef.current) {
      setIsOverflowing(
        divRef.current.scrollHeight > divRef.current.clientHeight,
      );
    }
  }, []);

  const handleDragStart = (item: ChatItem) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (folderId: string) => {
    if (draggedItem) {
      const updated_at = new Date().toISOString();
      const newFolders = folders.map((folder) =>
        folder.id === folderId
          ? {
              ...folder,
              items: [...folder.items, { ...draggedItem, updated_at }],
              updated_at,
            }
          : folder,
      );
      setFolders(newFolders);
      const newItems = items.filter((item) => item.id !== draggedItem.id);
      setItems(newItems);
      setDraggedItem(null);
    }
  };

  const groupItemsByDate = (items: ChatItem[]): GroupedItems => {
    const today = new Date();
    const startOfToday = startOfDay(today);
    const startOfYesterday = subDays(startOfToday, 1);
    const startOfPrevious7Days = subDays(startOfToday, 7);
    const startOfPrevious30Days = subDays(startOfToday, 30);
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    const groups = items.reduce((acc: GroupedItems, item: ChatItem) => {
      const date = parseISO(item.updated_at);
      let groupKey: string;

      if (isToday(date)) {
        groupKey = "Today";
      } else if (isYesterday(date)) {
        groupKey = "Yesterday";
      } else if (
        isAfter(date, startOfPrevious7Days) &&
        !isAfter(date, startOfYesterday)
      ) {
        groupKey = "Previous 7 Days";
      } else if (
        isAfter(date, startOfPrevious30Days) &&
        !isAfter(date, startOfPrevious7Days)
      ) {
        groupKey = "Previous 30 Days";
      } else if (
        isAfter(date, startOfYear) &&
        !isAfter(date, startOfPrevious30Days)
      ) {
        groupKey = format(date, "MMMM");
      } else {
        groupKey = format(date, "yyyy");
      }

      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(item);
      return acc;
    }, {});

    return groups;
  };

  const groupedData = groupItemsByDate(items);

  const keysOrder = [
    "Today",
    "Yesterday",
    "Previous 7 Days",
    "Previous 30 Days",
  ];

  return (
    <div ref={divRef} className="flex flex-col grow overflow-auto">
      {folders.length > 0 && (
        <Collapsible
          className="mt-4"
          open={isFolderListVisible}
          onOpenChange={() => setFolderListVisible(!isFolderListVisible)}
        >
          <CollapsibleTrigger className="flex flex-row items-center justify-between p-2 w-full hover:opacity-50">
            <div className="font-bold">Folders</div>
            {isFolderListVisible ? (
              <IconChevronDown size={20} stroke={3} />
            ) : (
              <IconChevronRight size={20} stroke={3} />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            {folders.map((folder) => (
              <div
                key={folder.id}
                className="rounded"
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(folder.id)}
              >
                <ChatListItem
                  type="folder"
                  title={folder.folderName}
                  onDragStart={() => console.log("test")}
                  handleUpdateChat={(title) =>
                    onUpdateItem(folder.id, title, "folder")
                  }
                  handleDeleteChat={() =>
                    onDeleteItem(folder.id, null, "folder")
                  }
                />
                <div>
                  {folder.items.length === 0 && (
                    <div className="rounded p-2 ml-2 text-muted-foreground italic">
                      No files.
                    </div>
                  )}
                  {folder.items.map((item) => (
                    <div key={item.id} className="rounded">
                      <ChatListItem
                        type="chat"
                        title={item.chatName}
                        isItemSelected={paramsId === item.chatMessageKey}
                        onDragStart={() => handleDragStart(item)}
                        handleUpdateChat={(title) =>
                          onUpdateItem(item.id, title, "chat")
                        }
                        handleDeleteChat={() =>
                          onDeleteItem(item.id, item.chatMessageKey, "chat")
                        }
                        handleChatItemClicked={() =>
                          onChatItemClicked(item.chatMessageKey, "chat")
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}

      {keysOrder.map(
        (date) =>
          groupedData[date]?.length > 0 && (
            <div key={date} className="mt-4">
              <div className="font-bold mb-2">{date}</div>
              <div
                className={`h-full ${
                  isOverflowing ? "w-[calc(100%-8px)]" : "w-full"
                } space-y-2 pt-2 ${isOverflowing ? "mr-2" : ""}`}
              >
                <div className="flex grow flex-col">
                  {groupedData[date].map((item) => (
                    <ChatListItem
                      type="chat"
                      key={item.id}
                      title={item.chatName}
                      isItemSelected={paramsId === item.chatMessageKey}
                      onDragStart={() => handleDragStart(item)}
                      handleUpdateChat={(title) =>
                        onUpdateItem(item.id, title, "chat")
                      }
                      handleDeleteChat={() =>
                        onDeleteItem(item.id, item.chatMessageKey, "chat")
                      }
                      handleChatItemClicked={() =>
                        onChatItemClicked(item.chatMessageKey, "chat")
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          ),
      )}

      {Object.keys(groupedData).map(
        (date) =>
          !keysOrder.includes(date) &&
          groupedData[date]?.length > 0 && (
            <div key={date} className="mt-4">
              <div className="font-bold mb-2">{date}</div>
              <div
                className={`h-full ${
                  isOverflowing ? "w-[calc(100%-8px)]" : "w-full"
                } space-y-2 pt-2 ${isOverflowing ? "mr-2" : ""}`}
              >
                <div className="flex grow flex-col">
                  {groupedData[date].map((item) => (
                    <ChatListItem
                      type="chat"
                      key={item.id}
                      title={item.chatName}
                      isItemSelected={paramsId === item.chatMessageKey}
                      onDragStart={() => handleDragStart(item)}
                      handleUpdateChat={(title) =>
                        onUpdateItem(item.id, title, "chat")
                      }
                      handleDeleteChat={() =>
                        onDeleteItem(item.id, item.chatMessageKey, "chat")
                      }
                      handleChatItemClicked={() =>
                        onChatItemClicked(item.chatMessageKey, "chat")
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          ),
      )}
    </div>
  );
};

export default SidebarDataList;
