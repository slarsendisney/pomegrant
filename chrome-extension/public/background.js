chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    if (request.type === "NEAR_OAUTH") {
      chrome.storage.local.set({
        accountId: request.accountId,
        privateKey: request.privateKey,
        publicKey: request.publicKey,
      });
    }
    if(request.type === "PAGE_WEIGHT") {
      console.log(request)
      chrome.runtime.sendMessage(
        {
          pageWeight: request.pageWeight,
          adFree: request.adFree,
          method: "pageWeight",
        }
      )
    }
    sendResponse({ received: true }); //respond however you like
  }
  
);
