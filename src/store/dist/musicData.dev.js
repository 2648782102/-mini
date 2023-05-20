"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
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
    userxinxi: null,
    zuijinplay: {},
    reshou: [],
    serve: ''
  },
  // 修改数据
  mutations: {
    GETMUSIC: function GETMUSIC(state, value) {
      state.musicArr = value;
    },
    IMGOBJ: function IMGOBJ(state, value) {
      state.imgobj = value;
    },
    MP3OBJ: function MP3OBJ(state, value) {
      state.mp3obj = value;
    },
    LYRIC: function LYRIC(state, value) {
      state.lyric = value;
    },
    MUSICNUM: function MUSICNUM(state, value) {
      state.musicnum = value;
    },
    PINGLUN: function PINGLUN(state, value) {
      state.pinglun = value;
    },
    USERXINXI: function USERXINXI(state, value) {
      state.userxinxi = value;
    },
    ZUIJINPLAY: function ZUIJINPLAY(state, value) {
      state.zuijinplay = value;
    },
    RESHOU: function RESHOU(state, value) {
      state.reshou = value;
    },
    SERVE: function SERVE(state, value) {
      state.serve = value;
    }
  },
  // 响应动作
  actions: {
    // 获取歌曲链接信息
    mp3Obj: function mp3Obj(context, value) {
      _axios["default"].get('http://www.musicapi.space/song/url?id=' + value).then(function (response) {
        context.commit('MP3OBJ', response.data);
      })["catch"](function (error) {
        console.log(error);
      });
    },
    // 获取歌曲信息(封面等)
    imgObj: function imgObj(context, value) {
      _axios["default"].get('http://www.musicapi.space/song/detail?ids=' + value).then(function (response) {
        context.commit('IMGOBJ', response.data);
      })["catch"](function (error) {
        console.log(error);
      });
    },
    // 获取评价
    pingLun: function pingLun(context, value) {
      _axios["default"].get('http://www.musicapi.space/comment/hot?type=0&id=' + value).then(function (response) {
        context.commit('PINGLUN', response.data);
      })["catch"](function (error) {
        console.log(error);
      });
    },
    // 获取歌词
    lyRic: function lyRic(context, value) {
      _axios["default"].get('http://www.musicapi.space/lyric?id=' + value).then(function (response) {
        context.commit('LYRIC', response.data);
      })["catch"](function (error) {
        console.log(error);
      });
    }
  },
  // 加工数据
  getters: {}
};
exports["default"] = _default;