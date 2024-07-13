import { FC } from "react";

import { SIDEBAR_WIDTH } from "../ui/dashboard";
import { TabsContent } from "../ui/tabs";
import { SidebarContent } from "./sidebar-content";

interface SidebarProps {
  showSidebar: boolean;
}

export const Sidebar: FC<SidebarProps> = ({ showSidebar }) => {
  return (
    <TabsContent
      className="m-0 w-full space-y-2"
      style={{
        minWidth: showSidebar ? SIDEBAR_WIDTH : "0px",
        maxWidth: showSidebar ? SIDEBAR_WIDTH : "0px",
        width: showSidebar ? SIDEBAR_WIDTH : "0px",
      }}
      value="chats"
    >
      <SidebarContent />
    </TabsContent>
  );
};
