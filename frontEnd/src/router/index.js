import { createRouter, createWebHistory } from 'vue-router'
import togetherRoutes from './togetherRouter.js' // 라우트 배열 import
import Index from '../views/Index.vue'

const routes = [
  ...togetherRoutes,
  // 다른 라우트들

  {path: "/", component: () => import("../views/Index.vue")
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router