// 侧边栏
import { createApp } from "vue";
import { Button, Tabs, Menu, Tree } from "ant-design-vue";
import App from "./panel/App.vue";
import "ant-design-vue/dist/reset.css";
import router from "@panel/router/index";

// 初始化面板
const port = chrome.runtime.connect({ name: "devtools-panel" });
const tabId = chrome.devtools.inspectedWindow.tabId;
port.postMessage({ type: "INIT_DEVTOOLS_PANEL", tabId });

// 接收来自页面的消息
port.onMessage.addListener((data) => {
  const { type, payload, source } = data;
  if (source === "studio-web-extension-page") {
    console.log("Received message from page:", payload);
  }
});

// 发送消息到页面
function sendToPage() {
  port.postMessage({
    type: "FROM_DEVTOOLS_PANEL",
    tabId,
    payload: "Hello from DevTools!",
  });
}

createApp(App)
  .use(Button)
  .use(Tabs)
  .use(Menu)
  .use(Tree)
  .use(router)
  .mount("#app");
