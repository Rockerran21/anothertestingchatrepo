"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  MsalProvider,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { initializeMsal, msalInstance } from "./msal";

export default function MyMsalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    initializeMsal();
  }, []);

  useEffect(() => {
    const checkAccount = async () => {
      const account = msalInstance.getActiveAccount();
      if (!account) {
        router.push("/login");
      }
    };
    checkAccount();
  }, [router]);

  return (
    <MsalProvider instance={msalInstance}>
      <AuthenticatedTemplate>{children}</AuthenticatedTemplate>
      <UnauthenticatedTemplate>{children}</UnauthenticatedTemplate>
    </MsalProvider>
  );
}
