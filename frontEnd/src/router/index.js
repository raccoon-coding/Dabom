import { createRouter, createWebHistory } from 'vue-router'
import togetherRoutes from './togetherRouter.js' // 라우트 배열 import
import authRoutes from './authRouter.js'
import MainView from '@/views/MainView.vue'

const routes = [
  {
    path: "/",
    name: "main",
    component: MainView
  },
  ...authRoutes,
  ...togetherRoutes,
  // 다른 라우트들
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
