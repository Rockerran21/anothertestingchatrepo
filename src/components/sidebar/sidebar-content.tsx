import React, { FC, useState, useContext } from "react";
import { IconLogout2 } from "@tabler/icons-react";
import { useRouter, useParams } from "next/navigation";

import { SidebarSearch } from "./sidebar-search";
import { SidebarCreateButtons } from "./sidebar-create-buttons";
import SidebarDataList from "./sidebar-data-list";
import { handleLogout } from "@/lib/msal/msal";
import { WithTooltip } from "../ui/with-tooltip";
import { LogoutModal } from "./items/models/logout-modal";
import { ChatbotUIContext } from "@/context/context";
import { Folder } from "@/types";

export const SidebarContent: FC = () => {
  const router = useRouter();
  const params = useParams();

  const paramsId = Array.isArray(params.chatid)
    ? params.chatid[0]
    : params.chatid;

  const { chatList, setChatList, setChatMessagesList } =
    useContext(ChatbotUIContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [logoutModalVisible, setLogoutModalVisible] = useState<boolean>(false);

  const handleAddNewFolder = () => {
    const newFolder: Folder = {
      id: `folder${chatList.folders.length + 1}`,
      folderName: `New Folder ${chatList.folders.length + 1}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      items: [],
      index: chatList.folders.length,
    };
    setChatList((prevState) => ({
      ...prevState,
      folders: [...prevState.folders, newFolder],
    }));
  };

  const handleAddNewChat = () => {
    router.push("/");
  };

  const handleUpdateItem = (
    id: string,
    title: string,
    type: "chat" | "folder",
  ) => {
    const updated_at = new Date().toISOString();
    if (type === "chat") {
      setChatList((prevState) => ({
        ...prevState,
        chats: prevState.chats.map((chat) =>
          chat.id === id ? { ...chat, chatName: title, updated_at } : chat,
        ),
      }));
      setChatList((prevState) => ({
        ...prevState,
        folders: prevState.folders.map((folder) => ({
          ...folder,
          items: folder.items.map((item) =>
            item.id === id ? { ...item, chatName: title, updated_at } : item,
          ),
        })),
      }));
    } else {
      setChatList((prevState) => ({
        ...prevState,
        folders: prevState.folders.map((folder) =>
          folder.id === id
            ? { ...folder, folderName: title, updated_at }
            : folder,
        ),
      }));
    }
  };

  const handleDeleteItem = (
    id: string,
    chatId: string | null,
    type: "chat" | "folder",
  ) => {
    if (type === "chat" && chatId) {
      setChatList((prevState) => ({
        ...prevState,
        chats: prevState.chats.filter((chat) => chat.id !== id),
      }));
      setChatList((prevState) => ({
        ...prevState,
        folders: prevState.folders.map((folder) => ({
          ...folder,
          items: folder.items.filter((item) => item.id !== id),
        })),
      }));

      setChatMessagesList((prevState) => {
        const newState = { ...prevState };
        delete newState[chatId];
        return newState;
      });

      if (paramsId === chatId) {
        return handleAddNewChat();
      }
    } else {
      setChatList((prevState) => ({
        ...prevState,
        folders: prevState.folders.filter((folder) => folder.id !== id),
      }));
    }
  };

  const onLogoutClicked = () => {
    setLogoutModalVisible(false);
    handleLogout("redirect");
  };

  const handleChatItemClicked = (routeId: string, type: "chat" | "folder") => {
    if (type === "chat") {
      router.push(`/chat/${routeId}`);
    }
  };

  // Retrieve user info from localStorage
  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = userInfoString
    ? JSON.parse(userInfoString)
    : { userName: "User" };

  // Access userName property
  const userName = userInfo.userName;

  return (
    <div className="flex flex-col h-screen gap-2 p-3">
      <div className="flex flex-shrink-0 items-center flex-col gap-2">
        <SidebarCreateButtons
          hasData={true}
          onAddNewFolder={handleAddNewFolder}
          onAddNewChat={handleAddNewChat}
        />
        <SidebarSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <SidebarDataList
        paramsId={paramsId}
        items={chatList.chats}
        folders={chatList.folders}
        setItems={(newChats) =>
          setChatList((prevState) => ({
            ...prevState,
            chats: newChats,
          }))
        }
        setFolders={(newFolders) =>
          setChatList((prevState) => ({
            ...prevState,
            folders: newFolders,
          }))
        }
        onUpdateItem={handleUpdateItem}
        onDeleteItem={handleDeleteItem}
        onChatItemClicked={handleChatItemClicked}
      />

      <div className="flex flex-shrink-0 items-center justify-center">
        <WithTooltip
          side="top"
          delayDuration={0}
          display={<div>Logout</div>}
          trigger={
            <IconLogout2
              size={30}
              className="mr-4"
              onClick={() => setLogoutModalVisible(true)}
            />
          }
        />
        version 0.0.1
      </div>
      <LogoutModal
        open={logoutModalVisible}
        dialogTitle={userName}
        onOpenChange={setLogoutModalVisible}
        onCancel={() => setLogoutModalVisible(false)}
        onLogout={() => onLogoutClicked()}
      />
    </div>
  );
};
