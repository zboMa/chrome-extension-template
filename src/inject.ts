// 监听页面消息并转发到后台
window.addEventListener("message", (event) => {
  if (event.source === window) {
    const { type, payload, source } = event.data;
    if (source === "studio-web-extension-page") {
      console.log("window message", event.data);
      chrome.runtime.sendMessage({
        type,
        payload,
        source,
      });
    }
  }
});

// 接收后台消息并转发到页面
chrome.runtime.onMessage.addListener((data) => {
  const { type, source, payload } = data;

  if (source === "studio-web-extension") {
    console.log("devtools message", data);
    window.postMessage(
      {
        type,
        payload,
        source,
      },
      "*"
    );
  }
});
