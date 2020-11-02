<template>
  <div class="my-container">
    <van-cell-group v-if="user" class="my-info">
      <van-cell
              class="base-info"
              center
              :border="false"
      >
        <van-image
                class="avatar"
                slot="icon"
                round
                fit="cover"
                :src="currentUser.photo"
                 />
        <div slot="title" class="name">{{currentUser.intro}}</div>
        <van-button
                class="update-btn"
                round
                size="small"
        >编辑资料
        </van-button>
      </van-cell>

      <van-grid class="data-info" :border="false">
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ currentUser.art_count }}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ currentUser.follow_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ currentUser.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div slot="text" class="text-wrap">
            <div class="count">{{ currentUser.like_count }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <div class="not-login" v-else>
      <div class="mobile" @click="$router.push('/login')">
        <img src="./mobile.png"/>
      </div>
      <div class="text">登录/注册</div>
    </div>
    <van-grid clickable :column-num="2">
      <van-grid-item
              class="nav-grid-item"
              icon-prefix="toutiao"
              icon="shoucang" text="头条"/>
      <van-grid-item
              class="nav-grid-item"
              icon-prefix="toutiao"
              icon="lishi"
              text="历史"/>
    </van-grid>
    <van-cell-group>
      <van-cell title="消息通知" is-link to=""/>
      <van-cell title="小智同学" is-link to=""/>
      <van-cell title="退出" v-if="user" @click="onLogout" class="logout-cell"/>
    </van-cell-group>

  </div>
</template>

<script>
  import { Dialog } from 'vant'
  import { mapState } from 'vuex'
  import { getCurrentUser } from '../../api/user'

  export default {
    name: 'MyIndex', data () {
      return {
        currentUser: {} // 当前登录用户信息
      }
    },
    created () {
      this.loadCurrentUser()
    },
    computed: {
      ...mapState(['user'])//仓库映射到本地
    },
    methods: {
      async loadCurrentUser () {
        const { data } = await getCurrentUser()
        this.currentUser = data.data
      },
      onLogout () {
        Dialog.confirm({
          title: '退出登录',
          message: '确定要退出吗？',
        })
          .then(() => {
            //清除登录状态
            this.$store.commit('setUser', null)
          })
          .catch(() => {
            // on cancel
          })
      }
    }
  }
</script>

<style scoped lang="scss">
  .my-container {
    .my-info {
      background: url("./banner.png") no-repeat;
      background-size: cover;
    }

    .base-info {
      box-sizing: border-box;
      height: 115px;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;

      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }

      .name {
        font-size: 15px;
        color: #fff;
      }

      .update-btn {
        height: 16px;
        font-size: 10px;
        color: #666;
      }
    }

    .not-login {
      height: 180px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-image: url("banner.png");
      background-repeat: no-repeat;
      background-size: cover;

      .mobile {
        width: 66px;
        height: 66px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .text {
        color: #fff;
        font-size: 14px;
      }
    }

    ::v-deep .van-grid-item__content {
      background-color: unset;
    }

    .data-info {
      .data-info-item {
        height: 65px;
      }

      .text-wrap {
        text-align: center;
        color: #fff
      }

      .count {
        font-size: 18px;
      }

      .text {
        font-size: 11px;
      }
    }

    .logout-cell {
      text-align: center;
      color: #d86262;
    }
  }
</style>
