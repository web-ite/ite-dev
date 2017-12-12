<template>
  <main class="mainSection">
    <div class="page-header siteSection__page-header">
      {{ article.Title }}
    </div>
    <section class="layer container">
      <div class="w-66">
        <div class="article" v-bind:class="{ 'd-relative': $store.state.admin }">
          <img :src="`/images/news/${article.Thumbnail}`" class="articleThumbnail">
          <div class="row">
            <div class="col-6">
              <p class="articleDate">{{ article.Date }}</p>
            </div>
            <div class="col-6">
              <p class="articleType">{{ article.Type }}</p>
            </div>
          </div>
          <p v-html="article.Text"></p>
          <div v-if="$store.state.admin" class="d-modal">
            <button class="btn btn-primary btn-edit-mode" @click="articleModal = true">Edit</button>
            <b-modal v-model="articleModal" size="lg" hide-header-close title="Edit article">
              <b-alert :show="articleAlert" :variant="articleAlertType">{{ articleAlertText }}</b-alert>
              <b-row>
                <b-col cols="12">
                  <div class="dropbox">
                  
                    <img v-if="thumbnail" :src="thumbnailSource" class="logotype-preview"/>
                    <a v-if="thumbnail" @click="removeThumbnail" class="remove-btn"><i class="fa fa-trash"></i></a>
                    
                    <b-form-file v-if="!thumbnail" id="input-thumbnail" v-model="thumbnailFile" @change="onThumbnailChange"></b-form-file>
                    <p v-if="!thumbnail">Drag your file(s) here to begin or click to browse</p>
                    
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12">
                  <b-form-group id="input-article-title-group" label="Article title:" label-for="input-article-title">
                    <b-form-input id="input-article-title" type="text" v-model="articleModel.Title"></b-form-input>
                  </b-form-group>
                  <b-form-group id="input-article-alias-group" label="Article alias:" label-for="input-article-alias">
                    <b-form-input id="input-article-alias" type="text" v-model="articleModel.alias"></b-form-input>
                  </b-form-group>
                  <b-form-group id="input-article-description" label="Article description:" label-for="input-article-description">
                    <b-form-textarea id="input-article-description" rows="3" v-model="articleModel.Description"></b-form-textarea>
                  </b-form-group>
                  <b-form-group id="input-article-text-group" label="Article text:" label-for="input-article-text">
                    <div class="quill-editor" id="input-article-text" v-model="articleModel.Text"  v-quill:myQuillEditor="editorOptions"></div>
                  </b-form-group>
                  <div class="clearfix"></div>
                  <b-form-group id="input-article-date-group" label="Article date:" label-for="input-article-date">
                    <b-form-input id="input-article-date" type="datetime-local" v-model="articleModel.Date"></b-form-input>
                  </b-form-group>
                  <b-form-group id="input-article-type-group" label="Article type:" label-for="input-article-type">
                     <b-form-select v-model="articleModel.Type" :options="articleTypes" class="mb-3"></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>
              <template slot="modal-footer">
                <b-button @click="saveArticle(articleModel)" variant="primary">Save</b-button>
              </template>
            </b-modal>
          </div>
        </div>
        <div class="bottomLinks">
          <nuxt-link :to="`/${$store.state.language}/media-center/news`">Назад к списку</nuxt-link>
        </div>
      </div>
      <div class="w-33">
        <hot-links-component />
      </div>
    </section>
  </main>
</template>

<script>
  import axios from '~/plugins/axios'
  import HotLinksComponent from '~/components/Site/HotLinks.vue'
  export default {
    layout: 'site_service_template',
    head: {
      title: 'Some Title'
    },
    components: {
      HotLinksComponent
    },
    data: function () {
      return {
        article: {},
        articleGallery: [],
        articleModel: {},
        articleModal: false,
        articleAlert: false,
        articleAlertType: '',
        articleAlertText: '',
        articleTypes: [
          'News', 'Press release'
        ],
        thumbnail: false,
        thumbnailFile: '',
        thumbnailSource: '',
        editorOptions: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['link'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              ['code-block']
            ]
          }
        },
        content: ''
      }
    },
    methods: {
      onThumbnailChange: function (e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        this.createThumbnail(files[0])
      },
      createThumbnail: function (file) {
        let self = this
        self.thumbnail = true
        let reader = new FileReader()
        reader.onload = (e) => {
          self.thumbnailSource = self.thumbnailFile = e.target.result
        }
        reader.readAsDataURL(file)
      },
      removeThumbnail: function () {
        let self = this
        self.thumbnail = false
        self.thumbnailSource = ''
        self.thumbnailFile = null
      },
      saveArticle: function (article) {
        let self = this
        if ((self.thumbnailFile !== null) && (self.thumbnailFile !== undefined)) {
          let formData = new FormData()
          formData.append('language', 'ru')
          formData.append('image', self.thumbnailFile)
          formData.append('Title', article.Title)
          formData.append('Description', article.Description)
          formData.append('Text', article.Text)
          formData.append('Date', article.Date)
          formData.append('Type', article.Type)
          formData.append('alias', article.alias)
          formData.append('id', article.id)
          formData.append('order', article.order)
          axios({
            method: 'put',
            url: '/api/services/article',
            data: formData
          }).then((response) => {
            console.log(response)
            self.fetchData()
            self.articleModal = false
          }).catch((error) => {
            console.log(error)
          })
        } else {
          /* self.articleAlert = true
          self.articleAlertType = 'danger'
          self.articleAlertText = 'Please insert image in article!' */
          let formData = {
            language: 'ru',
            Title: article.Title,
            Description: article.Description,
            Text: article.Text,
            Date: article.Date,
            Type: article.Type,
            alias: article.alias,
            id: article.id,
            order: article.order
          }
          axios({
            method: 'put',
            url: '/api/services/article',
            data: formData
          }).then((response) => {
            console.log(response)
            self.fetchData()
            self.articleModal = false
          }).catch((error) => {
            console.log(error)
          })
        }
      },
      fetchData: function () {
        if (process.browser) {
          var path = window.location.pathname
          let self = this
          axios({
            method: 'get',
            url: '/api/services/article',
            params: {
              language: 'ru',
              alias: path
            }
          }).then((response) => {
            self.article = response.data.data[0]
            let date = new Date(self.article.Date)
            self.article.Date = date.toLocaleDateString('ru-RU')
            if (self.article.Thumbnail) {
              self.thumbnail = true
              self.thumbnailSource = `/images/news/${self.article.Thumbnail}`
              self.thumbnailFile = null
            }
            self.articleModel = self.article
            self.articleGallery = response.data.gallery
          }, (error) => {
            console.log(error)
          })
        }
      }
    },
    created: function () {
      let self = this
      self.fetchData()
    }
  }
</script>

<style>
  .article {
    padding: 20px 20px 0 0;
  }
  .articleThumbnail {
    margin-bottom: 20px;
  }
  .articleDate {
    font-weight: 300;
  }
  .articleType {
    text-align: right;
    font-weight: 300;
  }
  .article .d-modal {
    left: 0;
    width: 100%;
  }
  .article .d-modal .modal {
    z-index: 9999;
  }
  #input-article-text-group {
    min-height: 160px;
  }
  .quill-editor
  {
    display: block;
    height: 100%;
    overflow-y: auto;
    text-overflow: clip;
  }
</style>