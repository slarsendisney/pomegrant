import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "../auth/auth-context";

export const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
  const { sendToContract } = useAuth();

  useEffect(() => {
    setTimeout(async() => {
      const response = await sendToContract("sldcodes.testnet", 0.1);
      console.log(response);
    }, 1000)
  }, []);

  return (
    <ContractContext.Provider value={{}}>{children}</ContractContext.Provider>
  );
};

export const useContract = () => {
  const context = React.useContext(ContractContext);
  if (context === undefined) {
    throw new Error("useContract must be used within a ContractProvider");
  }
  return context;
};
