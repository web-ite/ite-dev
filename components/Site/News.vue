<template>
  <div class="card newsFreebox f9">
      <div class="card-body">
        <h2 class="card-title">
          <nuxt-link to="/ru/media-center/news">
            <span>→</span>
            Новости
          </nuxt-link>
        </h2>
        <div class="card-text">
          <div class="articleBoxItem" v-for="article in articles" @click="goToArticle(article)">
            <span class="articleBoxDate">{{ article.Date }}</span>
            <span class="articleBoxTitle">{{ article.Title }}</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from '~/plugins/axios'
  export default {
    data: function () {
      return {
        articles: []
      }
    },
    methods: {
      fetchData: function () {
        let self = this
        axios({
          method: 'get',
          url: '/api/services/articles',
          params: {
            language: 'ru'
          }
        }).then((response) => {
          let articles = []
          for (let i = 0; i < 4; i++) {
            articles[i] = response.data.data[i]
          }
          for (let i = 0; i < articles.length; i++) {
            let date = new Date(articles[i].Date)
            articles[i].Date = date.getDate() + '.' + (date.getMonth() + 1)
          }
          self.articles = articles
        }, (error) => {
          console.log(error)
        })
      }
    },
    created: function () {
      let self = this
      self.fetchData()
    }
  }
</script>

<style lang="scss">
  @import "assets/css/colors.scss";
  .newsFreebox { 
    width: 100%;
    border: none;
    border-radius: 0;
    min-height: 298px;
    max-height: 298px;
    overflow: hidden;
  }
  .articleBoxDate {
    background-color: $secondary-color;
    color: #000;
    padding: 3px 5px;
    margin-right: 10px;
  }
  .articleBoxItem {
    display: flex;
    align-items: flex-start;
    padding: 5px 0;
    border-bottom: 1px dashed #aaa;
  }
</style>