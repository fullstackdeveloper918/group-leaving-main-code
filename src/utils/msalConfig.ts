"use client"
import { Configuration } from '@azure/msal-browser';

const msalConfig: Configuration = {
  auth: {
    clientId: 'bd5d772a-376c-4c1a-90bc-f5686a998686', // Replace with your client ID
    authority: 'https://login.microsoftonline.com/fcadd6f2-6112-42fc-a2c7-4873f3baf5ad', // Replace with your tenant ID
    redirectUri: 'http://localhost:3000', // Your redirect URI
  },
};

export default msalConfig;
