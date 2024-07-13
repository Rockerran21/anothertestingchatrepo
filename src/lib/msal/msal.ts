import {
  EventType,
  AuthenticationResult,
  PublicClientApplication,
} from "@azure/msal-browser";

import { msalConfig, loginRequest } from "./authConfig";

export const msalInstance = new PublicClientApplication(msalConfig);

export function initializeMsal() {
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }

  msalInstance.addEventCallback(async (event) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const payload = event.payload as AuthenticationResult;
      const account = payload.account;
      msalInstance.setActiveAccount(account);
    }
  });
}

export const handleLogin = async (
  loginType: "popup" | "redirect" = "redirect",
) => {
  try {
    let response;
    if (loginType === "popup") {
      response = await msalInstance.loginPopup(loginRequest);
    } else if (loginType === "redirect") {
      response = await msalInstance.loginRedirect(loginRequest);
    }
    if (response && response.account) {
      return response;
    }
  } catch (error) {
    console.error(`Login failed: ${error}`);
    return error;
  }
};

export const handleLogout = async (
  logoutType: "popup" | "redirect" = "redirect",
) => {
  try {
    if (logoutType === "popup") {
      await msalInstance.logoutPopup();
    } else if (logoutType === "redirect") {
      const logoutRequest = {
        account: msalInstance.getActiveAccount(),
        postLogoutRedirectUri: "/login",
      };
      await msalInstance.logoutRedirect(logoutRequest);
    }
  } catch (error) {
    console.error(`Logout failed: ${error}`);
  }
};
