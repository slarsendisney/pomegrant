import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  Contract,
  utils,
  providers,
  KeyPair,
  keyStores,
  connect,
  WalletConnection,
} from "near-api-js";
import Login from "../../components/login/Login";

const THIRTY_TGAS = "30000000000000";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chrome.storage.local.get(
      ["accountId", "privateKey"],
      async (result) => {
        console.log(result);
        if (result.accountId && result.privateKey) {
          console.log("creating keystore");
          const nearKeyStore = new keyStores.BrowserLocalStorageKeyStore();
          const keyPair = KeyPair.fromString(result.privateKey);
          await nearKeyStore.setKey("testnet", result.accountId, keyPair);
          console.log("creating connection");
          const nearConnectionConfig = {
            networkId: "testnet",
            network: {
              nodeUrl: "https://rpc.testnet.near.org",
            },
            keyStore: nearKeyStore,
            nodeUrl: "https://rpc.testnet.near.org",
            walletUrl: "https://wallet.testnet.near.org",
            helperUrl: "https://helper.testnet.near.org",
            explorerUrl: "https://explorer.testnet.near.org",
          };
          const nearConnection = await connect(nearConnectionConfig);
          const account = await nearConnection.account(result.accountId);
          setAccount(account);
          const nearContract = new Contract(
            account, // the account object that is connecting
            process.env.CONTRACT_NAME,
            {
              // name of contract you're connecting to
              viewMethods: ["getMessages"], // view methods do not change state but usually return a value
              changeMethods: ["sponsor"], // change methods modify state
              sender: account, // account object to initialize and sign transactions.
            }
          );
          setContract(nearContract);
        } else {
          console.log("no account found");
        }
        setLoading(false)
        return;
      }
    );
  }, []);

  const sendToContract = useCallback(
    (beneficiary_id, amount) => {
      let deposit = utils.format.parseNearAmount(amount.toString());
      return contract.sponsor({ beneficiary_id }, THIRTY_TGAS, deposit);
    },
    [contract]
  );

  const logout = useCallback(() => {
    chrome.storage.local.remove(
      ["accountId", "privateKey", "publicKey"],
      () => {
        setAccount(null);
      }
    );
  }, []);

  const isSignedIn = useMemo(() => {
    console.log(account);
    return !!account;
  }, [account]);

  if(loading){
    return <div>Loading...</div>
  }
  if (!isSignedIn) {
    return <Login />;
  }

  return (
    <AuthContext.Provider
      value={{
        sendToContract,
        contract,
        account,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
