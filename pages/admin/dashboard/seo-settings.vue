<template>
  <div class="adminContentSection w-80 p-4">
    <div class="row">
      <div class="col-12">
        <h4 class="page-header">Site SEO Settings</h4>
      </div>
    </div>
    <div v-if="showAlert === 'warning' || showAlert === 'success'" class="row">
      <div class="col-12">
        <div class="alert" v-bind:class="{ 'alert-warning': showAlert === 'warning', 'alert-success': showAlert === 'success' }" role="alert">
          {{ alertText }}
        </div>
      </div>
    </div>
    <form class="form-horizontal" @submit.prevent="validateMeta">
      <div class="form-group row">
        <label class="col-12 col-sm-4" for="input-seo-title">Title</label>
        <div class="col-12 col-sm-8">
          <input type="text" name="input-seo-title" class="form-control" v-model="meta.title"/>
          <!--<p class="text-danger" v-if="error.title">The title is required</p>-->
        </div>
      </div>
      <div class="form-group row">
        <label class="col-12 col-sm-4" for="input-seo-description">Description</label>
        <div class="col-12 col-sm-8">
          <textarea name="input-seo-description" class="form-control" rows="5" v-model="meta.description"></textarea>
          <!--<p class="text-danger" v-if="error.description">The description is required. Max length of the description is 200 symbols</p>-->
        </div>
      </div>
      <div class="form-group row">
        <label class="col-12 col-sm-4" for="input-seo-keywords">Keywords</label>
        <div class="col-12 col-sm-8">
          <textarea name="input-seo-keywords" class="form-control" rows="5" v-model="meta.keywords"></textarea>
        </div>
      </div>
      <div class="form-buttons row">
        <div class="col-12">
          <button type="submit" class="btn btn-primary float-right">Save</button>
        </div>
      </div>
    </form>
    <div class="row">
      <div class="col-12">
        <h4 class="page-header">Preview</h4>
      </div>
    </div>
    <div class="preview">
      <div class="row">
        <div class="col-12">
            <pre>
            &lt;head&gt;
              &lt;title&gt;{{ meta.title }}&lt;/title&gt;
              &lt;meta name="description" content="{{ meta.description }}"/&gt;
              &lt;meta name="keywords" content="{{ meta.keywords }}"/&gt;
              ...
            &lt;/head&gt;
            </pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  layout: 'admin_dashboard',
  head () {
    return {
      title: 'SEO Settings'
    }
  },
  data: function () {
    return {
      meta: {},
      showAlert: 'none',
      alertText: ''
    }
  },
  methods: {
    fetchMeta: function () {
      let self = this
      return axios.get('/api/site/meta').then(response => {
        self.meta = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    validateMeta: function () {
      let self = this
      if ((self.meta.title === undefined) || (self.meta.title === null) || (self.meta.title === '')) {
        self.showAlert = 'warning'
        self.alertText = 'The title field is required'
      } else if ((self.meta.description === undefined) || (self.meta.description === null) || (self.meta.description === '')) {
        self.showAlert = 'warning'
        self.alertText = 'The description field is required'
      } else {
        self.showAlert = 'success'
        self.alertText = 'Success'
        self.saveMeta(self.meta)
      }
    },
    saveMeta: function (meta) {
      axios({
        method: 'post',
        url: '/api/site/meta',
        data: meta
      }).then(response => {
        setTimeout(() => {
          location.reload(true)
        }, 1000)
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created: function () {
    let self = this
    self.fetchMeta()
  }
}
</script>

<style scoped>
  .preview
  {
    border: 1px solid #e2e2e2;
    padding: 10px;
  }
</style>