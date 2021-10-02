import Vue from "vue";
import VueRouter from "vue-router";
import Home from '../view/Home.vue'
import Video from '../view/Video.vue'
import Group from '../view/Group.vue'
import Chat from '../view/Chat.vue'
import Login from '../view/Login.vue'
import Register from "../view/Register.vue"
import notFound from '../view/notfound.vue'
import Personal from '../view/Personal.vue'

Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: { name: 'Login' }},
  {
    path: "/404/notfound-user",
    name : "notFound",
    component: notFound
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/video",
    name: "Video",
    component: Video
  },
  {
    path: "/group",
    name: "Group",
    component: Group,
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat
  },
  {
    path: "/khampha",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      layout: 'unauth'
    }
  },
  {
    path: "/register/:step",
    name: "Register",
    component: Register,
    meta: {
      layout: 'unauth'
    }
  },
  {
    path: "/:userId",
    name: "Personal",
    component: Personal
  },
  {
    path: "/:userId/:tab",
    name: "Personal",
    component: Personal
  },
 
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;