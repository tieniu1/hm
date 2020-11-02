<template>
  <div class="home-container">
    <!--导航栏-->
    <van-nav-bar class="app-nav-bar">
      <van-button
              slot="title"
              class="search-btn"
              icon="search"
              type="info"
              round
              size="small"
              to="/search"
      >搜索
      </van-button>
    </van-nav-bar>
    <!--/导航栏-->
    <!--文章频道列表-->
    <van-tabs class="channel-tabs" v-model="active">
      <van-tab
              v-for="channel in channels"
              :title="channel.name"
              :key="channel.id"
      >
        <!-- 文章列表 -->
        <article-list :channel="channel"></article-list>
        <!-- /文章列表 -->
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import { getChannels } from '@/api/user'
  import ArticleList from './components/article-list'

  export default {
    name: 'index',
    data () {
      return {
        active: 0,//默认展示频道
        channels: [],//频道
        articles:[],//文章
      }
    },
    components: {
      ArticleList
    },
    created () {
      this.loadChannels()
    },
    methods: {
      async loadChannels () {
        let { data } = await getChannels()
        this.channels = data.data.channels
      },

    }
  }
</script>

<style scoped lang="scss">
  .home-container {
    ::v-deep .van-nav-bar__title {
      max-width: none;
    }

    .search-btn {
      width: 277px;
      height: 32px;
      background: #5babfb;
      border: none;

      .van-icon {
        font-size: 16px;
        color: #fff;
      }

      .van-button__text {
        font-size: 14px;
      }
    }
  }
</style>
