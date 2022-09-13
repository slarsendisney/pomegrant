import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth/auth-context";
import { Logout } from "./Logout";
import { utils } from "near-api-js";

export const Main = () => {
  const {
    wallet,
  } = useAuth();

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const getBalance = async () => {
      const balance = await wallet.account.getAccountBalance();
      setBalance(utils.format.formatNearAmount(balance.available));
    };
    getBalance();
  }, [])

  return (
    <div className="card">
      <h2 className="text-2xl font-bold">{wallet?.accountId}</h2>
      <p>{parseFloat(balance).toFixed(2)}</p>
      <Logout />
    </div>
  );
};
