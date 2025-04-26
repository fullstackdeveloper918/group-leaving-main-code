// app/context/AccessTokenContext.tsx
'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the context type
interface AccessTokenContextType {
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create the context with a default value
const AccessTokenContext = createContext<AccessTokenContextType | undefined>(undefined);

// Create a provider component
export const AccessTokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  return (
    <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
};

// Custom hook to use the AccessToken context
export const useAccessToken = (): AccessTokenContextType => {
  const context = useContext(AccessTokenContext);
  if (!context) {
    throw new Error('useAccessToken must be used within an AccessTokenProvider');
  }
  return context;
};
