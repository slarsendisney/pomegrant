import { useAuth } from "../../context/auth/auth-context";

export const Logout = () => {
  const { logout } = useAuth();

  return <button className="btn-primary" onClick={logout}>LOGOUT </button>;
};
