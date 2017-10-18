<template>
  <p class="exhibitionDateVenue text-center text-sm-left">
    <span class="exhibitionDateVenue__date secondary-text">
      {{ date }}
    </span>
    <span>•</span>
    <span class="exhibitionDateVenue__venue">
      {{ venue }}
    </span>
  </p>
</template>

<script>
  import axios from '~/plugins/axios'
  export default {
    data: function () {
      return {
        date: '',
        venue: ''
      }
    },
    methods: {
      getDate: function () {
        let self = this
        axios({
          method: 'get',
          url: '/api/content/header/date'
        }).then((response) => {
          console.log(response)
          self.date = response.data
        }).catch((error) => {
          console.log(error)
        })
      },
      getVenue: function () {
        let self = this
        axios({
          method: 'get',
          url: '/api/content/header/venue'
        }).then((response) => {
          console.log(response)
          self.venue = response.data
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    created: function () {
      let self = this
      self.getDate()
      self.getVenue()
    }
  }
</script>

<style>
  .exhibitionDateVenue__date
  {
    font-size: 16px;
  }
  .exhibitionDateVenue__venue
  {
    font-size: 16px;
  }
</style>