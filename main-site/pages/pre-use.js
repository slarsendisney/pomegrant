import Link from "next/link";
import { useEffect, useState } from "react";
import AutoRefresh from "../components/assets/AutoRefresh";
import NEARLogo from "../components/assets/NEARLogo";
import Logo from "../components/assets/Logo";
import Menu from "../components/main/Menu";
export default function Home() {
  const [isExtensionInstalled, setIsExtensionInstalled] = useState(false);
  useEffect(() => {
    const checkInstalled = async () => {
      if (!isExtensionInstalled) {
        chrome.runtime.sendMessage(
          "icannhlkkebffkcfgonfhengcgibfpbb",
          { type: "PING" },
          function (response) {
            if (response) {
              setIsExtensionInstalled(true);
            } else {
              setIsExtensionInstalled(false);
            }
          }
        );
      }
    };
    const checkInstalledLoop = async () => {
      while (!isExtensionInstalled) {
        checkInstalled();
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    };
    (() => {
      checkInstalledLoop();
    })();
  }, [isExtensionInstalled]);

  if (!isExtensionInstalled) {
    return (
      <div className="full-page-wrapper text-pink-800">
        <div className="card bg-white rounded flex items-center justify-center space-y-4 max-w-xl">
          <AutoRefresh />
          <h1 className="text-2xl font-medium">
            Installl the Pomegrant Extension
          </h1>
          <p>
            Before continuing, please install the Pomegrant extension from the
            chrome web store. This page will automatically refresh once
            installed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="full-page-wrapper text-pink-800">
      <Menu />
      <div className="card bg-white rounded flex items-center justify-center space-y-4 max-w-xl">
        <Logo className="h-12 w-12" />
        <h1 className="text-2xl font-medium">Pomergrant Extension Installed</h1>
        <p>
          It looks like you already have our chome extension installed and
          you're logged into NEAR. Let's link your NEAR account to your
          Pomergrant extension.
        </p>
        <Link href="/extension">
          <a className="btn-primary flex space-x-2 items-center justify-center">
            <NEARLogo className="h-4 w-4" />
            <p>Link account</p>
          </a>
        </Link>
      </div>
    </div>
  );
}
