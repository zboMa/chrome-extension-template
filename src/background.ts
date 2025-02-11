// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

const devtoolsPanels = new Map(); // tabId → port

// 处理DevTools面板连接
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "devtools-panel") {
    port.onMessage.addListener((data) => {
      const { tabId, type, payload } = data;
      console.log("devtools-panel message", data);

      // 初始化DevTools面板
      if (type === "INIT_DEVTOOLS_PANEL") {
        devtoolsPanels.set(tabId, port);
        port.onDisconnect.addListener(() => devtoolsPanels.delete(tabId));
      } else {
        // 向 inject 发送消息
        chrome.tabs.sendMessage(tabId, {
          type,
          payload,
          source: "studio-web-extension",
        });
      }
    });
  }
});

// 处理来自内容脚本的消息
chrome.runtime.onMessage.addListener((data, sender) => {
  const { payload, type, source } = data;
  if (source === "studio-web-extension-page") {
    const tabId = sender.tab?.id;
    console.log("inject message", data);
    if (tabId && devtoolsPanels.has(tabId)) {
      // 向devtools(panel)发送消息
      devtoolsPanels.get(tabId).postMessage({
        type,
        payload,
        source,
      });
    }
  }
});
