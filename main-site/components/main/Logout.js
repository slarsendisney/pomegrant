import { useAuth } from "../../context/auth/auth-context";

export const Logout = () => {
  const { signOut } = useAuth();

  return <button className="btn-primary" onClick={signOut}>LOGOUT </button>;
};
