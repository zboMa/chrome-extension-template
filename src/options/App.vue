<template>
  <div class="container">
    <a-input v-model="configValueInput"></a-input>
    <a-button type="primary" @click="saveConfig">保存</a-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const configValueInput = ref<string>("");

// 初始化时获取配置
chrome.storage.sync.get(["configValue"], function (result) {
  if (result.configValue) {
    configValueInput.value = result.configValue;
  }
});

// 保存配置
function saveConfig() {
  const configValue = configValueInput.value;
  chrome.storage.sync.set({ configValue: configValue }, function () {
    console.log("配置已保存");
  });
}

// 保存限制两秒一次
let lastSaveTime = 0;
function saveConfigWithDelay() {
  const now = Date.now();
  if (now - lastSaveTime < 2000) {
    return;
  }
  lastSaveTime = now;
  saveConfig();
}
</script>

<style lang="css" scoped>
.container {
  height: 100%;
}
</style>
