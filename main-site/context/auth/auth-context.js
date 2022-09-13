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
import Logo from "../../components/assets/Logo";
import NEARLogo from "../../components/assets/NEARLogo";
import AutoRefresh from "../../components/assets/AutoRefresh";

const publicRoutes = ["/"];

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
    return (
      <div className="full-page-wrapper text-pink-800 space-y-4">
        <AutoRefresh />
        <p className="text-2xl font-medium ">Loading...</p>
      </div>
    );
  }

  if (!isSignedIn && authRequired) {
    return (
      <div className="full-page-wrapper text-pink-800">
        <div className="card bg-white rounded flex items-center justify-center space-y-4 max-w-xl">
          <Logo className="h-12 w-12" />
          <h1 className="text-2xl font-medium">Welcome to Pomergrant</h1>
          <p>Please sign in with your NEAR wallet to continue.</p>

          <button
            className="btn-primary flex space-x-2 items-center justify-center"
            onClick={() =>
              wallet.signIn({
                successUrl: "https://sld.localhost/extension",
                failureUrl: "https://sld.localhost/extension",
              })
            }
          >
            <NEARLogo className="h-4 w-4" />
            <p>Sign in with NEAR</p>
          </button>
        </div>
      </div>
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
