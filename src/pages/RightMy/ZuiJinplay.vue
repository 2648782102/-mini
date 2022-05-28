<template>
  <div class="box">
      <div class="dox" @click="btn">
          <i class="fas fa-angle-left"></i>
      </div>
      <ul>
          <li>
              <div>
                  <img :src="zuijinplay.picUrl" alt="">
                  <div>
                      <p>{{ zuijinplay.name }}</p>
                  </div>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'ZuiJinplay',
    methods: {
        btn() {
            this.$router.back()
        },
    },
    computed: {
        ...mapState('musicData',['zuijinplay','mp3obj','imgObj','pingLun'])
    }
}
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }
    .box {
        width: 100%;
    }
    .dox {
        font-size: 3rem;
        margin-left: 2rem;
    }
    ul{
        list-style-type: none;
        margin-top: 3rem;
        display: flex;
        justify-content: center;
    }
    li img {
        width: 8rem;
        height: 8rem;
    }
</style>