console.log("going ad free!")
document.dispatchEvent(new CustomEvent('pomegrantEvent', {detail: "ADS_DISABLED"}));
