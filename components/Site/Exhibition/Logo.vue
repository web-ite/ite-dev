<template>
  <img class="exhibitionLogotype" :src="`/images/${ logotype }`">
</template>

<script>
  import axios from '~/plugins/axios'
  export default {
    data: function () {
      return {
        logotype: ''
      }
    },
    methods: {
      getLogotype: function () {
        let self = this
        axios({
          method: 'get',
          url: '/api/content/header/logotype'
        }).then((response) => {
          console.log(response)
          self.logotype = response.data
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    created: function () {
      let self = this
      self.getLogotype()
    }
  }
</script>