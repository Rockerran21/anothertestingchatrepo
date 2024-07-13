import { FC } from "react";

import { Input } from "../ui/input";

interface SidebarSearchProps {
  searchTerm: string;
  setSearchTerm: Function;
}

export const SidebarSearch: FC<SidebarSearchProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <Input
      disabled
      value={searchTerm}
      placeholder="Search chats..."
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};
