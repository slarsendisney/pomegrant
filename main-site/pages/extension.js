import { Main } from "../components/main/Main";
import { ExtensionProvider } from "../context/extension/contract-context";

export default function Extension() {
  return (
      <ExtensionProvider>
        <Main />
      </ExtensionProvider>
  );
}
