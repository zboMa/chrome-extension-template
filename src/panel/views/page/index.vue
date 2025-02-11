<template>
  <div class="container">
    <!-- 左侧树形菜单 -->
    <div
      class="container-left"
      :style="{
        width: containerLeftWidth + 'px',
      }"
    >
      <a-tree defaultExpandAll blockNode showIcon :tree-data="treeData">
        <!-- <template #switcherIcon="{ switcherCls }"
          ><down-outlined :class="switcherCls"
        /></template> -->
        <template #title="{ type, key, title, ext }">
          <span class="tree-title">
            <span v-text="title"></span>
            <span v-if="type === 'node'" class="node-key" v-text="key"></span>
            <span v-if="type === 'page'" class="node-key" v-text="ext"></span>
          </span>
        </template>
        <template #icon="{ type, key, selected }">
          <template v-if="type === 'page'">
            <FileTextOutlined />
          </template>
          <template v-if="type === 'node'">
            <ApartmentOutlined />
          </template>
          <template v-if="type === 'nav'">
            <LayoutOutlined />
          </template>
        </template>
      </a-tree>
    </div>

    <!-- 分割线 -->
    <div class="container-cutline" @mousedown="cutlineMouseDown"></div>

    <!-- 右侧 -->
    <div class="container-right"></div>
  </div>
</template>

<script setup lang="ts">
// import { evalWindow } from "@/utils";
import {
  FileTextOutlined,
  ApartmentOutlined,
  LayoutOutlined,
} from "@ant-design/icons-vue";
import { TreeProps } from "ant-design-vue";
import { ref } from "vue";

const treeData: TreeProps["treeData"] = [
  {
    title: "类型管理",
    key: "types",
    type: "nav",
    children: [
      {
        title: "page",
        key: "page",
        ext: "page",
        type: "page",
        children: [
          {
            title: "页面",
            nodeId: "node_sd1",
            key: "Page",
            type: "node",
            children: [
              {
                title: "基础表格",
                key: "HBProTable1",
                nodeId: "node_sd2",
                type: "node",
              },
            ],
          },
        ],
      },
    ],
  },
];

// 拖拽调整大小
const containerLeftWidth = ref(360);
const cacheContainerLeftWidth = ref(containerLeftWidth.value);
let startPosX = 0;
let candrag = false;
function cutlineMouseDown(e: MouseEvent) {
  startPosX = e.clientX;
  candrag = true;
  window.addEventListener("mousemove", mouseMove);
  window.addEventListener("mouseleave", mouseUp);
  window.addEventListener("mouseup", mouseUp);
  window.document.body.style.cursor = "col-resize";
  window.document.body.style.userSelect = "none";
  console.log("startPosX", startPosX);
}
function mouseMove(e: MouseEvent) {
  if (!candrag) return;

  const x = e.clientX - startPosX;
  const result = cacheContainerLeftWidth.value + x;
  if (result > 600) {
    containerLeftWidth.value = 600;
  } else if (result < 100) {
    containerLeftWidth.value = 100;
  } else {
    containerLeftWidth.value = result;
  }
}
function mouseUp() {
  candrag = false;
  cacheContainerLeftWidth.value = containerLeftWidth.value;
  window.removeEventListener("mousemove", mouseMove);
  window.removeEventListener("mouseup", mouseUp);
  window.removeEventListener("mouseleave", mouseUp);
  window.document.body.style.cursor = "auto";
  window.document.body.style.userSelect = "auto";
}
</script>

<style lang="css" scoped>
.container {
  display: flex;
}
.container-left {
  width: 360px;
  padding: 6px 8px;
  overflow-y: auto;
  /* border-right: 1px solid #f1f1f1; */
}
.tree-title {
  white-space: nowrap;
}
.node-key {
  font-size: 12px;
  color: #ccc;
  margin-left: 4px;
}
.container-cutline {
  position: relative;
  width: 7px;
  cursor: col-resize;
}
.container-cutline::before {
  position: absolute;
  top: 0;
  left: 3px;
  content: "";
  width: 1px;
  height: 100%;
  background-color: #f1f1f1;
}
.container-cutline:active::before {
  background-color: #333;
}
.container-right {
  flex: 1;
}
</style>
