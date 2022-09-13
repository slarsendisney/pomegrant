import { useEffect, useState } from "react";
import Logo from "../assets/Logo";
import NotSupported from "../notSupported/NotSupported";
import Supported from "../supported/Supported";

export const Main = () => {
  const [pageSupported, setPageSupported] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chrome.runtime.onMessage.addListener(function (request, sender) {
      if (request.method == "getMetas") {
        if (request.meta) {
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
          setPageSupported(request.meta.content);
        }
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      async function (tabs) {
        var activeTab = tabs[0];
        var activeTabId = activeTab.id;
        chrome.scripting.executeScript({
          target: { tabId: activeTabId },
          files: ["grab-meta.js"],
        });
      }
    );
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pageSupported) {
    return <NotSupported />;
  }
  return <Supported pageSupported={pageSupported} />;
};
