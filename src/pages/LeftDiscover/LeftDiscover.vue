<template>
  <!-- 发现 -->
  <div class="box">
    <div class="top">
      <div class="top-left col-3">
        <router-link @click.native="topl" :class="topldata? 'top-left-active-l':''" :to="{name:'faxian'}"
          active-class="text-dark topactive">发现</router-link>
        <router-link @click.native="topr" :class="toprdata? 'top-left-active-r':''" :to="{name:'dingyue'}"
          active-class="text-dark topactive">订阅</router-link>
      </div>
      <div class="top-input col-7">
        <button @click="seekplay" type="button" class="btn btn-light"><i class="fas fa-search me-1"></i>单曲/频道</button>
        <div class="listening-song ms-2 me-2">
          <div class="">
            <i class="fas fa-microphone"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="bodyRouter">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>

  export default {
    name: "LeftDiscover",
    data() {
      return {
        topldata: false,
        toprdata: false
      }
    },
    methods: {
      seekplay() {
        this.$router.push({
          name: 'seekplay'
        })
      },
      topl() {
        this.toprdata = false
        this.topldata = true
      },
      topr() {
        this.topldata = false
        this.toprdata = true
      }
    }
  };
</script>

<style scoped>
  .box {
    width: 100%;
    height: 100%;
  }

  a {
    text-decoration: none;
  }

  .top {
    width: 100%;
    height: 10%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    z-index: 8;
  }

  .bodyRouter {
    height: 90%;
    margin-top: 10vh;
  }

  .top-left {
    height: 100%;
    font-size: 1.8rem;
    font-weight: 700;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }

  .top-left>a {
    color: rgb(100, 100, 100);
  }

  .topactive {
    font-size: 2.2rem;
    position: relative;

  }

  .topactive::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 1.4rem;
    width: 1.5rem;
    height: 0.3rem;
    border-radius: 1rem;
    background: #B3FFAB;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to left, #12FFF7, #B3FFAB);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, #12FFF7, #B3FFAB);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  /* 发现/订阅 */
  .top-left-active-l::after {
    animation: active-l 0.8s;
  }

  @keyframes active-l {
    from {
      transform: translateX(4.4rem);
    }

    to {
      transform: translateX(0);
    }
  }

  .top-left-active-r::after {
    animation: active-r 0.8s;
  }

  @keyframes active-r {
    from {
      transform: translateX(-4.4rem);
    }

    to {
      transform: translateX(0);
    }
  }

  .top-input {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .top-input>button {
    width: 80%;
    border-radius: 5rem;
    color: rgb(150, 150, 150);
    box-shadow: 2px 1px 1px 1px rgb(218, 218, 218) inset;
    background-color: rgb(241, 241, 241);
  }

  .listening-song {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .listening-song>div {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    box-shadow: 3px 3px 5px 1px rgb(227, 227, 227);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    background-color: rgb(241, 241, 241);
  }
</style>