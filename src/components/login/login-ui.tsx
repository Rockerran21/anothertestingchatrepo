"use client";

import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AccountInfo } from "@azure/msal-browser";
import { toast } from "sonner";

import { Brand } from "../ui/brand";
import { ChatInfo } from "../ui/chat-info";
import { ChatTheme } from "../ui/chat-theme";
import { SubmitButton } from "../ui/submit-button";

import { msalInstance, handleLogin } from "@/lib/msal/msal";

interface LoginUIProps {}

interface AddUserResponse {
  result: {
    userID: string;
    groupID: string;
    userDisplayName: string;
    department: string;
    manager: string;
    dateCreated: string;
    dateModified: string;
    lastUpdated: string;
    activeEnabled: boolean;
    geoLocation: string;
    country: string;
    userAlreadyExist: boolean;
  };
}

export const LoginUI: FC<LoginUIProps> = ({}) => {
  const router = useRouter();

  useEffect(() => {
    const checkAccount = async () => {
      const account = msalInstance.getActiveAccount();
      if (account) {
        const redirectTo = "/";
        router.push(redirectTo);
      }
    };
    checkAccount();
  }, [router]);

  /**
   * login to msal
   */
  const onLoginToMicrosoftAccount = async () => {
    const loginPromise = new Promise<string>(async (resolve, reject) => {
      try {
        const msalResponse = (await handleLogin("popup")) as {
          account: AccountInfo;
        };

        if (msalResponse && msalResponse.account && msalResponse.account.name) {
          resolve(msalResponse.account.name);

          const bodyData = {
            userID: msalResponse.account.localAccountId,
            groupID: "C744CCE8-2370-49D6-A484-16227CFC803A",
            userDisplayName: msalResponse.account.name,
            department: "ATI Marketing Services",
            manager: "alllam01",
            dateCreated: "2024-06-27T16:35:57.262Z",
            dateModified: "2024-06-27T16:35:57.262Z",
            lastUpdated: "2024-06-27T16:35:56.506Z",
            activeEnabled: true,
            geoLocation: "NAM",
            country: "US",
          };

          const addUserResponse = await fetch("/api/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyData),
          });

          if (!addUserResponse.ok) {
            throw new Error(
              `HTTP error! status: ${addUserResponse.status} Failed to add user to the database.`,
            );
          }

          const addUserData: AddUserResponse = await addUserResponse.json();

          if (addUserData.result) {
            localStorage.setItem(
              "userInfo",
              JSON.stringify({
                userID: addUserData.result.userDisplayName,
                userName: addUserData.result.userDisplayName,
              }),
            );
            if (addUserData.result.userAlreadyExist) {
              toast.success(
                `Welcome back! ${addUserData.result.userDisplayName}`,
              );
            } else {
              toast.success(
                `${addUserData.result.userDisplayName} successfully added to the database.`,
              );
            }
          }

          msalInstance.setActiveAccount(msalResponse.account);
        } else {
          reject(new Error("Login failed"));
        }
      } catch (err) {
        console.log("err", err);
        reject(err);
      }
    });

    toast.promise(loginPromise, {
      loading: "Please add Microsoft credentials to login",
      success: (data: string) => `${data} toast has been added`,
      error: (err: Error) => `Error: ${err.message}`,
    });
  };

  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-10">
        <Brand />
      </div>

      <div className="absolute right-2 top-2">
        <ChatTheme />
      </div>

      <SubmitButton
        className="mb-2 w-full self-center rounded-md bg-blue-700 px-4 py-2 text-white sm:w-2/4 hover:bg-blue-700"
        onClick={() => onLoginToMicrosoftAccount()}
      >
        Login to Microsoft Account
      </SubmitButton>

      <div className="absolute bottom-4 md:bottom-8 md:block hidden">
        <ChatInfo />
      </div>
    </div>
  );
};
