import { LazyMotion, domAnimation } from "framer-motion";
import { AuthProvider } from "../context/auth/auth-context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <LazyMotion features={domAnimation}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </LazyMotion>
  );
}

export default MyApp;
