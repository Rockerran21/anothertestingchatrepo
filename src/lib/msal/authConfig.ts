// // authConfig.ts
// import { Configuration, PopupRequest } from "@azure/msal-browser";

// export const msalConfig: Configuration = {
//   auth: {
//     clientId: "24d6be53-17c0-483a-a247-d57b20dae072", // Replace with your client ID
//     authority:
//       "https://login.microsoftonline.com/f41744ba-a8eb-4eff-bd47-a211592ebb0f", // Replace with your tenant ID
//     redirectUri: "http://localhost:3000", // Replace with your redirect URI
//   },
//   cache: {
//     cacheLocation: "localStorage", // This configures where your cache will be stored
//     storeAuthStateInCookie: false, // Set to true if you are having issues on IE11 or Edge
//   },
// };

// export const loginRequest: PopupRequest = {
//   scopes: ["User.Read"],
// };

const CLIENT_ID = "d67fb9c3-fff7-4ca1-aadc-614d9fe1e933";
export const API_SCOPE = "api://" + CLIENT_ID + "/YourAppName";

export const msalConfig = {
  auth: {
    clientId: CLIENT_ID,
    authority:
      "https://login.microsoftonline.com/f41744ba-a8eb-4eff-bd47-a211592ebb0f",
    redirectUri: "http://localhost:3000/",
    postLogoutRedirectUri: "http://localhost:3000/login",
    scope: API_SCOPE,
    domain: "http://localhost:3000/",
  },
  cache: {
    // Optional
    cacheLocation: "localStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

export const loginRequest = {
  // scopes: ["user.read"],
  scopes: ["user.read", "profile", "openid"],
};

export const userDataLoginRequest = {
  scopes: ["user.read"],
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
