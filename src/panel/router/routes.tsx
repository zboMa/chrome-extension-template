import { RouteRecordRaw } from "vue-router";
import {
  ClockCircleOutlined,
  ForkOutlined,
  LayoutFilled,
} from "@ant-design/icons-vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    redirect: {
      name: "page",
    },
  },
  {
    path: "/page",
    name: "page",
    component: () => import("@panel/views/page/index.vue"),
    meta: { title: "页面内容", icon: <LayoutFilled /> },
  },
  {
    path: "/log",
    name: "log",
    component: () => import("@panel/views/log/index.vue"),
    meta: { title: "日志信息", icon: <ClockCircleOutlined /> },
  },
  {
    path: "/flow",
    name: "flow",
    component: () => import("@panel/views/flow/index.vue"),
    meta: { title: "业务流", icon: <ForkOutlined /> },
  },
];

export default routes;
