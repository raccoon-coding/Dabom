import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import authRoutes from '@/router/authRouter.js'
import videoPlayerRoutes from '@/router/videoPlayerRouter.js'
import channelRoutes from '@/router/channelRouter.js'
import togetherRoutes from '@/router/togetherRouter.js'
import messageRoutes from '@/router/messageRoutes.js'


const routes = [
  {
    path: "/",
    name: "main",
    component: MainView
  },
  ...authRoutes,
  ...videoPlayerRoutes,
  ...channelRoutes,
  ...togetherRoutes,
  ...messageRoutes
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
