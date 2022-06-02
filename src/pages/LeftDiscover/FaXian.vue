<template>
  <!-- 发现 -->
  <div class="box">
      <div class="dox1">
        <div class="cd1">
          <div class="cdl">
            <div class="ding"><i class="fas fa-plus me-1"></i>订阅</div>
          </div>
          <div class="cdb">
            <div class="top">
              <p>推荐频道Radio</p>
            </div>
            <div class="btn">
              <div class="bt">
                <p>作业神器</p>
                <div><i class="fas fa-exchange-alt"></i></div>
              </div>
            </div>
          </div>
          <div class="cdr">
            <router-link :to="{name:'playk'}" style="color: black;">
              <i class="fas fa-play-circle"></i>
            </router-link>
          </div>
        </div>
      </div>
      <!-- 轮播 -->
    <div id="demo" class="carousel slide" data-bs-ride="carousel">
    
      <!-- 指示符 -->
      <div class="carousel-indicators">
        <button v-for="(item,index) in bannersArr" :key="index" type="button" data-bs-target="#demo" :data-bs-slide-to="index" :class="index==1?'active':''"></button>
      </div>

      <!-- 轮播图片 -->
      <div class="carousel-inner">
        <div class="carousel-item" :class="index==1?'active':''" v-for="(item,index) in bannersArr" :key="index">
          <img :src="item.pic" class="d-block" style="width:100%">
        </div>
      </div>
      
      <!-- 左右切换按钮 -->
      <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
      </button>
      </div>
      <div class="dox2 mt-4">
        <div class="tui">
          <div class="tuiwen">
            <h2>推荐频道_<span>主题音乐系列</span></h2>
          </div>
          <div class="tuir">
            <div><i class="fas fa-angle-right"></i></div>
          </div>
        </div>
        <div class="rolldiv pt-2">
          <ul>
            <li v-for="item in tuiArr" :key="item.id">
              <p class="titlep">{{ item.title }}</p>
              <img v-lazy="require('../../assets/img/'+item.imgurl)">
            </li>
          </ul>
        </div>
      </div>
      <div class="dox3 mt-2">
        <img src="../../assets/img/yiqi.jpg" class="col-12 col-sm-12">
      </div>
      <div class="dox4 mt-4">
        <div class="t1">
          <p>宝藏推荐<span>_根据你的口味推荐</span></p>
        </div>
        <div class="t2">
          <div class="tt1">
            <p><i class="bi bi-lightning-charge-fill"></i>概念新歌速递</p>
          </div>
          <div class="tt2">
            <div class="d1">
              <img src="../../assets/img/t1.jpg">
              <p>Keep Your He</p>
            </div>
            <div class="d1">
              <img src="../../assets/img/t2.jpg" alt="">
              <p>Sun Comes Up</p>
            </div>
            <div class="d1">
              <img src="../../assets/img/t3.jpg" alt="">
              <p>vcetone</p>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
  

