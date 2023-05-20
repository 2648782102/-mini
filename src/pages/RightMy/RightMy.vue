<template>
    <div class="box">
        <header class="container-fluid">
            <div class="myd">
                <div>
                    <p>我的</p>
                </div>
            </div>
            <div class="ser">
                <div class="sou me-4">
                    <i class="fas fa-search"></i>
                </div>
                <div class="no2">
                    <div class="not1">
                        <i class="fas fa-qrcode"></i>
                    </div>
                    <div>
                        <i @click="tuichu" class="fas fa-cog"></i>
                    </div>
                </div>
            </div>
        </header>
        <main>
            <div class="m1">
                <div class="ml" v-show="loginState">
                    <div class="tou">
                        <!-- 头像 -->
                        <img v-lazy="userImgurl" alt="头像">
                    </div>
                    <div class="ms-3 mt-3">
                        <h3 style="display: flex;flex-direction: row;height: 2rem;">{{username?username:'且问清风'}}<h3 class="vip ms-2">VIP</h3></h3>
                        <p class="yao">邀请好友送他VIP<i class="fas fa-angle-right ms-2"></i></p>
                    </div>
                </div>
                <div v-show="!loginState" class="loginNo">
                    <button @click="$router.push({name:'denglu'})" type="button" class="btn btn-primary">请先登录!</button>
                </div>
                <div class="mr">
                    <i class="fas fa-user-plus me-4"></i>
                    <i class="far fa-envelope"></i>
                </div>
            </div>
            <div class="m2">
                <div class="le">
                    <i class="fas fa-gift"></i>
                    <span>福利活动中心</span>
                </div>
                <div class="ri">
                    <span>听歌就送1日 VIP </span>
                    <i class="fas fa-angle-right"></i>
                </div>
            </div>
            <div class="m3">
                <div class="to">
                    <router-link :to="{name:'rightmy'}" active-class="act">音乐</router-link>
                    <div>故事</div>
                    <div>频道</div>
                </div>
                <div class="bo">
                    <div class="col-6 col-sm-3">
                        <div class="dark">
                            <div class="pn">
                                <div class="y1">
                                    <img v-lazy="mylike.coverImgUrl" alt="" v-show="mylike">
                                </div>
                            </div>
                            <div>
                                <h4>喜欢</h4>
                                <p>{{ mylike.trackCount }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-sm-3">
                        <div class="dark" @click="zuijin">
                            <div class="pn">
                                <div class="y2">
                                    <i class="fas fa-history"></i>
                                </div>
                            </div>
                            <div>
                                <h4>最近</h4>
                                <p>630</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-sm-3">
                        <div class="dark">
                            <div class="pn">
                                <div class="y3">
                                    <i class="fas fa-history"></i>
                                </div>
                            </div>
                            <div>
                                <h4>本地</h4>
                                <p>23</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-sm-3">
                        <div class="dark">
                            <div class="pn">
                                <div class="y4">
                                    <i class="fas fa-cloud"></i>
                                </div>
                            </div>
                            <div>
                                <h4>云盘</h4>
                                <p>0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="m4">
                <div class="to">
                    <!-- fas fa-chevron-down -->
                    <div @click="kait"><i style="width:2rem;" :class="kai?'fas fa-angle-up':'fas fa-chevron-down'"></i>我创建的歌单 {{ playlist.length }}</div>
                    <div class="od">
                        <div><i class="fas fa-plus"></i></div>
                        <div><i class="fas fa-tasks"></i></div>
                    </div>
                </div>
                <div class="bo">
                    <ul class="song" v-show="kai">
                        <li @click="gedan(item.id)" v-for="item in playlist" :key="item.id">
                            <img v-lazy="item.coverImgUrl" alt="">
                            <div>
                                <h3>{{ item.name }}</h3>
                                <p>{{ item.trackCount }}首</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'

    export default {
        name: "RightMy",
        data() {
            return {
                userImgurl: '',
                mylike: {},
                playlist:[],
                kai:true,
                username: {},
                loginState: false,
            }
        },
        methods: {
            // 单击歌单
            gedan(id) {
                axios.get('http://www.musicapi.space/playlist/track/all?id='+id+'&limit=10&offset=1')
                .then(response => {
                    this.$store.commit('musicData/GETMUSIC', response.data.songs)
                    this.$router.push({
                        name: 'gedanmusic'
                    })
                })
                .catch(function(error) {
                    console.log(error)
                })
            },
            kait() {
                this.kai = !this.kai
            },
            zuijin() {
                this.$router.push({
                    name: 'zuijinplay'
                })
            },
            // 切换登录
            tuichu() {
                this.$router.push({
                    name: 'denglu'
                })
            }
        },
        computed: {
            // 引入vuex变量
            ...mapState('musicData',['userxinxi'])
        },
        watch: {
            userxinxi() {
                this.$nextTick(() => {
                    axios.get('http://www.musicapi.space/user/record?uid='+this.userxinxi.userId)
                .then(response => {
                    this.$store.commit('musicData/ZUIJINPLAY',response.data.allData[0].song.al)
                    this.loginState = true
                })
                .catch(function(error) {
                    console.log(error)
                })
                // 获取用户详细信息
                axios.get('http://www.musicapi.space/user/detail?uid='+this.userxinxi.userId)
                .then(response => {
                    // console.log(response);
                    this.username = response.data.profile.nickname
                    this.userImgurl = response.data.profile.avatarUrl
                })
                // 获取用户歌单
                axios.get('http://www.musicapi.space/user/playlist?uid='+this.userxinxi.userId)
                .then(response => {
                    this.mylike = response.data.playlist[0]
                    this.playlist = response.data.playlist
                })
                .catch(function(error) {
                    console.log(error);
                })
                })
            }
        },
    };
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }

    .box {
        width: 100%;
        height: 100%;
    }
    a {
        text-decoration: none;
        color: black;
        font-weight: 600;
    }
    .act::after {
        content: '';
        position: absolute;
        bottom: -0.5rem;
        left: 0.8rem;
        width: 1.6rem;
        height: 0.3rem;
        border-radius: 0.8rem;
        background-color: rgb(15, 216, 234);
    }

    header {
        width: 100%;
        height: 10%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        position: fixed;
        top: 0;
        background-color: white;
        margin-left: -0.8rem;
        z-index: 6;
    }

    .myd {
        width: 30%;
        height: 100%;
    }

    .myd>div {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 2.6rem;
        font-weight: 800;
    }

    .ser {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .sou {
        width: 3.6rem;
        height: 3.6rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.6rem;
        box-shadow: 4px 4px 8px 1px rgba(199, 216, 216, 0.662);
    }

    .no2 {
        width: 9rem;
        height: 3.6rem;
        border-radius: 1.8rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-right: 0.4rem;
        box-shadow: 4px 6px 8px 1px rgba(199, 216, 216, 0.662);
    }

    .no2 div {
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.4rem;
    }
    .no2 div:hover {
        opacity: 0.6;
    }

    .not1 {
        border-right: 1px solid rgba(206, 219, 221, 0.412);
    }

    main {
        width: 100%;
        height: 90%;
        margin-top: 10rem;
    }
    .m1 {
        width: 100%;
        height: 9rem;
        background-image: url(../../assets/x1.png);
        background-size: 100%;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        padding: 0 2rem 0 2rem;
        color: white;
        box-shadow: 0 0 3px 3px rgba(201, 216, 220, 0.573);
    }
    .m1>.ml {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .m1>.mr {
        font-size: 2rem;
    }
    .vip {
        width: 3.8rem;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgb(255, 81, 0);
        font-size: 1.2rem;
        background-color: rgb(255, 236, 160);
    }
    .yao {
        height: 2rem;
        padding: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        background-color: rgb(27, 115, 159);
        border-radius: 1rem;
    }
    .tou {
        width: 5.2rem;
        height: 5.2rem;
        border-radius: 50%;
        overflow: hidden;
    }
    .tou>img {
        width: 100%;
        height: 100%;
    }
    .m2 {
        width: 100%;
        height: 4.2rem;
        margin-top: 2rem;
        border-radius: 0.6rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 0 1rem 0 1rem;
        box-shadow: 5px 5px 5px 1px rgba(203, 218, 218, 0.544);
        background-color: rgb(249, 249, 249);
    }
    .dark {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .dark>.pn {
        width: 12rem;
        padding: 1.4rem;
        z-index: 2;
    }
    .dark>.pn>div {
        position: relative;
        width: 6rem;
        height: 6rem;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        color: white;
    }
    .y1>img{
        width: 100%;
        height: 100%;
        border-radius: 1rem;
        background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    }
    .y2 {
        background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    }
    .y3 {
        background-image: linear-gradient(to top, #e6b980 0%, #eacda3 100%);
    }
    .y4 {
        background-image: linear-gradient(to top, #5f72bd 0%, #9b23ea 100%);
    }
    .dark>.pn>div::after {
        content: '';
        width: 85%;
        height: 85%;
        background-image: url(../../assets/song/5.jpg);
        position: absolute;
        bottom: 0;
        right: -2.2rem;
        border-radius: 0.8rem;
        z-index: -1;
    }
    .dark>.pn>div::before {
        content: '';
        width: 70%;
        height: 70%;
        background-image: url(../../assets/song/6.jpg);
        position: absolute;
        bottom: 0;
        right: -3.8rem;
        border-radius: 0.8rem;
        z-index: -2;
    }
    .dark>div {
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    .m2>.le {
        font-size: 1.3rem;
    }
    .m2>.ri {
        font-size: 1rem;
        color: rgba(109, 109, 109, 0.79);
    }
    .m3 {
        width: 100%;
    }
    .m3>.to {
        width: 100%;
        height: 7rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        padding: 0 4rem 0 4rem;
        font-size: 1.8rem;
    }
    .m3>.to>a {
        position: relative;
    }
    .m3>.bo {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .m3>.bo>div {
        height: 10rem;
        padding: 0.6rem;
        border-radius: 1.4rem;
    }
    .m3>.bo>div>div {
        width: 100%;
        height: 100%;
        background-color: rgb(244, 244, 244);
        box-shadow: 4px 4px 4px rgba(220, 223, 228, 0.718);
        border-radius: 1rem;
    }
    .m4 {
        width: 100%;
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
    }
    .m4>.to {
        width: 100%;
        height: 6rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 1.4rem;
        justify-content: space-between;
        padding: 0 1rem 0 1rem;
    }
    .m4>.to>div {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .m4>.bo {
        width: 100%;
    }
    .od>div{
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 2rem;
        background-color: rgb(244, 244, 244);
        color: rgb(115, 115, 115);
        box-shadow: 4px 4px 4px rgba(220, 223, 228, 0.718);
    }
    .song {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
    .song>li {
        width: 100%;
        height: 7rem;
        margin-bottom: 2rem;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .song>li>img {
        width: 6rem;
        height: 6rem;
        border-radius: 1rem;
        overflow: hidden;
    }
    .song>li>div {
        padding: 1rem;
    }
    .loginNo {
        width: 75%;
        display: flex;
        justify-content: center;
    }
    .loginNo>button {
        width: 15rem;
        height: 3rem;
    }
</style>