<template>
    <!-- 搜索框 -->
    <div class="box">
        <div class="seek">
            <div class="seekdiv">
                <i class="fas fa-search seeki"></i>
                <input ref="inpu" v-model="input" @keyup.enter="btenter" type="text" class="seek-input" placeholder="周杰伦">
                <i @click="X" v-show="input" class="fas fa-times X"></i>
            </div>
            <router-link :to="{name: 'faxian'}" class="text-dark">取消</router-link>
        </div>
        <div class="dox">
            <keep-alive include="seekul">
                <router-view @click.native="voe" class="vie"></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    // 引入map
    import { mapState } from 'vuex'
    // 酷狗音乐api
    // http://mobilecdn.kugou.com/api/v3/search/song
    export default {
        name: 'SeekPlay',
        data() {
            return {
                input: '',
                myMusicArr: []
            }
        },
        methods: {
            btenter() {
                axios
                    .get("http://www.musicapi.space/search?keywords=" + this.input)
                    .then(response => {
                        this.myMusicArr = response.data.result.songs
                        this.$store.commit('musicData/GETMUSIC', this.myMusicArr)
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
                this.$router.push({
                    name: 'seekul'
                })
            },
            X() {
                this.$router.push({
                    name: 'defaultbox'
                })
                this.$store.commit('musicData/SERVE','')
                this.input = ''
            },
            voe() {
                this.$refs.inpu.focus()
                this.input = this.serve
            }
        },
        // 监视属性
        watch: {
        },
        // 计算属性
        computed: {
            ...mapState('musicData', ['musicArr', 'mp3Arr','serve'])
        }
    }
</script>

<style scoped>
    .box {
        width: 100%;
        height: 100vh;
    }

    .seek {
        width: 100%;
        height: 6rem;
        position: fixed;
        top: 0;
        display: flex;
        align-items: center;
        flex-direction: row;
        background-color: white;
        z-index: 1;
    }

    .vie {
        z-index: -1;
    }

    .seekdiv {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        margin-left: 2%;
    }

    a {
        text-decoration: none;
    }

    .seek>a {
        width: 20%;
        height: 100%;
        border-radius: 35%;
        margin: 0.2rem;
        font-size: 1.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .seek>a:hover {
        background-color: rgb(241, 241, 241);
    }

    .dox {
        width: 94%;
        height: 90%;
        margin-left: 3%;
        margin-right: 3%;
    }

    .seek-input {
        width: 100%;
        height: 45%;
        margin-left: 1rem;
        border-radius: 2rem;
        padding-left: 8%;
        border: none;
        box-shadow: -1px -1px 2px 1px rgb(198, 198, 198);
        background-color: rgb(241, 241, 241);
    }

    .X {
        position: absolute;
        right: 4%;
        font-size: 1.8rem;
        color: rgb(150, 150, 150);
    }

    .seek-input:focus {
        outline-style: none;
    }

    .seeki {
        position: absolute;
        top: 41%;
        left: 6%;
        color: rgb(150, 150, 150);
    }
</style>