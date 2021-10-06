<template>
  <div id="app">
     <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import "firebase/auth"
import defaultLayout from "./layout/default.vue";
import unauthLayout from "./layout/unauth.vue";
export default {
  name: 'App',
  components: {
    defaultLayout,
    unauthLayout,
  },
  computed: {
    layout() {
      if (this.$route.meta.layout == "unauth") {
        return "unauthLayout";
      }
      return "defaultLayout";
    },
  },
  created() {
    this.$store.dispatch('getPost');
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.commit("updateUser", user)
      if(user) {
        this.$store.dispatch("getCurrentUser")
      }
    });
  },
  data () {
    return {
    }
  },
}
</script>

<style>
#app {
  font-family: Segoe UI, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}

.btn {
  padding: 8px 12px;
  background-color: #ecf7e7;
  border: none;
  outline: none;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  border-radius: 10px;
  color: #6fbe44;
}
</style>
