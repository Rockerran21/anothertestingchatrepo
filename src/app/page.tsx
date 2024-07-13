"use client";

import { ChatUI } from "@/components/chat/chat-ui";
import { Dashboard } from "@/components/ui/dashboard";

const Home = () => {
  return (
    <div className="flex h-screen w-full flex-col">
      <Dashboard>
        <ChatUI />
      </Dashboard>
    </div>
  );
};

export default Home;
