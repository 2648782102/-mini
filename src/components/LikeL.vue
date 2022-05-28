<template>
  <div class="box" ref="lot" @click="btn">
  </div>
</template>

<script>
import lottie from 'lottie-web'
import like1 from '../lottieJson/like1.json'

export default {
    name: 'LikeL',
    data() {
        return {
            lotti:{},
            lo:false
        }
    },
    methods: {
        btn: function() {
            // console.log(this.lotti)
            if(this.lo) {
                this.lotti.goToAndStop(0, true);
                this.lo = false
            }else {
                this.lotti.goToAndPlay(0, true);
                this.lo = true
            }
        }
    },
    mounted() {
        const lott = lottie.loadAnimation({
        container: this.$refs.lot,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData: like1,
      })
      this.lotti = lott
    },
}
</script>

<style scoped>
.box {
    width: 100%;
    height: 100%;
}
</style>