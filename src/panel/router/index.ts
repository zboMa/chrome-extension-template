import { createMemoryHistory, createRouter } from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createMemoryHistory(),
  routes: routes,
});

export default router;
