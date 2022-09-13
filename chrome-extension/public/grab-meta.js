var metas = document.getElementsByTagName("meta");
var metaArr = [];
for (var i = 0; i < metas.length; i++) {
  var name = metas[i].getAttribute("name");
  if (name === "pomegrant") {
    var content = metas[i].getAttribute("content");
    metaArr.push({name, content});
  }
}

chrome.runtime.sendMessage({
  method: "getMetas",
  meta: metaArr.length > 0 ? metaArr[0] : null,
});
