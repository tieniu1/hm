<template>
  <div class="article-list">
    <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
    >
      <van-cell v-for="(article,index) in articles" :key="index" :article="article"/>
    </van-list>
  </div>
</template>

<script>
  import { getArticles } from '@/api/article'

  export default {
    name: 'ArticleList',
    props: {
      channel: {
        type: Object,
        required: true//必传
      }
    },
    data () {
      return {
        articles: [],//数据列表
        loading: false,//控制加载中的loading状态
        finished: false,//控制加载结束的状态
        timestamp: null,//获取下一页的时间戳
      }
    },
    methods: {
      async onLoad () {
        // 1.异步更新数据
        let { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        //2.数据放到list中
        const { results } = data.data
        this.articles.push(...results)

        // 3.加载状态结束
        this.loading = false

        // 4.数据全部加载完成
        if (results.length){
          this.timestamp = data.data.pre_timestamp
        }else {
          // 没有数据了，把加载状态设置结束，不再触发加载更多
          this.finished = true
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  .article-list {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 50px;
    top: 90px;
    overflow-y: auto;
  }
</style>
