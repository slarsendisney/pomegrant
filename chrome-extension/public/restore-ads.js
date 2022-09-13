console.log("Putting ads back!")
document.dispatchEvent(new CustomEvent('pomegrantEvent', {detail: "ADS_ENABLED"}));
