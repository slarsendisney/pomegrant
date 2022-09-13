import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth/auth-context";
import { useLocalStorage } from "../../utils/useLocalStorage";
import Globe from "../assets/Globe";
import Logo from "../assets/Logo";
import NEARLogo from "../assets/NEARLogo";
import Menu from "../shared/Menu";

const TitledDivider = ({ title }) => {
  return (
    <div className="relative">
      <div className="w-full h-0.5 bg-gray-300" />
      <p className="text-gray-500 bg-white text-xs pr-1 absolute top-0 left-0 -mt-2 uppercase">
        {title}
      </p>
    </div>
  );
};

const Supported = ({ pageSupported, pageWeight }) => {
  const { sendToContract } = useAuth();
  const [active, setActive] = useLocalStorage("activeSwitch", false);
  const [carbonSaved, setCarbonSaved] = useLocalStorage("carbon-saved", 2);
  const [amount, setAmount] = useLocalStorage("amountDontaed", 0);

  useEffect(() => {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      async function (tabs) {
        var activeTab = tabs[0];
        var activeTabId = activeTab.id;
        chrome.scripting.executeScript({
          target: { tabId: activeTabId },
          files: ["grab-page-weight.js"],
        });
      }
    );
  }, []);

  useEffect(() => {
    if (active) {
      chrome.tabs.query(
        { active: true, currentWindow: true },
        async function (tabs) {
          var activeTab = tabs[0];
          var activeTabId = activeTab.id;
          chrome.scripting.executeScript({
            target: { tabId: activeTabId },
            files: ["go-ad-free.js"],
          });
        }
      );
    } else {
      chrome.tabs.query(
        { active: true, currentWindow: true },
        async function (tabs) {
          var activeTab = tabs[0];
          var activeTabId = activeTab.id;
          chrome.scripting.executeScript({
            target: { tabId: activeTabId },
            files: ["restore-ads.js"],
          });
        }
      );
    }
  }, [active]);

  useEffect(() => {
    if (active) {
      setCarbonSaved((carbonSaved) => carbonSaved + 4.61 * 0.18);
      const interval = setInterval(() => {
        setCarbonSaved((carbonSaved) => carbonSaved + 4.61 * 0.18);
        sendToContract(pageSupported, 0.001);
        setAmount((amount) => amount + 0.001);
      }, 20000);
      return () => clearInterval(interval);
    }
  }, [active]);

  return (
    <div className="login background-grad w-full h-full">
      <div className="w-full h-full flex flex-col  justify-center space-y-4  p-6">
        <Menu withLogo pageSupported={pageSupported} />
        <p className="text-xs text-gray-600">
          Enabling Pomegrant will reduced page weight by 23%.
        </p>
        <TitledDivider title="Support" />
        <div class="flex space-x-2 items-center">
          <label class="relative inline-block w-10 h-6 rounded-full">
            <input
              type="checkbox"
              class="peer opacity-0 w-0 h-0"
              onChange={() => setActive(!active)}
              checked={active}
            />
            <span
              class="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full duration-300 before:content-[''] before:absolute before:w-4 before:h-4 before:bottom-1 before:left-1 before:rounded-full
                before:bg-white before:duration-300 peer-checked:before:translate-x-4 peer-checked:bg-pink-600"
            ></span>
          </label>
          <p>Support {active ? "enabled" : "disabled"}.</p>
        </div>
        {!active && (
          <p className="text-xs text-gray-600 pb-4">
            When enabled you will stream 0.03 NEAR to the publisher of this page
            per minute of viewing.
          </p>
        )}

        <TitledDivider title="Stats" />
        <div className="grid gap-4">
          <div className="bg-pink-100 text-pink-800 p-1 rounded flex space-x-2 items-center px-2">
            <Globe className="h-6 w-6" />
            <p>
              <span className="font-bold">{carbonSaved.toFixed(1)}g</span> of
              carbon saved
            </p>
          </div>
          <div className="bg-pink-100 text-pink-800 p-1 rounded flex space-x-2 items-center px-2">
            <NEARLogo className="h-4 w-4 mx-1" />
            <p>
              <span className="font-bold">{amount}</span> NEAR donated
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Supported;
