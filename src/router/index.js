import Vue from "vue";
import VueRouter from "vue-router";

import Home from '../view/Home.vue'
import Video from '../view/Video.vue'
import Group from '../view/Group.vue'
import Chat from '../view/Chat.vue'
import Login from '../view/Login.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
    component: Login
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;