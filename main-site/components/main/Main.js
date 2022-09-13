import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth/auth-context";
import AutoRefresh from "../assets/AutoRefresh";
import NEARLogo from "../assets/NEARLogo";
import Complete from "../assets/Complete";
import Logo from "../assets/Logo";
import { utils } from "near-api-js";

export const Main = () => {
  const { wallet } = useAuth();

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const getBalance = async () => {
      const balance = await wallet.account.getAccountBalance();
      setBalance(utils.format.formatNearAmount(balance.available));
    };
    getBalance();
  }, []);

  return (
    <div className="full-page-wrapper text-pink-800">
      <div className="card bg-white rounded flex items-center justify-center space-y-4 max-w-xl">
        <Complete className="h-12 w-12" />
        <h1 className="text-2xl font-medium">
          You're set up and ready to support!
        </h1>
        <p>
          We've successfully connected your NEAR wallet to the Pomegrant
          extension. You can start browsing the web and supporting your favorite
          creators.
        </p>
      </div>
    </div>
  );
};
