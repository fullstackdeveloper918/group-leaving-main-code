import { Configuration } from '@azure/msal-browser';

let MSAL_CONFIG: Configuration;

export const setupMSALConfig = async () => {
  MSAL_CONFIG = {
    auth: {
      clientId: "bd5d772a-376c-4c1a-90bc-f5686a998686",
      authority: "https://login.microsoftonline.com/fcadd6f2-6112-42fc-a2c7-4873f3baf5ad",
      redirectUri: 'http://localhost:3000//login', 
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: true,
    },
    telemetry: {
      application: {
        appName: 'YourAppName',
        appVersion: '1.0.0',
      },
    },
  };
  return MSAL_CONFIG;
};

export const loginRequest = {
  scopes: ['openid', 'profile', 'User.Read'],
};
