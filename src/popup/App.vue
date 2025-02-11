<template>
  <div class="container">
    <a-input v-model="configValueInput"></a-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const configValueInput = ref("");

// 初始化时获取配置
chrome.storage.sync.get(["configValue"], function (result) {
  if (result.configValue) {
    configValueInput.value = result.configValue;
  }
});

// 监听配置变化
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (namespace === "sync" && key === "configValue") {
      configValueInput.value = newValue;
    }
  }
});
</script>

<style lang="css" scoped>
.container {
  height: 100%;
}
</style>
