import { createRouter, createWebHashHistory } from "vue-router";
import isAuthenticatedGuard from "../modules/auth/router/auth-guard";
import authRouter from "../modules/auth/router";
import pageRouter from "../modules/page/router";

const routes = [
  {
    path: "/",
    redirect: "/auth/login",
  },
  {
    path: "/auth",
    ...authRouter,
  },
  {
    path: "/page",
    beforeEnter: [isAuthenticatedGuard],
    ...pageRouter,
  },
  {
    path: "/:pathMatch(.*)*",
    component: () =>
      import(
        /* webpackChunkName: "NoPageFound" */ "@/shared/views/PageNotFound"
      ),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
