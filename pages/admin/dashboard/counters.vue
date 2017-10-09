<template>
  <div class="adminContentSection w-80 p-4">
    <div class="row w-100">
      <div class="col-12">
        <h4 class="page-header">Counters</h4>
      </div>
    </div>
    <form class="form-horizontal" @submit="">
      <div class="form-group row">
        <label class="col-12 col-sm-4" for="input-yandex-counter">Yandex counter</label>
        <div class="col-12 col-sm-8">
          <textarea name="input-yandex-counter" class="form-control" rows="5" v-model="counters.yandex"></textarea>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-12 col-sm-4" for="input-google-counter">Google counter</label>
        <div class="col-12 col-sm-8">
          <textarea name="input-google-counter" class="form-control" rows="5" v-model="counters.google"></textarea>
        </div>
      </div>
      <div class="form-buttons">
        <button class="btn btn-primary float-right">Add counters</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  layout: 'admin_dashboard',
  head () {
    return {
      title: 'Counters'
    }
  },
  data: function () {
    return {
      counters: {}
    }
  },
  methods: {
    fetchCounters: function () {
      let self = this
      return axios.get('/api/site/counters').then((response) => {
        self.counters = response.data
      }).catch((error) => {
        console.log(error)
      })
    },
    saveCounters: function () {
      axios({
      }).then((response) => {
        setTimeout(() => {
          location.reload(true)
        }, 1000)
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  created: function () {
    let self = this
    self.fetchCounters()
  }
}
</script>