export default {
    name: 'FaXian',
    data() {
      return {
        bannersArr: [],
        tuiArr: [
          {
            id:1,
            title: '无声告白',
            imgurl: '1.jpg'
          },
          {
            id:2,
            title: '心动续费指南',
            imgurl: '2.jpg'
          },
          {
            id:3,
            title: '浪漫至死不渝',
            imgurl: '3.jpg'
          },
          {
            id:4,
            title: '爱你所爱',
            imgurl: '4.jpg'
          },
          {
            id:5,
            title: '涂鸦艺术家',
            imgurl: '5.jpg'
          },
          {
            id:6,
            title: '[治愈]风之谷',
            imgurl: '6.jpg'
          },
          {
            id:7,
            title: '多元治愈馆',
            imgurl: '7.jpg'
          },
        ],
      }
    },
    mounted() {
          axios.get('https://music.cyrilstudio.top/banner?type=1')
          .then((respone)=> {
          this.bannersArr = respone.data.banners
          })
          .catch(function(error) {
            console.log(error);
          })
        },
}
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }
  .box {
    width: 100%;
    height: 100%;
  }
  .dox1 {
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #demo {
    border-radius: 0.5rem;
    overflow: hidden;
  }
  .cd1 {
    position: relative;
    width: 90%;
    height: 70%;
    margin-left: 10%;
    border-radius: 10rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 2%;
    padding-right: 5%;
    box-shadow: 5px 5px 10px 3px rgba(189, 205, 206, 0.485);
  }
  .cdl {
    position: relative;
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    background-color: rgb(0, 0, 0);
  }
  .cdl::after {
    content: '';
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.9);
    position: absolute;
    top: 30%;
    left: 30%;
  }
  .cdl::before {
    content: '';
    width: 11rem;
    height: 11rem;
    position: absolute;
    top: -0.5rem;
    left: -4.5rem;
    border-radius: 1rem;
    background-image: url(../../assets/userimg1.jpeg);
    background-size: 100%;
    z-index: 2;
  }
  .ding {
    position: absolute;
    bottom: -0.5rem;
    right: 1.4rem;
    width: 9rem;
    height: 3.6rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    color: white;
    background-color: rgba(74, 209, 117, 0.981);
    z-index: 3;
  }
  .cdb {
    width: 40%;
    height: 80%;
    display: flex;
    flex-direction: column;
  }
  .cdb>.top {
    width: 100%;
    height: 40%;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cdb>.btn {
    width: 100%;
    height: 60%;
  }
  .cdb>.btn>.bt {
    width: 100%;
    height: 80%;
    border-radius: 3rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-right: 8%;
    font-size: 1.3rem;
    box-shadow: -1px -1px 5px 2px rgba(193, 211, 212, 0.625) inset;
  }
  .cdb>.btn>.bt>p{
    height: 100%;
    margin-left: 8%;
    padding-top: 1rem;
    display: flex;
    align-items: center;
    border-radius: 3rem;
  }
  .cdb>.btn>.bt>div {
    width: 2.3rem;
    height: 2.3rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 2px 1px rgba(169, 180, 187, 0.621);
  }
  .cdr {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    font-size: 4.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 4px 4px 6px 2px rgba(199, 210, 214, 0.677);
  }
  .dox2 {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .tui {
    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: row;
  }
  .tuiwen {
    width: 85%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .tuiwen span {
    font-size: 1.2rem;
    color: rgba(48, 48, 48, 0.899);
  }
  .tuir {
    width: 15%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: end;
  }
  .tuir>div {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    font-size: 1.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(63, 63, 63, 0.655);
    box-shadow: 2px 2px 4px 1px rgba(188, 205, 206, 0.695);
  }
  .rolldiv>ul {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow-x: scroll;
    display: flex;
    flex-direction: row;
    list-style-type: none;
  }
  .rolldiv>ul::-webkit-scrollbar {
    opacity: 0;
  }
  .rolldiv>ul>li {
    height: 100%;
    position: relative;
    margin-right: 1.5rem;
  }
  .titlep {
    position: absolute;
    top: 1.5rem;
    left: 0.4rem;
    font-size: 1.2rem;
    color: white;
  }
  .rolldiv>ul>li>img {
    width: 25vw;
    height: 98%;
    border-radius: 1rem;
    box-shadow: 3px 3px 8px 3px rgba(191, 199, 202, 0.682);
  }
  .dox3 {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .dox3>img{
    border-radius: 1rem;
  }
  .dox4 {
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .t1 {
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
  }
  .t1>p {
    font-size: 1.7rem;
  }
  .t1 span {
    font-size: 1.2rem;
    color: rgb(27, 27, 27);
  }
  .t2 {
    position: relative;
    width: 100%;
    height: 80%;
    border-radius: 1.2rem 1.2rem 0 0;
    box-shadow: 0 -4px 4px 1px rgba(196, 206, 208, 0.301);
    background-color: rgba(40, 38, 17, 0.444);
  }
  .t2::after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background-image: url(../../assets/img/t1.jpg);
    background-size: 100%;
    opacity: 0.5;
    border-radius: 1.2rem 1.2rem 0 0;
    z-index: -1;
  }
  .tt1 {
    width: 100%;
    height: 36%;
    font-size: 1.6rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    margin-left: 1rem;
    color: white;
  }
  .tt2 {
    width: 100%;
    height: 64%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .d1 {
    width: 7.9rem;
    overflow: hidden;
  }
  .d1 img{
    width: 7.8rem;
    height: 7.2rem;
    border-radius: 1rem;
  }
  .d1 p{
    color: white;
  }
</style>