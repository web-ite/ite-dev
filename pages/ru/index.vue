<template>
  <main class="mainSection container">
    <div class="textBlock" v-bind:class="{ 'd-relative': $store.state.admin }">
      <div v-html="content"></div>
      <div v-if="$store.state.admin" class="d-modal">
        <button class="btn btn-primary btn-edit-mode" @click="textBlockModal = true">Edit</button>
        <b-modal v-model="textBlockModal" hide-header-close title="Edit page text content">
          <div class="quill-editor" 
               :content="content"
               v-quill:myQuillEditor="editorOption">
          </div>
          <template slot="modal-footer">
            <b-button @click="saveTextBlock" variant="primary">Save</b-button>
          </template>
        </b-modal>
      </div>
      
    </div>
  </main>
</template>

<script>
import axios from '~/plugins/axios'
export default {
  layout: 'site_first_level',
  head () {
    return {
      title: 'Главная страница'
    }
  },
  data: function () {
    return {
      content: {},
      textBlockModal: false,
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
    saveTextBlock: function () {
      let self = this
      axios({
        method: 'post',
        url: '/api/page/content',
        data: {
          pageId: 1,
          language: 'ru',
          data: self.content
        }
      }).then((response) => {
        console.log(response)
        self.fetchData()
        self.textBlockModal = false
      }, (error) => {
        console.log(error)
      })
    },
    fetchData: function () {
      let self = this
      axios({
        method: 'get',
        url: '/api/page/content',
        params: {
          pageId: 1,
          language: 'ru'
        }
      }).then((response) => {
        console.log(response)
        self.content = response.data.data
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

<style>
  .quill-editor
  {
    display: block;
    min-height: 200px;
    overflow-y: auto;
  }
</style>