import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';
import firebase from "firebase/app";
import "firebase/auth";


Vue.use(VueTelInput)
Vue.config.productionTip = false


let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});