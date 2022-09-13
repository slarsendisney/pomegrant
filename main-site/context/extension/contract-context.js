import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "../auth/auth-context";

export const ExtensionContext = createContext();

export const ExtensionProvider = ({ children }) => {
  const { wallet } = useAuth();

  useEffect(() => {
    const accountId = wallet.accountId;
    const privateKey = localStorage.getItem(
      `near-api-js:keystore:${wallet.accountId}:testnet`
    );
    chrome.runtime.sendMessage(
      "icannhlkkebffkcfgonfhengcgibfpbb",
      { accountId, privateKey, type: "NEAR_OAUTH" },
      function (response) {
        console.log(response);
      }
    );
  }, []);

  return (
    <ExtensionContext.Provider value={{}}>{children}</ExtensionContext.Provider>
  );
};

export const useExtension = () => {
  const context = React.useContext(ExtensionContext);
  if (context === undefined) {
    throw new Error("useExtension must be used within a ExtensionProvider");
  }
  return context;
};
