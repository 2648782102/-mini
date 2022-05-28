import axios from "axios"

export default {
        // 开启命名空间
        namespaced: true,
        // 数据
        state: {
            ca: '',
            musicArr: [],
            imgobj: [],
            mp3obj: [],
            lyric: [],
            musicnum: 0,
            pinglun: [],
            userxinxi:null,
            zuijinplay:{},
            reshou: [],
            serve: ''
        },
        // 修改数据
        mutations: {
            GETMUSIC(state,value) {
                state.musicArr = value
            },
            IMGOBJ(state,value) {
                state.imgobj = value
            },
            MP3OBJ(state,value) {
                state.mp3obj = value
            },
            LYRIC(state,value) {
                state.lyric = value
            },
            MUSICNUM(state,value) {
                state.musicnum = value
            },
            PINGLUN(state,value) {
                state.pinglun = value
            },
            USERXINXI(state,value) {
                state.userxinxi = value
            },
            ZUIJINPLAY(state,value) {
                state.zuijinplay = value
            },
            RESHOU(state,value) {
                state.reshou = value
            },
            SERVE(state,value) {
                state.serve = value
            }
        },
        // 响应动作
        actions: {
            // 获取歌曲链接信息
            mp3Obj(context,value) {
                // axios.get('https://autumnfish.cn/song/url?id='+value)
                axios.get('https://netease-cloud-music-api-lilac-one-32.vercel.app/song/url?id='+value)
                .then(response => {
                    context.commit('MP3OBJ',response.data)
                })
                .catch(function(error) {
                    console.log(error)
                })
            },
            // 获取歌曲信息(封面等)
            imgObj(context,value) {
                axios.get('https://netease-cloud-music-api-lilac-one-32.vercel.app/song/detail?ids='+value)
                .then(response => {
                    context.commit('IMGOBJ',response.data)
                })
                .catch(function(error) {
                    console.log(error)
                })
            },
            // 获取评价
            pingLun(context,value) {
                axios.get('https://netease-cloud-music-api-lilac-one-32.vercel.app/comment/hot?type=0&id='+value)
                .then(response => {
                    context.commit('PINGLUN',response.data)
                })
                .catch(function(error) {
                    console.log(error)
                })
            },
            // 获取歌词
            lyRic(context,value) {
                axios.get('https://netease-cloud-music-api-lilac-one-32.vercel.app/lyric?id='+value)
                .then(response => {
                    context.commit('LYRIC',response.data)
                })
                .catch(function(error) {
                    console.log(error)
                })
            }
        },
        // 加工数据
        getters: {}
}