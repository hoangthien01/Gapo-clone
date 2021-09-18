import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueTelInput)
Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyCBaAzd43cCCv8AOdiRw6FE7OQ696rZsVw",
  authDomain: "gapo-ca56b.firebaseapp.com",
  projectId: "gapo-ca56b",
  storageBucket: "gapo-ca56b.appspot.com",
  messagingSenderId: "190732512084",
  appId: "1:190732512084:web:0975d252a90a666744b6c1"
};
firebase.initializeApp(firebaseConfig)

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
  