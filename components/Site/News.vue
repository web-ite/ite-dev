<template>
  <div class="card newsFreebox f9">
      <div class="card-body">
        <h2 class="card-title">
          <span>→</span>
          Новости
        </h2>
        <div class="card-text">
          <p class="articleBoxItem" v-for="article in articles" @click="goToArticle(article)">
            <span class="articleBoxDate">{{ article.Date }}</span>
            <span class="articleBoxTitle">{{ article.Title }}</span>
          </p>
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
          let articles = response.data.data
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
    max-height: 298px;
    overflow: hidden;
  }
  .articleBoxDate {
    background-color: $secondary-color;
    color: #000;
    padding: 3px 5px;
    margin-right: 10px;
  }
</style>