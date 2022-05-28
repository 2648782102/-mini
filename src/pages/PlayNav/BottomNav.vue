<template>
  <div class="box">
      <div class="dox-1 container-fluid pe-3 ps-3">
          <router-view></router-view>
      </div>
      <div class="dox-2">
          <div class="nav-1 col-3">
            <router-link active-class="activeBlack" :to="{name:'leftdiscover'}">
                <i class="fas fa-dice-d20"></i>
                <p>发现</p>
            </router-link>
        </div>
        <div class="nav-2 col-4 col-sm-3">
            <router-link :to="{name:'playk'}" class="circleRouter">
                <div class="circleImg">
                    <img ref="img" >
                    <!-- :src="imgurl? imgurl.songs[0].al.picUrl:''" -->
                </div>
            </router-link>
        </div>
        <div class="nav-3 col-3">
            <router-link active-class="activeBlack" :to="{name:'rightmy'}">
                <i class="fas fa-user-alt"></i>
                <p>我的</p>
            </router-link>
        </div>
      </div>
  </div>
</template>

<script>
    import {mapState} from 'vuex'

export default {
    name: 'BottomNav',
    data() {
        return {
            imgurl: ''
        }
    },
    methods: {
    },
    mounted() {
    },
    computed: {
        ...mapState('musicData',['imgobj'])
    },
    watch: {
        imgobj() {
            if(this.imgobj.songs[0].al.picUrl) {
                this.$refs.img.src = this.imgobj.songs[0].al.picUrl
            }
        }
    }
}
</script>

<style scoped>
* {
    box-sizing: border-box;
}
.box {
    width: 100%;
    height: 100%;
    overflow: visible;
}
.dox-1 {
    height: 89%;
    overflow: scroll;
}
.dox-1::-webkit-scrollbar{
    display: none;
}
.dox-2{
    width: 100%;
    height: 11%;
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-radius: 10px 10px 0 0;
    background-color: white;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 14px 0 rgba(0, 0, 0, 0.19);
}
.nav-1,.nav-2,.nav-3 {
    height: 65%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.nav-1 i,.nav-3 i {
    font-size: 2rem;
    color: rgb(117, 117, 117);
}
a{
    text-decoration: none;
}
.nav-1 p,.nav-3 p {
    text-align: center;
    color: rgb(102, 102, 102);
    font-size: 1rem;
}
.activeBlack i,.activeBlack p {
    color: black;
}
.circleRouter {
    width: 60%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.circleImg {
    width: 5rem;
    height: 5rem;
    box-shadow: 7px 7px 8px 1px rgba(203, 213, 214, 0.785);
    border-radius: 50%;
}
.circleImg>img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
</style>