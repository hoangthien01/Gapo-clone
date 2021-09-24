<template>
  <div class="default-layout">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import navbar from '../components/Navbar.vue'
export default {
  name: 'Default',
  components: {
    navbar
  },
  data () {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
.default-layout {
  // width: 100vw;
  height: 100vh;
}
</style>
