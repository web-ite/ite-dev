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
                <nuxt-link :to="`news/${article.alias}`">{{ article.Title }}</nuxt-link>
              </h4>
              <p class="articleText" v-html="article.Description"></p>
            </div>
          </div>
          
          <div v-if="$store.state.admin" class="d-modal">
            <button class="btn btn-primary btn-edit-mode" @click="articlesModal = true">Edit</button>
            <b-modal v-model="articlesModal" hide-header-close title="News articles">
              <div role="tablist">
                <b-card no-body class="mb-2">
                  <div class="p-3 bg-info text-white header-title" role="tab" v-b-toggle.articles>
                    <div class="header-left">
                      News articles
                    </div>
                    <div class="header-right">
                      <i class="fa fa-plus" @click="addArticle"></i>
                    </div>
                  </div>
                  <b-collapse id="articles" visible accordion="articles-accordion" role="tabpanel">
                    <div class="bg-dark text-white header-title exhibitionOrganiser" v-for="article in articles">
                      <div class="header-left">{{ article.Title }}</div>
                      <div class="header-right">
                        <i class="fa fa-arrow-down" @click="changeOrderDown(article)"></i>
                        <i class="fa fa-arrow-up" @click="changeOrderUp(article)"></i>
                        <i class="fa fa-close" @click="deleteArticle(article)"></i>
                      </div>
                    </div>
                  </b-collapse>
                </b-card>
              </div>
              <template slot="modal-footer">
              </template>
            </b-modal>
            
            <b-modal ref="articleModelModal" size="lg" hide-header-close title="Add new article">
              <b-alert :show="articleAlert" :variant="articleAlertType">{{ articleAlertText }}</b-alert>
              
              <b-row>
                <b-col cols="6">
                  <div class="dropbox">
                    <b-form-file v-show="articleModel.isInitial" id="input-thumbnail" v-model="articleModel.Thumbnail" @change="articleModel__onThumbnailChange"></b-form-file>
                    <p v-if="articleModel.isInitial">Drag your file(s) here to begin or click to browse</p>
                    <img v-if="!articleModel.isInitial" :src="articleModel.ThumbnailPreview" class="logotype-preview"/>
                    <a v-if="!articleModel.isInitial" @click="articleModel__removeThumbnail" class="remove-btn"><i class="fa fa-trash"></i></a>
                  </div>
                </b-col>
                <b-col cols="6">
                  <b-form-group id="input-article-title-group" label="Article title:" label-for="input-article-title">
                    <b-form-input id="input-article-title" type="text" v-model="articleModel.Title"></b-form-input>
                  </b-form-group>
                  <b-form-group id="input-article-alias-group" label="Article alias:" label-for="input-article-alias">
                    <b-form-input id="input-article-alias" type="text" v-model="articleModel.alias"></b-form-input>
                  </b-form-group>
                  <b-form-group id="input-article-date-group" label="Article date:" label-for="input-article-date">
                    <b-form-input id="input-article-date" type="datetime-local" v-model="articleModel.Date"></b-form-input>
                  </b-form-group>
                  <b-form-group id="input-article-type-group" label="Article type:" label-for="input-article-type">
                     <b-form-select v-model="articleModel.Type" :options="articleTypes" class="mb-3"></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12">
                  <b-form-group id="input-article-description" label="Article description:" label-for="input-article-description">
                    <b-form-textarea id="input-article-description" rows="3" v-model="articleModel.Description"></b-form-textarea>
                  </b-form-group>
                  <b-form-group id="input-article-text-group" label="Article text:" label-for="input-article-text">
                    <div class="quill-editor" id="input-article-text" :content="articleModel.Text" v-model="content" v-quill:myQuillEditor="editorOptions"></div>
                  </b-form-group>
                  <div class="clearfix"></div>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12">
                 
                </b-col>
              </b-row>
           
              <template slot="modal-footer">
                <b-button @click="saveArticle(articleModel)" variant="primary">Add new</b-button>
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
      title: 'Sport World Moscow - International Moscow Exhibition - News',
      ref: 'nuxt-dropzone/dropzone.css'
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
      addArticle: function () {
        let self = this
        self.$refs.articleModelModal.show()
        self.articleModel = {
          title: 'Add new article',
          isInitial: true,
          Thumbnail: '',
          ThumbnailPreview: '',
          Title: '',
          Description: '',
          Text: '',
          Date: '',
          Type: '',
          Gallery: [],
          alias: '',
          order: '0'
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
      saveArticle: function (article) {
        let self = this
        if ((article.Thumbnail !== null) && (article.Thumbnail !== undefined)) {
          let formData = new FormData()
          if ((article.Gallery) !== null && (article.Gallery !== undefined)) {
            formData.append('language', 'ru')
            formData.append('images', article.Gallery)
            axios({
              method: 'post',
              url: '/api/services/article/gallery',
              data: formData
            }).then((response) => {
              let id = response.data.id
              formData.append('image', article.Thumbnail)
              formData.append('Title', article.Title)
              formData.append('Description', article.Description)
              formData.append('Text', self.content)
              formData.append('Date', article.Date)
              formData.append('Type', article.Type)
              formData.append('Gallery', id)
              formData.append('alias', article.alias)
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
            }, (error) => {
              console.log(error)
            })
          } else {
            formData.append('image', article.Thumbnail)
            formData.append('Title', article.Title)
            formData.append('Description', article.Description)
            formData.append('Text', article.Text)
            formData.append('Date', article.Date)
            formData.append('Type', article.Type)
            formData.append('alias', article.alias)
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
          }
        } else {
          self.articleAlert = true
          self.articleAlertType = 'danger'
          self.articleAlertText = 'Please insert image in article!'
        }
      },
      deleteArticle: function (article) {
        let self = this
        let data = {
          language: 'ru',
          object: article
        }
        axios({
          method: 'delete',
          url: '/api/services/article',
          data: data
        }).then((response) => {
          self.fetchData()
        }, (error) => {
          console.log(error)
        })
      },
      changeOrderUp: function (article) {
        let self = this
        let data = {
          language: 'ru',
          typeOfAction: 'incremention',
          object: article
        }
        console.log(data)
        axios({
          method: 'put',
          url: '/api/services/article/order',
          data: data
        }).then((response) => {
          console.log(response)
          self.fetchData()
        })
      },
      changeOrderDown: function (article) {
        let self = this
        let data = {
          language: 'ru',
          typeOfAction: 'decremention',
          object: article
        }
        console.log(data)
        axios({
          method: 'put',
          url: '/api/services/article/order',
          data: data
        }).then((response) => {
          console.log(response)
          self.fetchData()
        })
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
  #input-article-text-group {
    min-height: 160px;
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
    padding-right: 10px;
  }
  .articleThumbnail {
    max-width: 100%;
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
    height: 100%;
    overflow-y: auto;
    text-overflow: clip;
  }
</style>