<template>
  <div class="adminContentSection w-80 p-4">
    <div class="row">
      <div class="col-12">
        <h4 class="page-header">Language Settings</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-sm-12">
        <h6 class="text-primary">Added languages</h6>
        <ul class="tag-list">
          <li class="tag-list-item" v-for="language in siteLanguages">{{ language.name }}</li>
        </ul>
      </div>
    </div>
    <hr>
    <form class="form-horizontal" @submit="addLanguageToSiteLanguages(newLanguage)">
      <div class="form-group row">
        <label class="col-12 col-sm-4" for="input-langauge">Additional languages</label>
        <div class="col-12 col-sm-6">
          <select name="input-language" class="form-control" v-model="newLanguage">
            <option v-for="language in allLanguages" v-bind:value="language">{{ language.name }}</option>
          </select>
        </div>
        <div class="col-12 col-sm-2">
          <button type="submit" class="btn btn-block btn-primary">Add</button>
        </div>
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
      title: 'Language Settings'
    }
  },
  data: function () {
    return {
      allLanguages: [],
      siteLanguages: [],
      newLanguage: {}
    }
  },
  methods: {
    fetchSiteLanguages: function () {
      let self = this
      return axios.get('/api/site/languages').then(response => {
        self.siteLanguages = response.data
      })
    },
    fetchAllLanguages: function () {
      let self = this
      return axios.get('/api/languages').then(response => {
        self.allLanguages = response.data
      })
    },
    addLanguageToSiteLanguages: function (language) {
      axios({
        method: 'post',
        url: '/api/site/languages',
        data: language
      }).then(response => {
        /* setTimeout(() => {
          location.reload(true)
        }, 1000) */
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created: function () {
    this.fetchSiteLanguages()
    this.fetchAllLanguages()
  }
}
</script>