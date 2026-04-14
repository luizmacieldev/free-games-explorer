import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import Home from "../views/Home.vue";
import GameDetails from "../views/GameDetails.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/game/:id",
    component: GameDetails,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});