<template>
  <main class="mainSection">
    <div class="page-header siteSection__page-header">
      Новости
    </div>
    <section class="layer container">
      <div class="w-66">
        <div class="serviceContainer" v-bind:class="{ 'd-relative': $store.state.admin }">
          <div class="articleBlock" v-for="article in articles" :key="article.id">
            <div class="articleThumbnailBlock" v-if="article.Thumbnail">
              <img :src="`/images/news/${article.Thumbnail}`" class="articleThumbnail">
            </div>
            <div class="articleTextBlock">
              <div class="articleInfoBlock">
                <span class="articleDate">{{ article.Date }}</span>
                <span class="articleType">{{ article.Type }}</span>
              </div>
              <h4 class="articleTitle">
                <nuxt-link :to="`news/${article.id}`">{{ article.Title }}</nuxt-link>
              </h4>
              <p class="articleText" v-html="article.Description"></p>
            </div>
          </div>
          
          <div v-if="$store.state.admin" class="d-modal">
            <button class="btn btn-primary btn-edit-mode" @click="articlesModal = true">Edit</button>
            <b-modal v-model="articlesModal" hide-header-close title="News articles">
              <div class="p-3 bg-info text-white header-title">
                <div class="header-left">
                  Articles
                </div>
                <div class="header-right">
                  <i class="fa fa-plus" @click="addArticle"></i>
                </div>
              </div>
              <b-card no-body v-for="article in articles" :key="article.Date" class="mb-2">
                <div class="p-3 bg-info text-white header-title">
                  <div class="header-left">
                    {{ article.Title }}
                  </div>
                  <div class="header-right">
                    <i class="fa fa-edit" @click="editArticle(article)"></i>
                  </div>
                </div>
              </b-card>
              
              <template slot="modal-footer">
              </template>
            </b-modal>
            
            <b-modal ref="articleModelModal" hide-header-close :title="articleModel.Title">
              <b-alert :show="articleAlert" :variant="articleAlertType">{{ articleAlertText }}</b-alert>
              <b-row>
                <b-col cols="12">
                  <div class="dropbox">
                    <b-form-file v-show="articleModel.isInitial" id="input-thumbnail" v-model="articleModel.Thumbnail" @change="articleModel__onThumbnailChange"></b-form-file>
                    <p v-if="articleModel.isInitial">Drag your file(s) here to begin or click to browse</p>
                    <img v-if="!articleModel.isInitial && articleModel.mode == 'add'" :src="articleModel.ThumbnailPreview" class="logotype-preview"/>
                    <img v-if="!articleModel.isInitial && articleModel.Thumbnail ==='' && articleModel.mode == 'edit'" :src="`/images/news/${articleModel.ThumbnailPreview}`" class="logotype-preview"/>
                    <img v-if="!articleModel.isInitial && articleModel.Thumbnail !=='' && articleModel.mode == 'edit'" :src="articleModel.ThumbnailPreview" class="logotype-preview"/>
                    <a v-if="!articleModel.isInitial" @click="articleModel__removeThumbnail" class="remove-btn"><i class="fa fa-trash"></i></a>
                  </div>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12">
                  <b-form-group id="input-article-title-group" label="Article title:" label-for="input-article-title">
                    <b-form-input id="input-article-title" type="text" v-model="articleModel.Title"></b-form-input>
                  </b-form-group>
                  <b-form-group id="input-article-description" label="Article description:" label-for="input-article-description">
                    <b-form-textarea id="input-article-description" rows="3" v-model="articleModel.Description"></b-form-textarea>
                  </b-form-group>
                  <b-form-group id="input-article-text-group" label="Article text:" label-for="input-article-text">
                    <!--<div class="quill-editor" v-model="articleModel.Text" v-quill:myQuillEditor="editorOption"></div>-->
                  </b-form-group>
                  <b-form-group id="input-article-date-group" label="Article date:" label-for="input-article-date">
                    <b-form-input id="input-article-date" type="date" v-model="articleModel.date"></b-form-input>
                  </b-form-group>
                  <b-form-group id="input-article-type-group" label="Article type:" label-for="input-article-type">
                     <b-form-select v-model="articleModel.Type" :options="articleTypes" class="mb-3"></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12">
                  <div class="dropbox">
                    <b-form-file v-show="articleModel.isInitial" id="input-thumbnail" multiple v-model="articleModel.Thumbnail" @change="articleModel__onThumbnailChange"></b-form-file>
                  </div>
                </b-col>
              </b-row>
              <template slot="modal-footer">
                <b-button @click="articleModel__save(articleModel)" variant="primary">{{ articleModel.action }}</b-button>
              </template>
            </b-modal>
          </div>
          
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
      title: 'Sport World Moscow - International Moscow Exhibition - News'
    },
    components: {
      HotLinksComponent
    },
    data: function () {
      return {
        articles: [],
        articlesModal: false,
        articleTypes: [
          'News', 'Press release'
        ],
        articleModel: {},
        articleAlert: false,
        articleAlertType: '',
        articleAlertText: '',
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              ['link', 'image'],
              [{'list': 'ordered'}, {'list': 'bullet'}]
            ]
          }
        }
      }
    },
    methods: {
      addArticle: function () {
        let self = this
        self.$refs.articleModelModal.show()
        self.articleModel = {
          mode: 'add',
          title: 'Add new article',
          isInitial: true,
          Thumbnail: '',
          ThumbnailPreview: '',
          Title: '',
          Description: '',
          Text: '',
          Date: '',
          Type: '',
          order: '0',
          action: 'Add'
        }
      },
      editArticle: function (article) {
        let self = this
        self.$refs.articleModelModal.show()
        self.articleModel = {
          mode: 'edit',
          title: 'Edit article',
          isInitial: false,
          id: article.id,
          Thumbnail: '',
          ThumbnailPreview: article.Thumbnail === '' ? '' : article.Thumbnail,
          Title: article.Title,
          Description: article.Description,
          Text: article.Text,
          Date: article.Date,
          Type: article.Type,
          order: article.order,
          action: 'Save'
        }
      },
      articleModel__onThumbnailChange: function (e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        this.articleModel__createThumbnail(files[0])
      },
      articleModel__createThumbnail: function (file) {
        let self = this
        let reader = new FileReader()
        self.articleModel.isInitial = false
        reader.onload = (e) => {
          self.articleModel.ThumbnailPreview = e.target.result
        }
        reader.readAsDataURL(file)
      },
      articleModel__removeThumbnail: function () {
        let self = this
        self.articleModel.Thumbnail = ''
        self.articleModel.ThumbnailPreview = ''
        self.articleModel.isInitial = true
      },
      articleModel__save: function (article) {
        let self = this
        if (((article.ThumbnailPreview !== null) && (article.ThumbnailPreview !== undefined)) || ((article.Thumbnail !== null) && (article.Thumbnail !== undefined))) {
          let formData
          if ((article.Thumbnail !== null) && (article.Thumbnail !== undefined)) {
            formData = new FormData()
            formData.append('image', article.Thumbnail)
            formData.append('Title', article.Title)
            formData.append('Description', article.Description)
            formData.append('Text', article.Text)
            formData.append('Date', article.Date)
            formData.append('Type', article.Type)
            if (article.mode === 'edit') {
              formData.append('id', article.id)
              formData.append('order', article.order)
            }
          } else {
            console.log('Article thumbnail already set')
            formData = {
              Title: article.Title,
              Description: article.Description,
              Text: article.Text,
              Date: article.Date,
              Type: article.Type
            }
            if (article.mode === 'edit') {
              formData.id = article.id
              formData.order = article.order
            }
          }
          // console.log(formData)
          if (article.mode === 'add') {
            axios({
              method: 'post',
              url: '/api/services/articles',
              data: formData
            }).then((response) => {
              console.log(response)
              self.fetchData()
              self.$refs.articleModelModal.hide()
            }).catch((error) => {
              console.log(error)
            })
          } else if (article.mode === 'edit') {
            console.log(formData)
            axios({
              method: 'put',
              url: '/api/services/article',
              data: formData
            }).then((response) => {
              console.log(response)
              self.fetchData()
              self.$refs.articleModelModal.hide()
            }).catch((error) => {
              console.log(error)
            })
          }
        } else {
          self.articleAlert = true
          self.articleAlertType = 'danger'
          self.articleAlertText = 'Please insert image in article!'
        }
      },
      fetchData: function () {
        let self = this
        axios({
          method: 'get',
          url: '/api/services/articles',
          params: {
            language: 'ru'
          }
        }).then((response) => {
          console.log(response)
          let articles = response.data.data
          for (let i = 0; i < articles.length; i++) {
            console.log(articles[i].Date)
            let date = new Date(articles[i].Date)
            articles[i].Date = date.toLocaleDateString('ru-RU')
            console.log(articles[i].Date)
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

  .serviceContainer {
    padding-right: 20px;
  }
  .serviceContainer.d-relative .d-modal {
    width: 100%;
    left: 0;
  }
  .articleBlock {
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px dashed #aaa;
    display: flex;
    flex-direction: row;
  }
  .articleThumbnailBlock {
    width: 25%;
  }
  .articleTextBlock {
    width: 75%;
  }
  .articleInfoBlock {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  }
  .articleDate {
    width: 50%;
    text-align: left;
    font-size: 12px;
  }
  .articleType {
    width: 50%;
    text-align: right;
  }
  .articleTitle {
    color: $primary-color;
    font-weight: 600;
    font-size: 16px;
  }
  .quill-editor
  {
    display: block;
    min-height: 200px;
    overflow-y: auto;
  }
</style>