<template>
  <!-- step 1-->
  <div>
    <step1 v-show="this.currentStep === '1'"></step1>
    <step2 v-show="this.currentStep === '2'"></step2>
    <step3 v-show="this.currentStep === '3'"></step3>
  </div>
</template>

<script>
import step1 from '../components/Register/step1.vue'
import step2 from '../components/Register/step2.vue'
import step3 from '../components/Register/step3.vue'
export default {
  name: 'Register',
  components : {
    step1, step2, step3
  },
  data () {
    return {
    }
  },
  computed: {
    currentStep() {
      return this.$route.params.step
    },
  },
}
</script>

<style lang="scss" scoped>
</style>