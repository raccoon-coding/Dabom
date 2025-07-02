
import Login from "@/views/Login.vue"
import Signup from "@/views/Signup.vue"

const authRoutes = [
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  }
]

export default authRoutes
