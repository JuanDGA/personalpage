import { createRouter, createWebHistory } from "vue-router";
import projectsRouter from "@/views/projects/projectsRouter";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/education",
      name: "education",
      component: () => import("../views/EducationView.vue"),
    },
    {
      path: "/projects",
      name: "projects",
      component: () => import("../views/ProjectsView.vue"),
    },
    {
      path: "/preview",
      name: "preview",
      children: projectsRouter,
    },
    {
      path: "/skills",
      name: "skills",
      component: () => import("../views/SkillsView.vue"),
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("../views/ContactView.vue"),
    },
    { path: "/:pathMatch(.*)*", redirect: "/" },
  ],
});

export default router;
