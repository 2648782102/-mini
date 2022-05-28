<template>
  <div>
      <div ref="fishd"></div>
      <div class="ms-2">订阅界面</div>
  </div>
</template>

<script>
  import lottie from 'lottie-web'
  import fish from '../../lottieJson/fish.json'

export default {
    name: 'DingYue',
    mounted() {
      lottie.loadAnimation({
        container: this.$refs.fishd,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: fish
      })
    }
}
</script>

<style>

</style>