"use client";

import { ChatDetailsUI } from "@/components/chat/chat-details-ui";
import { Dashboard } from "@/components/ui/dashboard";

export default function ChatIDPage() {
  return (
    <Dashboard>
      <ChatDetailsUI />
    </Dashboard>
  );
}
