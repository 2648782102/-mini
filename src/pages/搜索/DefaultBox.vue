<template>
  <div class="box container-fluid">
          <h1 class="mt-4">热搜</h1>
      <ul>
        <li v-for="(item,index) in reshou" :key="index" @click="serve(item.searchWord)">
          <span class="text-danger">{{ index+1 }}</span>
          <h3>{{ item.searchWord }}</h3>
        </li>
      </ul>
  </div>
</template>

<script>
  import axios from 'axios'
  import {mapState} from 'vuex'
  
export default {
    name: 'DefaultBox',
    computed: {
      ...mapState('musicData',['reshou']),
    },
    mounted() {
      axios.get('http://www.musicapi.space/search/hot/detail')
                .then(response => {
                    this.$store.commit('musicData/RESHOU',response.data.data)
                })
                .catch(function(error) {
                    console.log(error);
                })
    },
    methods: {
      serve(value) {
        this.$store.commit('musicData/SERVE',value)
      }
    },
}
</script>

<style scoped>
    .box {
      width: 100%;
      overflow: hidden; 
      padding-top: 9rem;
    }
    h1 {
      text-align: center;
    }
    ul{
      list-style-type: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
    }
    ul li{
      width: 50%;
      height: 5rem;
      border-radius: 2rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    li>span {
      width: 25%;
      font-size: 2rem;
    }
    li>h3 {
      width: 75%;
      font-size: 1.6rem;
    }
</style>