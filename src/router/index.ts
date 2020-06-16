import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Auth from '@/views/auth/Auth.vue'
const Home = () => import('@/views/Home.vue')
const FileUpload = () => import('@/views/FileUpload.vue')
const AuthEnablePhoneNumber = () => import('@/views/auth/AuthEnablePhoneNumber.vue')
const AuthTwoFactorVerification = () => import('@/views/auth/AuthTwoFactorVerification.vue')

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: { name: 'file-preview' },
    name: 'home',
    component: Home
  },
  {
    path: '/file-preview',
    name: 'file-preview',
    component: Home
  },
  {
    path: '/file-upload',
    name: 'file-upload',
    component: FileUpload
  },
  {
    path: '/auth',
    name: 'auth',
    redirect: { name: 'auth-phone' },
    component: Auth,
    children: [
      {
        path: 'auth-phone',
        name: 'auth-phone',
        component: AuthEnablePhoneNumber
      },
      {
        path: 'two-factor-verification',
        name: 'two-factor',
        component: AuthTwoFactorVerification
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
