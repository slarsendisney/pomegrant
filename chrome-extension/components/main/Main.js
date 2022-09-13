import { useEffect, useState } from "react";
import { useLocalStorage } from "../../utils/useLocalStorage";
import NotSupported from "../notSupported/NotSupported";
import Supported from "../supported/Supported";

export const Main = () => {
  const [pageSupported, setPageSupported] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeURL, setActiveURL] = useState("");
  const [pageWeight, setPageWeight] = useLocalStorage("page-weights", {});

  useEffect(() => {
    chrome.runtime.onMessage.addListener(function (request, sender) {
      if (request.method === "pageWeight") {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          async function (tabs) {
            var activeTab = tabs[0];
            var activeTabURL = activeTab.url;
            setActiveURL(activeTabURL);
            const currenPageWeights = pageWeight;
            if (
              currenPageWeights[activeTabURL] &&
              (!currenPageWeights[activeTabURL].adFree ||
                !currenPageWeights[activeTabURL].normal)
            ) {
              currenPageWeights[activeTabURL][
                request.adFree ? "adFree" : "normal"
              ] = request.pageWeight;
            } else {
              currenPageWeights[activeTabURL] = {
                [request.adFree ? "adFree" : "normal"]: request.pageWeight,
              };
            }
            setPageWeight(currenPageWeights);
          }
        );
      }
    });
  }, []);

  useEffect(() => {
    chrome.runtime.onMessage.addListener(function (request, sender) {
      if (request.method == "getMetas") {
        if (request.meta) {
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
          files: ["grab-page-weight.js", "grab-meta.js"],
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
  return (
    <Supported
      pageWeight={pageWeight[activeURL]}
      pageSupported={pageSupported}
    />
  );
};
