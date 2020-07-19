import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () =>import('views/home/Home.vue')//懒加载
const Category = () =>import('views/category/Category.vue')
const Profile = () =>import('views/profile/Profile.vue')
const Shopcart = () =>import('views/shopcart/Shopcart.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: "",
    redirect:"/home"
  },
  {
    path:"/home",
    component:Home
  },
  {
    path:"/category",
    component:Category
  },
  {
    path:"/profile",
    component:Profile
  },
  {
    path:"/shopcart",
    component:Shopcart
  }
]

const router = new VueRouter({
  routes,
  mode:"history"
})

export default router
