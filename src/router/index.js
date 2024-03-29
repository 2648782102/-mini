
// 引入vuerouter
import VueRouter from "vue-router";

// 引入路由组件，并进行懒加载
const LeftDiscover = () => import('../pages/LeftDiscover/LeftDiscover')
const RightMy = () => import('../pages/RightMy/RightMy')
const FaXian = () => import('../pages/LeftDiscover/FaXian')
import DingYue from '../pages/LeftDiscover/DingYue'
const BottomNav = () => import('../pages/PlayNav/BottomNav')
const PlayK = () => import('../pages/PlayK/PlayK')
const SeekPlay = () => import('../pages/搜索/SeekPlay')
const DefaultBox = () => import('../pages/搜索/DefaultBox')
const SeekUl = () => import('../pages/搜索/SeekUl')
const PingLun = () => import('../pages/PlayK/PingLun')
const MusicPinglun = () => import('../pages/PlayK/MusicPinglun')
const GuShi = () => import('../pages/PlayK/GuShi')
const DengLu = () => import('../pages/denglu/DengLu')
const ZuiJInplay = () => import('../pages/RightMy/ZuiJinplay')
const GeDanMusic = () => import('../pages/RightMy/GeDanMusic')

// 解决：Uncaught (in promise) NavigationDuplicated; 
let originalPush = VueRouter.prototype.push; // 先保存一份 VueRouter.prototype.push方法
let originalRepace = VueRouter.prototype.replace;
 
VueRouter.prototype.push = function push(location) {
    // call(); 篡改上下文    catch(); 捕获异常 **** 
    return originalPush.call(this, location).catch(e => e);
}
VueRouter.prototype.replace = function replace(location) {
    return originalRepace.call(this, location).catch(e => e);
}


const router = new VueRouter({
    routes:[
        // 配置默认页面
        {
            path:'/',
            redirect:'/homeplay/leftdiscover',
        },
        {
            name: 'homeplay',
            path: '/homeplay',
            component: BottomNav,
            // redirect: '/leftdiscover',
            meta: {title: '导航',isAush:false},
            children: [
                {
                    name: 'leftdiscover',
                    path: 'leftdiscover',
                    component:LeftDiscover,
                    redirect:'/homeplay/leftdiscover/faxian',
                    meta:{title: '发现',isAush:false},
                    children:[
                        {
                            name: 'faxian',
                            path: 'faxian',
                            component: FaXian,
                            meta: {title: '发现',isAush:false}
                        },
                        {
                            name: 'dingyue',
                            path: 'dingyue',
                            component: DingYue,
                            meta: {title: '订阅',isAush:false}
                        }
                    ]
                },
                {
                    name: 'rightmy',
                    path: 'rightmy',
                    component:RightMy,
                    meta:{title: '我的',isAush:false},
                    children:[]
                },
            ]
        },
        {
            name: 'playk',
            path: '/playk',
            component: PlayK,
            meta:{title:'播放界面',isAush:false},
            children: []
        },
        {
            name: 'seekplay',
            path: '/seekplay',
            component: SeekPlay,
            redirect: '/seekplay/defaultbox',
            meta: {title: '搜索页面',isAush:false},
            children:[
                {
                    name: 'defaultbox',
                    path: 'defaultbox',
                    component: DefaultBox,
                    meta:{title:'搜索默认',isAush:false}
                },
                {
                    name: 'seekul',
                    path: 'seekul',
                    component: SeekUl,
                    meta:{title: '搜索列表',isAush:false},
                }
            ]
        },
        {
            name: 'pinglun',
            path: '/pinglun',
            component: PingLun,
            redirect: '/pinglun/musicpinglun',
            meta: {title: '评论页面',isAush:false},
            children:[
                {
                    name:'musicpinglun',
                    path:'musicpinglun',
                    component:MusicPinglun,
                    meta: {title: '音乐评论',isAush:false},
                },
                {
                    name:'gushi',
                    path:'gushi',
                    component:GuShi,
                    meta: {title: '音乐故事',isAush:false},
                }
            ]
        },
        {
            name: 'denglu',
            path: '/denglu',
            component: DengLu,
            meta: {title: '登录',isAush: false}
        },
        {
            name: 'zuijinplay',
            path: '/zuijinplay',
            component: ZuiJInplay,
            meta: {title: '最近播放',isAush: false}
        },
        {
            name: 'gedanmusic',
            path: '/gedanmusic',
            component: GeDanMusic,
            meta: {title: '歌单',isAush: false}
        }
    ]
})

export default router