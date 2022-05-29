<template>
  <div class="box container-fluid">
      <div @click="btn" class="btn2">
          <i class="fas fa-angle-left"></i>
      </div>
      <div class="for">
              <h1>手机号登录</h1>
              <label for="">国家地区 中国</label>
              <div class="input-group mt-2">
                  <span class="input-group-text btn btn-success sp" for="jia">+86</span>
                  <input v-model="phone" class="form-control in" type="text" id="jia" placeholder="输入手机号">
              </div>
              <div class="mt-3">
                  <label for="">密码</label>
                  <input @keyup.enter="subm" v-model="password" type="password" name="" id="" class="form-control in" placeholder="请输入密码">
              </div>
              <button type="button" @click="subm" class="bt btn btn-primary mt-3">登录</button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'DengLu',
    data() {
        return {
            phone: '',
            password: ''
        }
    },
    methods: {
        btn() {
            this.$router.back()
        },
        subm() {
            axios.get('https://netease-cloud-music-api-lilac-one-32.vercel.app/login/cellphone?phone='+this.phone+'&&password='+this.password)
            .then(response => {
                this.$store.commit('musicData/USERXINXI',response.data.bindings[0])
                this.$router.push({
                    name: 'rightmy'
                })
            })
            .catch(function(error) {
                console.log(error)
            })
        }
    },
}
</script>

<style scoped>
    .box {
        width: 100%;
        background-repeat: no-repeat;
        color: white;
        background-size: 180%;
        background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
    }
    .btn2 {
        height: 5rem;
        display: flex;
        align-items: center;
        margin-left: 1.5rem;
        font-size: 2.4rem;
    }
    .for {
        width: 100%;
        height: 40%;
        padding: 2rem;
        justify-content: center;
    }
    .bt {
        width: 100%;
        height: 5rem;
    }
    .in{
        height: 4rem;
    }
    .sp {
        display: flex;
        align-items: center;
    }
</style>