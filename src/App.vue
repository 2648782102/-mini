<template>
  <div id="app">
    <div class="box">
      <div>
        <BodyBox/>
      </div>
    </div>
  </div>
</template>

<script>
// 引入最大盒子
import BodyBox from './components/BodyBox.vue'

export default {
  name: 'App',
  // 声明
  components: {
    BodyBox
  }
}
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  .box {
    height: 100vh;
  }
</style>
