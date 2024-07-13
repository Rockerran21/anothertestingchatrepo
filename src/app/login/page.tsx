import { Metadata } from "next";

import { LoginUI } from "@/components/login/login-ui";

const APP_TAB_BAT_TITLE = "RH GPT - Login";

export const metadata: Metadata = {
  title: APP_TAB_BAT_TITLE,
};

export default function Login() {
  return (
    <div className="flex h-screen w-full flex-col justify-center gap-2 px-8 ">
      <LoginUI />
    </div>
  );
}
