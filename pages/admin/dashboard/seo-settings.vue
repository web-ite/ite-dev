<template>
  <div class="adminContentSection w-80 p-4">
    <div class="row">
      <div class="col-12">
        <h4 class="page-header">Site SEO Settings</h4>
      </div>
    </div>
    <form class="form-horizontal" @submit.prevent="validateMeta">
      <div class="form-group row" :class="{ 'has-error': errors.has('meta.title') }">
        <label class="col-12 col-sm-4" for="input-seo-title">Title</label>
        <div class="col-12 col-sm-8">
          <input type="text" name="input-seo-title" class="form-control" v-model="meta.title" v-validate="'required'"/>
          <p class="text-danger" v-if="errors.has('meta.title')">{{ errors.first('meta.title') }}</p>
        </div>
      </div>
      <div class="form-group row" :class="{ 'has-error': errors.has('meta.description') }">
        <label class="col-12 col-sm-4" for="input-seo-description">Description</label>
        <div class="col-12 col-sm-8">
          <textarea name="input-seo-description" class="form-control" rows="5" v-model="meta.description" v-validate="'required|max:200'"></textarea>
          <p class="text-danger" v-if="errors.has('meta.description')">{{ errors.first('meta.description') }}</p>
        </div>
      </div>
      <div class="form-group row" :class="{ 'has-error': errors.has('meta.keywords') }">
        <label class="col-12 col-sm-4" for="input-seo-keywords">Keywords</label>
        <div class="col-12 col-sm-8">
          <textarea name="input-seo-keywords" class="form-control" rows="5" v-model="meta.keywords" v-validate="'required'"></textarea>
          <p class="text-danger" v-if="errors.has('meta.keywords')">{{ errors.first('meta.keywords') }}</p>
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
import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate, { inject: false })

export default {
  layout: 'admin_dashboard',
  head () {
    return {
      title: 'SEO Settings'
    }
  },
  data: function () {
    return {
      meta: {}
    }
  },
  methods: {
    fetchMeta: function () {
      let self = this
      return axios.get('/api/site').then(response => {
        self.meta = response.data.settings.seo
      }).catch(error => {
        console.log(error)
      })
    },
    validateMeta: function () {
      let self = this
      self.$validator.validateAll().then((result) => {
        if (result) {
          alert('From Submitted!')
          return
        }
        alert('Correct them errors!')
      })
    },
    saveMeta: function (meta) {
      axios({
        method: 'post',
        url: '/api/site/meta',
        data: meta
      }).then(response => {
        console.log('Success')
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created: function () {
    this.fetchMeta()
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