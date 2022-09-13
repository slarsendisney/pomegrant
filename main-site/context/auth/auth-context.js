import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useRouter } from "next/router";
import { Wallet } from "./near-wallet";
import { Contract, utils } from "near-api-js";

const publicRoutes = [
  "/",
  "/pre-login",
];

const THIRTY_TGAS = "30000000000000";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [wallet, setWallet] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);

  const authRequired = useMemo(() => {
    if (publicRoutes.includes(router.pathname)) {
      return false;
    }
    return true;
  }, [router.pathname]);


  // useEffect(() => {
  //   const location = window.location.href;
  //   const url = new URL(location);
  //   const public_key = url.searchParams.get("public_key");

  //   if (!public_key && wallet) {
  //     wallet.signIn({});
  //   }
  // }, [wallet]);

  useEffect(() => {
    const checkStatus = async (nearWallet) => {
      await nearWallet.startUp();
      const nearContract = new Contract(
        nearWallet.account, // the account object that is connecting
        process.env.CONTRACT_NAME,
        {
          // name of contract you're connecting to
          viewMethods: ["getMessages"], // view methods do not change state but usually return a value
          changeMethods: ["sponsor"], // change methods modify state
          sender: wallet, // account object to initialize and sign transactions.
        }
      );
      setWallet(nearWallet);
      setContract(nearContract);
      setLoading(false);
    };
    const nearWallet = new Wallet({
      createAccessKeyFor: process.env.CONTRACT_NAME,
    });

    checkStatus(nearWallet);
  }, []);

  const signOut = useCallback(() => {
    wallet.signOut();
  }, [wallet]);

  const sendMoney = useCallback(
    (address, amount) => {
      wallet.account.sendMoney(address, amount);
    },
    [wallet]
  );

  const sendToContract = useCallback(
    (beneficiary_id, amount) => {
      let deposit = utils.format.parseNearAmount(amount.toString());
      return contract.sponsor({ beneficiary_id }, THIRTY_TGAS, deposit);
    },
    [wallet]
  );

  const getBalance = useCallback(
    async (address, amount) => {
      await wallet.account.getAccountBalance();
    },
    [wallet]
  );

  const isSignedIn = useMemo(() => {
    return wallet && wallet.wallet.isSignedIn();
  }, [wallet]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isSignedIn && authRequired) {
    return (
      <button className="btn-primary" onClick={() => wallet.signIn({})}>
        Sign In
      </button>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        sendMoney,
        sendToContract,
        signOut,
        getBalance,
        wallet,
        contract,
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
