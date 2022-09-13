import { Main } from "../components/main/Main";
import { ExtensionProvider } from "../context/extension/contract-context";

export default function Home() {
  return (
      <ExtensionProvider>
        <Main />
      </ExtensionProvider>
  );
}
