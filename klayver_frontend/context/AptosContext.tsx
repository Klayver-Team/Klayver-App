import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Aptos,
  AptosConfig,
  Network,
  Account,
  Ed25519PrivateKey,
  AccountAddress,
  MultiAgentRawTransaction,
  SimpleTransaction,
} from "@aptos-labs/ts-sdk";

interface AptosContextValue {
    aptos: Aptos | null;
    setAptos: React.Dispatch<React.SetStateAction<Aptos | null>>;
    createAccount: () => Promise<{ // Corrected function name here
      privateKey: string;
      address: string;
    }>
    getAccount: (privateKeyBytes: string) => Promise<any>
    getAccountOwnedToken: (accountAddress: AccountAddress) => Promise<void>
    sendSimpleTransaction: (accountAddress: AccountAddress, argument: any[]) => Promise<SimpleTransaction | undefined>
    buildComplexTransaction: (accountAddress: AccountAddress, secondarySignerAccount: AccountAddress, argument: any[], functionName: any, typeFunction: string[]) => Promise<MultiAgentRawTransaction | undefined>
  }

// Initialize the context with a default value
const AptosContext = createContext<AptosContextValue>({
    aptos: null, // Use null or an empty object that matches the Aptos type
    setAptos: () => { },
    createAccount: function (): Promise<{ // Corrected function name here
        privateKey: string; address: string;
    }> {
        throw new Error("Function not implemented.");
    },
    getAccount: function (privateKeyBytes: string): Promise<any> {
        throw new Error("Function not implemented.");
    },
    getAccountOwnedToken: function (accountAddress: AccountAddress): Promise<void> {
        throw new Error("Function not implemented.");
    },
    sendSimpleTransaction: function (accountAddress: AccountAddress, argument: any[]): Promise<SimpleTransaction | undefined> {
        throw new Error("Function not implemented.");
    },
    buildComplexTransaction: function (accountAddress: AccountAddress, secondarySignerAccount: AccountAddress, argument: any[], functionName: any, typeFunction: string[]): Promise<MultiAgentRawTransaction | undefined> {
        throw new Error("Function not implemented.");
    }
});

export const useAptos = () => useContext(AptosContext);

export const AptosProvider: React.FC = ({ children }) => {
  const [aptos, setAptos] = useState<Aptos | null>(null);
  const aptosConfig = new AptosConfig({ network: Network.TESTNET });

  // Create the Aptos instance and set it in the state
  useEffect(() => {
    const aptosInstance = new Aptos(aptosConfig);
    setAptos(aptosInstance);
  }, []);

  async function createAccount(): Promise<{
    privateKey: string;
    address: string;
  }> {
    const account = await Account.generate();
    return { privateKey: account.privateKey, address: account.accountAddress };
  }

  async function getAccount(privateKeyBytes: string): Promise<any> {
    const privateKey = new Ed25519PrivateKey(privateKeyBytes);
    const account = Account.fromPrivateKey({ privateKey });
    return account;
  }

  const getAccountOwnedToken = async (accountAddress: AccountAddress) => {
    const tokens = await aptos?.getAccountOwnedTokens({
      accountAddress: accountAddress,
      options: {
        tokenStandard: "v2",
        pagination: { offset: 0, limit: 10 },
        orderBy: [{ last_transaction_version: "desc" }],
      },
    });
  };

  const sendSimpleTransaction = async (
    accountAddress: AccountAddress,
    argument: any[]
  ) => {
    // build a transaction
    const transaction = await aptos?.transaction.build.simple({
      sender: accountAddress,
      data: {
        function: "0x1::coin::transfer",
        typeArguments: ["0x1::aptos_coin::AptosCoin"],
        functionArguments: argument,
      },
    });

    return transaction;
  };

  const buildComplexTransaction = async (
    accountAddress: AccountAddress,
    secondarySignerAccount: AccountAddress,
    argument: any[],
    functionName: any,
    typeFunction: string[]
  ) => {
    // build a transaction
    const transaction = await aptos?.transaction.build.multiAgent({
      sender: accountAddress,
      secondarySignerAddresses: [secondarySignerAccount],
      data: {
        function: functionName,
        typeArguments: typeFunction,
        functionArguments: argument,
      },
    });
    return transaction;
  };
  return (
    <AptosContext.Provider value={{ aptos, setAptos, createAccount, getAccount, getAccountOwnedToken, buildComplexTransaction, sendSimpleTransaction }}>
      {children}
    </AptosContext.Provider>
  );
};
