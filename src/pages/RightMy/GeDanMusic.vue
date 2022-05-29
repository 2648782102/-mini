<template>
    <div class="box">
        <div class="dox container-fluid">
            <!-- 歌单头部 -->
            <div>
                <div class="top1" @click="$router.back()">
                    <i class="fas fa-angle-left"></i>
                    <span>返回</span>
                </div>
                <div class="top2 mt-2">
                    <img :src="musicArr[0].al.picUrl" alt="">
                </div>
            </div>
            <ul class="list-group mt-2">
                <li class="mt-1" v-for="(item,index) in musicArr" :key="index">
                    <router-link :to="{name:'playk'}" @click.native="axplay(item.id,index)" class="roua">
                        <div class="left">
                            <div class="top">
                                <span>{{ item.name }}</span>
                            </div>
                            <div class="bottom">
                                <span v-for="link in item.artists" :key="link.id">{{ link.name+" " }}</span>
                            </div>
                        </div>
                    </router-link>
                    <div class="right">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    // 引入音频插件及样式
    import { mapState } from 'vuex'

    export default {
        name: 'GeDanMusic',
        methods: {
            axplay(id, index) {
                // 获取歌曲url
                this.$store.dispatch('musicData/mp3Obj', id)
                // 获取歌曲信息
                this.$store.dispatch('musicData/imgObj', id)
                //获取评价
                this.$store.dispatch('musicData/pingLun', id)
                // 获取歌词
                this.$store.dispatch('musicData/lyRic', id)
                // 保存当前点击歌曲序号
                this.$store.commit('musicData/MUSICNUM', index)
            }
        },
        // 计算属性
        computed: {
            ...mapState('musicData', ['musicArr', 'musicnum'])
        },
    }
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }

    .box {
        width: 100%;
        overflow: scroll;
    }

    .dox {
        width: 100%;
    }

    ul li {
        width: 100%;
        display: flex;
        margin-top: 2rem;
        margin-bottom: 2rem;
        flex-direction: row;
    }

    .roua {
        width: 90%;
        height: 100%;
    }

    li .left {
        width: 100%;
        height: 100%;
    }

    li .right {
        width: 10%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: rgb(117, 117, 117);
        font-size: 2rem;
    }

    a {
        text-decoration: none;
    }

    .left .top {
        width: 100%;
        height: 58%;
        display: flex;
        align-items: center;
        font-size: 1.8rem;
        color: black;
        font-weight: 600;
    }

    .left .bottom {
        width: 100%;
        height: 42%;
        color: rgb(117, 117, 117);
    }

    .top1 {
        width: 100%;
        height: 10%;
        font-size: 3rem;
    }

    .top2 {
        width: 100%;
        height: 30%;
    }

    .top2>img {
        width: 10rem;
        height: 10rem;
        border-radius: 1rem;
    }
</style>