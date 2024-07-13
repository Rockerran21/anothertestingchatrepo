"use client";

import { FC } from "react";
import { useTheme } from "next-themes";
import { IconMoon, IconSun } from "@tabler/icons-react";

import { WithTooltip } from "./with-tooltip";

interface ChatThemeProps {}

export const ChatTheme: FC<ChatThemeProps> = ({}) => {
  const { setTheme, theme } = useTheme();

  const toggleTheme = (theme: "dark" | "light") => {
    localStorage.setItem("theme", theme);

    setTheme(theme);
  };

  return (
    <div
      onClick={() => toggleTheme(theme === "light" ? "dark" : "light")}
      className="cursor-pointer flex items-center space-x-2"
    >
      <WithTooltip
        delayDuration={0}
        display={<div>{theme === "dark" ? "Dark Mode" : "Light Mode"}</div>}
        trigger={
          theme === "dark" ? <IconMoon size={24} /> : <IconSun size={24} />
        }
      />
    </div>
  );
};
