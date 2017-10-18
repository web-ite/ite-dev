<template>
  <div class="adminContentSection w-80 d-flex flex-row">
    <div class="pages__column w-30 p-4">
      <div class="row">
        <div class="col-12 col-sm-12">
          <h4 class="page-header">Pages</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-sm-12">
          <sortable-tree :data="structure">
            <template scope="{item}">
              <!--<i class="fa fa-plus-square-o text-info pages__collapseBtn"></i>-->
              <span v-on:click="editPage(item)" class="ml-2 fa fa-pencil text-primary pages__editBtn"></span>
              <span @click="addPage(item)"class="ml-2 fa fa-plus text-success pages__addBtn"></span>
              <span class="pages__title" :title="item.name">{{ item.name }}</span>
            </template>
          </sortable-tree>
        </div>
      </div>
    </div>
    <div v-if="showForm" class="pages__form w-70 p-4">
      <div class="row">
        <div class="col-12 col-sm-12">
          <h4 class="page-header">{{ formTitle }}</h4>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-sm-12">
          <div class="form-horizontal">  
            <div class="form-group row">
              <label class="col-12 col-sm-4" for="input-page-title">Page title</label>
              <div class="col-12 col-sm-8">
                <input type="text" name="input-page-title" class="form-control" v-model="page.name"/>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-12 col-sm-4" for="input-page-template">Page template</label>
              <div class="col-12 col-sm-8">
                <select name="input-page-template" class="form-control" v-model="page.template">
                  <option v-for="template in templates" v-bind:value="template.name">{{ template.name }}</option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-12 col-sm-4" for="input-page-alias">Page alias</label>
              <div class="col-12 col-sm-8">
                <input type="text" name="input-page-alias" class="form-control" v-model="page.alias"/>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-12 col-sm-4" for="input-page-meta-description">Page meta description</label>
              <div class="col-12 col-sm-8">
                <textarea name="input-page-meta-description" class="form-control" rows="5" v-model="page.mdescription"></textarea>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-12 col-sm-4" for="input-page-meta-description">Page meta keywords</label>
              <div class="col-12 col-sm-8">
                <textarea name="input-page-meta-keywords" class="form-control" rows="3" v-model="page.mkeywords"></textarea>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-12 col-sm-4" for="input-page-order">Page order</label>
              <div class="col-12 col-sm-8">
                <input type="number" name="input-page-order" class="form-control" v-model="page.order"/>
              </div>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input class="form-check-input" type="checkbox" value="">
                Hide page
              </label>
            </div>
            <div class="form-buttons">
              <button v-if="formAddMode" @click="createPage(page)" class="btn btn-primary float-right">Create page</button> 
              <button v-if="formEditMode" @click="savePage(page)" class="btn btn-primary float-right">Save page</button> 
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import SortableTree from 'vue-sortable-tree'

export default {
  layout: 'admin_dashboard',
  head () {
    return {
      title: 'Files'
    }
  },
  components: {
    SortableTree: SortableTree
  },
  data: function () {
    return {
      showForm: false,
      formEditMode: false,
      formAddMode: false,
      formTitle: '',
      page: {},
      parentPage: {},
      structure: {},
      templates: {}
    }
  },
  methods: {
    fetchTemplatesData: function () {
      let self = this
      return axios.get('/api/templates').then(response => {
        self.templates = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    fetchPagesData: function () {
      let self = this
      return axios.get('/api/pages').then(response => {
        self.structure = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    editPage: function (page) {
      let self = this
      self.showForm = true
      self.formTitle = 'Edit page'
      self.formAddMode = false
      self.formEditMode = true
      self.page = page
    },
    addPage: function (page) {
      let self = this
      self.showForm = true
      self.formTitle = 'Create page'
      self.formEditMode = false
      self.formAddMode = true
      self.page = {}
      self.parentPage = page
    },
    savePage: function (page) {
      let self = this
      let data = {
        structure: self.structure,
        page: page
      }
      self.showForm = false
      self.formEditMode = false
      self.formTitle = ''
      axios({
        method: 'put',
        url: '/api/pages',
        data: data
      }).then(response => {
        if (response.data.status === 200) {
          console.log('Success')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    createPage: function (page) {
      let self = this
      page.filePath = page.alias + '.vue'
      page.parent = self.parentPage.id
      self.parentPage.children.push(page)
      let data = {
        structure: self.structure,
        page: page
      }
      self.showForm = false
      self.formAddMode = false
      self.formTitle = ''
      axios({
        method: 'post',
        url: '/api/pages',
        data: data
      }).then(response => {
        if (response.data.status === 200) {
          console.log(response)
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created: function () {
    this.fetchTemplatesData()
    this.fetchPagesData()
  }
}
</script>

<style scoped>
  .pages__column
  {
    border-right: 1px solid #e2e2e2;
  }
  .blank-li .pages__collapseBtn
  {
    display: none;
  }
  .pages__collapseBtn
  {
    padding-top: 7px;
    background: #fff;
    position: absolute;
    z-index: 1;
    font-weight: 900;
  }
  .pages__title
  {
    margin-left: 10px;  
    white-space: nowrap;
  }
  .pages__editBtn,
  .pages__addBtn
  {
    display: inline;
    cursor: pointer;
  }
</style>