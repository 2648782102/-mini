<template>
  <div class="box">
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
  </div>
</template>

<script>
export default {
    name: 'BodyBox'
}
</script>

<style scoped>
.box {
    width: 100%;
    height: 100vh;
}
</style>