<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import navbar from './components/Navbar.vue'
export default {
  name: 'App',
  components: {
    navbar
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
</style>
