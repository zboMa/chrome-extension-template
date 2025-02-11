<template>
  <div class="container">
    <div class="container-left">
      <a-menu
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        :inline-collapsed="true"
        :style="{ height: '100%' }"
        :items="routeItems"
        @select="selectHandle"
      ></a-menu>

      <a-button type="text" size="small" ghost>
        <SettingOutlined />
      </a-button>
    </div>
    <div class="container-right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import routes from "@panel/router/routes";
import { useRouter } from "vue-router";
import { SettingOutlined } from "@ant-design/icons-vue";

const router = useRouter();
const routeItems = routes
  .filter((route) => route.component)
  .map((route) => {
    return {
      key: route.name,
      icon: () => route.meta?.icon || "",
      label: route.meta?.title || route.name,
      title: route.meta?.title || route.name,
    };
  });

const selectedKeys = ref([routeItems[0]?.key]);

function selectHandle({ item, key, selectedKeys }: any) {
  selectedKeys.value = selectedKeys;
  router.push({
    name: key,
  });
}
</script>
<style>
#app {
  height: 100vh;
  overflow: hidden;
}
</style>
<style lang="css" scoped>
.container {
  display: flex;
  height: 100%;
}
.container-left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 4px;
}
:deep(.ant-menu-inline-collapsed) {
  width: 40px;
}
.container-right {
  flex: 1;
}
</style>
