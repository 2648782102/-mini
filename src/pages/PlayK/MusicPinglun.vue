<template>
  <div>
    <div class="dox">
      <header class="container-fluid">
        <div class="to">
          <p>全部评论<span class="ms-2">20</span></p>
        </div>
        <ul class="pinglunul">
          <li class="mt-5" v-for="item in pinglun.hotComments" :key="item.commentId">
            <div class="he">
              <div class="he1">
                <img :src="item.user.avatarUrl" alt="">
              </div>
              <div class="he2">
                <div class="he21">
                  <p>{{ item.user.nickname }}</p>
                </div>
                <div class="he22">
                  <p>{{ item.content }}</p>
                </div>
                <div class="he23">
                  <p>{{ item.timeStr }}发布 . 回复<i class="bi bi-chevron-right ms-1"></i></p>
                </div>
              </div>
              <div class="he3">
                <div class="he31">
                  <LikeL class="like" />
                </div>
                <span>{{ nums(item.likedCount) }}</span>
              </div>
            </div>
          </li>
        </ul>
      </header>
      <footer>
        <div class="footer1">
          <img src="../../assets/userimg1.jpeg" alt="">
        </div>
        <!-- 底部评论 -->
        <div class="footer2">
          <input type="text" placeholder="写下你想说的话吧~">
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import LikeL from '../../components/LikeL.vue'

  export default {
    name: 'MusicPinglun',
    computed: {
      ...mapState('musicData', ['pinglun']),
    },
    mounted() {
      // console.log(this.pinglun)
    },
    methods: {
      nums: function (item) {
        if (item > 999) {
          return 999 + "+"
        } else {
          return item
        }
      }
    },
    components: {
      LikeL
    }
  }
</script>

<style scoped>
  .dox {
    width: 100%;
    height: 100%;
    padding-bottom: 10rem;
    background: #C9D6FF;
    /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #e2e2e233, #d0d1d624);
    /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #d2d7da19, #ffffff2b);
    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  header {
    width: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
  }

  .pinglunul {
    width: 100%;
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .pinglunul li {
    width: 100%;
    height: auto;
  }

  .he {
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .he1 {
    width: 20%;
    height: 5rem;
    display: flex;
    justify-content: center;
  }

  .he1 img {
    width: 4.6rem;
    height: 4.6rem;
    border-radius: 50%;
  }

  .he2 {
    width: 78%;
    display: flex;
    flex-direction: column;
  }

  .he21 {
    width: 100%;
    height: 2.2rem;
    font-size: 1.6rem;
  }

  .he22 {
    width: 100%;
    font-size: 1.2rem;
    padding-top: 3%;
  }

  .he23 {
    width: 100%;
    height: 1.5rem;
  }

  .he3 {
    width: 4rem;
    height: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .he31 {
    width: 5rem;
    height: 5rem;
  }

  .to {
    width: 100%;
    height: 5rem;
    font-size: 1.7rem;
    font-weight: 700;
    display: flex;
    align-items: center;
  }

  .to span {
    font-size: 1.4rem;
    color: rgba(127, 127, 127, 0.637);
  }

  footer {
    width: 100%;
    height: 10%;
    display: flex;
    flex-direction: row;
    position: fixed;
    bottom: 0;
    background-color: white;
    box-shadow: 0 -7px 10px 0 rgba(212, 217, 219, 0.618);
  }

  .footer1 {
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .footer1 img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
  }

  .footer2 {
    width: 80%;
    height: 8rem;
    display: flex;
    align-items: center;
  }

  .footer2 input {
    width: 98%;
    height: 46%;
    padding-left: 5%;
    border: none;
    border-radius: 1.8rem;
    box-shadow: 2px 2px 8px 2px rgba(191, 203, 210, 0.419) inset;
  }
</style>