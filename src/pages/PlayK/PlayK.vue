<template>
  <div class="lex">
    <div class="box container-fluid" v-if="musicweb">
      <div class="dox1">
        <div class="yuan ms-2" @click="goreturn">
          <i class="fas fa-angle-left"></i>
        </div>
        <div style="font-size:1.5rem;">
          <span class="me-3">独乐</span> | <span class="ms-3">众乐</span>
        </div>
        <div class="yuan me-2">
          <i class="fas fa-broadcast-tower"></i>
        </div>
      </div>
      <div class="dox2">
        <div class="yuan">
          <div class="yuanxin">
            <img :class="imgkb" :src="imgobj.songs[0].al.picUrl" alt="封面">
          </div>
        </div>
      </div>
      <div class="dox3">
        <div class="left">
          <div class="ddd">
              <p v-for="(item,key,index) in lyricObj" :key="index">
                <transition appear
             name="lyricAT"
             ><span
                v-if="lrctime>key&&lrctime<allkeys[index+1]" :key="index">{{item}}</span>
                </transition></p>
          </div>
          <div class="ddd" style="font-size:2.4rem;">
            <p>{{ imgobj.songs[0].name }}</p>
            <p style="font-size:1.2rem;font-weight:300;">{{ imgobj.songs[0].ar[0].name }}</p>
          </div>
          <div class="ddd">
            <div class="gushi">
              <div class="me-2">
                <i class="far fa-bookmark me-1"></i>
                <p>n个音乐故事</p>
              </div>
              <p>|</p>
              <i class="fas fa-plus ms-2"></i>
            </div>
          </div>
        </div>
        <!-- 右侧三个图标盒子 -->
        <div class="right">
          <div class="rrr">
            <i class="far fa-share-square"></i>
          </div>
          <div class="rrr">
            <i class="far fa-heart"></i>
          </div>
          <div class="rrr">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>
      </div>
      <!-- 播放控件 -->
      <div class="dox4">
        <div class="top">
          <!-- 进度条 -->
          <div class="music-jindu">
            <div class="da" @click="tiao($event)" ref="tiaor">
              <div class="xiao" ref="W"></div>
            </div>
          </div>
          <div class="music-date">
            <p>{{ kMusicTime }}</p>
            <p>{{ musictime }}</p>
          </div>
        </div>
        <div class="bottom">
          <div class="last" @click="musiclast">
            <i class="fas fa-step-backward"></i>
          </div>
          <div class="play-pause" @click="playon">
            <i :class="kplay?'fas fa-pause':'fas fa-play'"></i>
            <audio ref="audio" :src="'https://music.163.com/song/media/outer/url?id='+musicSrc+'.mp3' " @pause="onpause" @play="onplay" @canplay="canplay"
              autoplay>不支持</audio>
          </div>
          <div class="next" @click="musicnext">
            <i class="fas fa-step-forward"></i>
          </div>
        </div>
      </div>
      <div class="dox5">
        <i class="fas fa-random"></i>
        <div @click="ping">
          <p class="me-1">{{ pinglunnum }}条评论</p>
          <i class="fas fa-angle-double-up"></i>
        </div>
        <i class="fas fa-bars"></i>
      </div>
    </div>
    <div v-show="!musicweb" class="lox">
      <div v-if="!musicweb" :ref="lott"></div>
      <div class="ll mt-2">
        <h1>抱歉，音乐未加载！</h1>
        <button class="btn btn-primary" @click="goreturn">点此返回</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import lottie from 'lottie-web'
  import nomusic from '../../lottieJson/nomusic.json'

  export default {
    name: 'PlayK',
    data() {
      return {
        kplay: true,
        musicweb: false,
        // audio的src
        musicSrc: '',
        imgkb: 'imgpaused',
        // 总时长
        musictime: 0,
        // 当前时长
        kMusicTime: 0,
        // 评论数
        pinglunnum: 0,
        lott: 'lott',
        // 歌词对象
        lyricObj: {},
        // 播放时间
        lrctime: 0,
        // 歌词的key
        allkeys: []
      }
    },
    methods: {
      // 点击评论
      ping() {
        this.$router.push({
          name: 'pinglun'
        })
      },
      goreturn() {
        this.$router.back()
      },
      // 播放回调
      onplay() {
        this.kplay = true
        this.imgkb = 'imgplay'
      },
      // 暂停回调
      onpause() {
        this.kplay = false
        this.imgkb = 'imgpaused'
      },
      playon() {
        if (!this.kplay) {
          this.$refs['audio'].play()
          this.kplay = !this.kplay
        } else {
          this.$refs['audio'].pause()
          this.kplay = !this.kplay
        }
      },
      // 下一首
      musicnext() {
        // 判断是否为最后一首歌，如果是则更改序号为0
        if (this.musicnum == this.musicArr.length - 1) {
          this.$store.commit('musicData/MUSICNUM', -1)
        }
        let num = this.musicArr[this.musicnum + 1].id
        // 调用vuex的axios请求，更改mp3obj的内容
        this.$store.dispatch('musicData/mp3Obj', num)
        // 调用vuex的axios请求，更改imgobj的内容
        this.$store.dispatch('musicData/imgObj', num)
        // 调用vuex的axios请求，更改pinglun的内容
        this.$store.dispatch('musicData/pingLun', num)
        // 调用vuex的axios请求，更改歌词的内容
        this.$store.dispatch('musicData/lyRic', num)
        // 变更musicnum中存储的序号
        this.$store.commit('musicData/MUSICNUM', this.musicnum + 1)
        // 重置图片动画
        this.imgkb = ''
        // 清空歌词key
        this.allkeys.length = 0
      },
      // 上一首
      musiclast() {
        // 判断是否为第一首歌，如果是则更改序号为歌曲数组长度
        if (this.musicnum == 0) {
          this.$store.commit('musicData/MUSICNUM', this.musicArr.length)
        }
        let num = this.musicArr[this.musicnum - 1].id
        // 调用vuex的axios请求，更改mp3obj的内容
        this.$store.dispatch('musicData/mp3Obj', num)
        // 调用vuex的axios请求，更改imgobj的内容
        this.$store.dispatch('musicData/imgObj', num)
        // 调用vuex的axios请求，更改pinglun的内容
        this.$store.dispatch('musicData/pingLun', num)
        // 调用vuex的axios请求，更改歌词的内容
        this.$store.dispatch('musicData/lyRic', num)
        // 变更musicnum中存储的序号
        this.$store.commit('musicData/MUSICNUM', this.musicnum - 1)
        // 重置图片动画
        this.imgkb = ''
        // 清空歌词key
        this.allkeys.length = 0
      },
      // 音频加载完成
      // 获取歌曲时长
      canplay() {
        // 重置图片动画
        this.imgkb = 'imgplay'
        // console.log(LYR)
        let time = formatTime(this.$refs.audio.duration)
        this.musictime = time
        this.$refs.audio.ontimeupdate = () => {
          if (this.$refs.audio.ended) {
            let num = this.musicArr[this.musicnum + 1].id
            // 调用vuex的axios请求，更改mp3obj的内容
            this.$store.dispatch('musicData/mp3Obj', num)
            // 调用vuex的axios请求，更改imgobj的内容
            this.$store.dispatch('musicData/imgObj', num)
            // 调用vuex的axios请求，更改pinglun的内容
            this.$store.dispatch('musicData/pingLun', num)
            // 调用vuex的axios请求，更改歌词的内容
            this.$store.dispatch('musicData/lyRic', num)
            // 清空歌词key
            this.allkeys.length = 0
            // 变更musicnum中存储的序号
            this.$store.commit('musicData/MUSICNUM', this.musicnum + 1)
          }
          // 计算当前播放时间占总时长的比例
          let w = this.$refs.audio.currentTime / this.$refs.audio.duration * 100 + "%";
          this.$refs.W.style.width = w
          this.kMusicTime = formatTime(this.$refs.audio.currentTime)
          // 歌词时间
          this.lrctime = this.$refs.audio.currentTime
        }
      },
      // 点击进度条
      tiao(event) {
        // 获取偏移量
        let offset = event.offsetX
        // 计算时间
        let time = offset / this.$refs.tiaor.offsetWidth * this.$refs.audio.duration;
        // 把播放器时间设置为计算后的时间
        this.$refs.audio.currentTime = time;
      },
      // 获取歌词的key
      getAllKey(lrcArr) {
        for (var key in lrcArr) {
          this.allkeys.push(key)
        }
      }
    },
    // 计算属性
    computed: {
      ...mapState('musicData', ['musicArr', 'imgobj', 'mp3obj', 'musicnum', 'pinglun', 'lyric'])
    },
    mounted() {
      lottie.loadAnimation({
        container: this.$refs.lott,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: nomusic
      })
    },
    watch: {
      mp3obj() {
          this.musicweb = true
          // 数据到手后
            this.musicSrc = this.mp3obj.data[0].id
            // 读取歌词并处理
            this.lyricObj = {}
            var lrcObj = {}
            let LY = this.lyric.lrc.lyric
            let LYR = LY.split("\n")
            let LYRI = /\[\d*:\d*(\.|:)\d*]/g
            for (let i = 0; i < LYR.length; i++) {
              let timeRegExpArr = LYR[i].match(LYRI)
              if (!timeRegExpArr) continue
              let t = timeRegExpArr[0]
              // 取出分
              let min = Number(t.match(/\[\d*/i).toString().slice(1));
              let second = Number(t.match(/:\d*/i).toString().slice(1))
              // 歌词文本
              var content = LYR[i].replace(timeRegExpArr, "")
              let time = min * 60 + second
              lrcObj[time] = content
            }
            this.lyricObj = lrcObj
            this.getAllKey(lrcObj)
              // 评论数赋值
              if (this.pinglun) {
                this.pinglunnum = this.pinglun.hotComments.length
              }
      },
    }
  }

  // 创建一个函数用来处理播放器时间戳
  function formatTime(time) {
    let m = Math.floor(time % 3600 / 60);
    let s = Math.floor(time % 60);
    return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
  }
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  .lex {
    width: 100%;
    height: 100vh;
  }

  .box {
    width: 100%;
    height: 100%;
    background-color: rgb(255, 255, 255);
  }

  .dox1 {
    width: 100%;
    height: 9%;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
  }

  .dox1 .yuan {
    position: relative;
    width: 3.5rem;
    height: 3.5rem;
    font-size: 1.6rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    box-shadow: 4px 2px 8px 4px rgba(216, 223, 231, 0.659);
    z-index: 1;
  }

  .dox1 .yuan:hover {
    opacity: 0.75;
  }

  .dox1 .yuan i {
    z-index: 2;
  }

  .dox1 .yuan::before {
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: absolute;
    top: 1px;
    left: 1px;
    background-color: rgba(230, 233, 236, 0.595);
    z-index: -1;
  }

  .dox2 {
    width: 100%;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dox2 .yuan {
    width: 26rem;
    height: 26rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(230, 233, 236);
    box-shadow: 4px 6px 20px 5px rgba(197, 207, 217, 0.855);
  }

  .dox2 .yuanxin {
    width: 90%;
    height: 90%;
    border-radius: 50%;
    overflow: hidden;
  }

  .dox2 .yuanxin img {
    width: 100%;
    height: 100%;
  }

  .imgplay {
    animation: zhuan 18s linear infinite;
    animation-play-state: running;
  }

  .imgpaused {
    animation: zhuan 18s linear infinite;
    animation-play-state: paused;
  }

  @keyframes zhuan {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }

  .dox3 {
    width: 100%;
    height: 22%;
    display: flex;
    flex-direction: row;
    padding: 0 5% 0 5%;
  }

  .dox3 .left {
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .ddd {
    width: 100%;
    height: 33%;
    font-size: 1.6rem;
    font-weight: 600;
    padding-left: 0.8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
  }

  .ddd p {
    margin: 0;
  }

  .gushi {
    width: 58%;
    height: 50%;
    border-radius: 2rem;
    box-shadow: 5px 6px 8px 2px rgba(186, 202, 217, 0.473);
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 5% 0 5%;
    color: rgb(153, 160, 162);
  }

  .gushi>div {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1rem;
  }

  .gushi p {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0;
    display: flex;
    align-items: center;
  }

  .dox3 .right {
    width: 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
  }

  .rrr {
    width: 54%;
    height: 20%;
    border-radius: 0.8rem;
    box-shadow: 3px 4px 6px 1px rgba(186, 202, 217, 0.686);
    background-color: rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .rrr>i {
    font-size: 1.5rem;
  }

  .dox4 {
    width: 100%;
    height: 18%;
    margin-top: 2%;
    padding: 0 5% 0 5%;
    display: flex;
    flex-direction: column;
  }

  .dox4>.top {
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
  }

  .music-jindu {
    width: 100%;
    height: 50%;
    display: flex;
  }

  .da {
    width: 100%;
    height: 30%;
    border-radius: 1rem;
    box-shadow: 0 0 1px 1px rgb(232, 232, 232) inset;
    background-color: #dde0ed88;
  }

  .xiao {
    position: relative;
    width: 20%;
    height: 100%;
    border-radius: 1rem;
    background-color: rgba(0, 166, 255, 0.855);
    align-items: center;
  }

  .xiao::after {
    content: '';
    width: 1.4rem;
    height: 1.4rem;
    position: absolute;
    bottom: -4px;
    right: -2px;
    border-radius: 50%;
    box-shadow: 3px 2px 6px 1px rgba(186, 202, 217, 0.686);
    background-color: rgb(248, 248, 248);
  }

  .music-date {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .dox4>.bottom {
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .play-pause {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.5rem;
    color: rgb(35, 35, 78);
    box-shadow: 4px 6px 7px 1px rgb(186, 202, 217);
    background-color: rgb(249, 253, 255);
  }

  .play-pause:active {
    opacity: 0.7;
  }

  .last,
  .next {
    width: 6.5rem;
    height: 6.5rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    color: rgb(35, 35, 78);
    box-shadow: 3px 5px 4px 0.5px rgb(186, 202, 217);
    background-color: rgb(249, 253, 255);
  }

  .last:active,
  .next:active {
    opacity: 0.7;
  }

  .dox5 {
    width: 100%;
    height: 7%;
    padding: 0 5% 0 5%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .dox5>i {
    font-size: 2rem;
    color: #858585;
  }

  .dox5>div {
    height: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #9c9c9c;
  }

  .dox5>div>p {
    margin: 0;
    padding: 0;
  }

  .lox {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .lox>div {
    width: 30rem;
  }

  .ll {
    width: 100%;
    height: 10%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>