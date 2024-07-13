"use client";

import { FC, useState } from "react";
import {
  IconMinusVertical,
  IconChevronCompactRight,
} from "@tabler/icons-react";

import { cn } from "@/lib/utils";
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { WithTooltip } from "./with-tooltip";
import { Sidebar } from "../sidebar/sidebar";

export const SIDEBAR_WIDTH = 350;

interface DashboardProps {
  children: React.ReactNode;
}

export const Dashboard: FC<DashboardProps> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleToggleSidebar = () => {
    setShowSidebar((prevState) => !prevState);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    if (showSidebar) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="flex size-full">
      <div
        className={cn(
          "duration-200 dark:border-none" + (showSidebar ? "" : ""),
        )}
        style={{
          minWidth: showSidebar ? `${SIDEBAR_WIDTH}px` : "0px",
          maxWidth: showSidebar ? `${SIDEBAR_WIDTH}px` : "0px",
          width: showSidebar ? `${SIDEBAR_WIDTH}px` : "0px",
        }}
      >
        {showSidebar && (
          <Tabs value="chats" className="flex h-full">
            <Sidebar showSidebar={showSidebar} />
          </Tabs>
        )}
      </div>

      <div className="bg-muted/50 relative flex w-screen min-w-[90%] grow flex-col sm:min-w-fit">
        {children}
        <div
          className={cn(
            "absolute left-[4px] top-[50%] z-10 size-[32px] cursor-pointer",
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <WithTooltip
            delayDuration={0}
            display={
              <div>{showSidebar ? "Close sidebar" : "Open sidebar"}</div>
            }
            trigger={
              <Button
                className="size-[32px]"
                style={{
                  transform: showSidebar ? "rotate(180deg)" : "rotate(0deg)",
                }}
                size="icon"
                variant="ghost"
                onClick={handleToggleSidebar}
              >
                {showSidebar && !isHovered ? (
                  <IconMinusVertical size={60} stroke={2} />
                ) : (
                  <IconChevronCompactRight size={30} stroke={2} />
                )}
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
};
