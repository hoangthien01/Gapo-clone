<template>
  <div id="app">
    <navbar v-show="showNav"></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import navbar from './components/Navbar.vue'
export default {
  name: 'App',
  components: {
    navbar
  },
  data () {
    return {
      showNav : null
    }
  },
  methods: {
    checkActiveNav() {
      if(this.$route.name == "Login") {
        this.showNav = false
        return
      }
      this.showNav = true
      return
    }
  },
  created() {
    this.checkActiveNav()
    

  },
  watch: {
    $route() {
      this.checkActiveNav()
    }
  }
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
