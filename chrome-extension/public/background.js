chrome.runtime.onMessageExternal.addListener( (request, sender, sendResponse) => {
  chrome.storage.local.set({
    accountId: request.accountId,
    privateKey: request.privateKey,
    publicKey: request.publicKey
  })
  sendResponse({ received: true }); //respond however you like
});