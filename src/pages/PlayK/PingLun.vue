<template>
    <div class="box">
        <header class="dox1">
            <div class="dox1_1">
                <div class="yuan ms-2" @click="goreturn">
                    <i class="fas fa-angle-left"></i>
                </div>
            </div>
            <div class="dox1_2">
                <div class="dox1_2_1">
                    <img :src="imgobj.songs[0].al.picUrl">
                </div>
                <div class="dox1_2_2">
                    <p class="mt-3">{{ imgobj.songs[0].name }}</p>
                    <p class="musicname">{{ imgobj.songs[0].ar[0].name }}</p>
                </div>
                <div class="dox1_2_3">
                    <button type="button" class="fabu">发布故事</button>
                </div>
            </div>
            <div class="dox1_3">
                <div class="yinhe">
                    <router-link replace :to="{name:'musicpinglun'}" active-class="btn-route">歌曲评价</router-link>
                    <router-link replace :to="{name:'gushi'}" active-class="btn-route">音乐故事</router-link>
                </div>
            </div>
        </header>
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        naem: 'PingLun',
        methods: {
            goreturn() {
                this.$router.back()
            }
        },
        // 计算属性
        computed: {
            // 图片位置
            // imgobj.songs[0].al.picUrl
            ...mapState('musicData', ['imgobj'])
        },
    }
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }

    .box {
        width: 100%;
        height: 100vh;
        display: flex;
        overflow: visible;
        flex-direction: column;
        background: #C9D6FF;
        /* fallback for old browsers */
        background: -webkit-linear-gradient(to bottom, #e2e2e233, #c6d2fa24);
        /* Chrome 10-25, Safari 5.1-6 */
        background: linear-gradient(to bottom, #b2defb19, #ffffff2b);
        /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }
    a {
        text-decoration: none;
    }

    header {
        width: 100%;
        height: 30%;
        position: fixed;
        top: 0px;
        background-color: white;
        display: flex;
        flex-direction: column;
        z-index: 2;
    }

    .dox1_1 {
        width: 100%;
        height: 24%;
        display: flex;
        align-items: center;
    }

    .dox1_2 {
        width: 100%;
        height: 42%;
        display: flex;
        flex-direction: row;
        box-shadow: 0 10px 10px 0 rgba(220, 229, 232, 0.262);
    }

    .dox1_2_1 {
        width: 30%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .dox1_2_1 img {
        width: 8rem;
        height: 8rem;
        border-radius: 1.6rem;
    }

    .dox1_2_2 {
        width: 40%;
        height: 100%;
        overflow: hidden;
        font-size: 1.6rem;
    }

    .musicname {
        font-size: 1.2rem;
        color: #909090d6;
    }

    .dox1_2_3 {
        display: flex;
        justify-content: center;
        margin-right: 2%;
    }

    .fabu {
        width: 100%;
        height: 40%;
        border-radius: 1.8rem;
        margin-top: 1rem;
        color: white;
        font-size: 1.4rem;
        border: none;
        background-color: rgb(0, 157, 255);
        box-shadow: 4px 4px 8px 2px rgba(150, 150, 150, 0.449);
    }

    .dox1_2_3 {
        width: 30%;
        height: 100%;
    }

    .dox1_3 {
        width: 100%;
        height: 34%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .yinhe {
        width: 50%;
        height: 48%;
        background-color: rgba(205, 205, 205, 0.179);
        box-shadow: 0 0 10px 1px rgba(55, 55, 55, 0.14) inset;
        display: flex;
        padding: 0.5rem;
        flex-direction: row;
        justify-content: space-around;
        border-radius: 2rem;
    }

    .yinhe>a {
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        color: black;
        font-size: 1.2rem;
        justify-content: center;
    }

    .btn-route {
        background-color: rgba(255, 255, 255, 0.579);
        box-shadow: 1px 1px 3px 1px rgba(148, 148, 148, 0.485);
        border-radius: 2rem;
        font-weight: 600;
    }

    header .yuan {
        position: relative;
        width: 3rem;
        height: 3rem;
        font-size: 1.6rem;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        box-shadow: 4px 2px 8px 4px rgba(216, 223, 231, 0.659);
        z-index: 1;
    }

    .yuan:hover {
        opacity: 0.75;
    }

    .yuan i {
        z-index: 2;
    }

    .yuan::before {
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

    main {
        width: 100%;
        height: 70%;
        position: absolute;
        top: 30%;
        overflow: scroll;
    }
</style>