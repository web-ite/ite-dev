<template>
  <div class="adminContentSection w-80 p-4">
    <div class="row w-100">
      <div class="col-12">
        <h4 class="page-header">Color Settings</h4>
      </div>
    </div>
    <form class="form-horizontal w-100" @submit="saveColors(color)">
      <div class="form-group row">
        <label class="col-12 col-sm-4" for="input-main-color">Main color:</label>
        <div class="col-12 col-sm-8">
          <input type="text" name="input-main-color" class="form-control" v-model="color.main" required/>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-12 col-sm-4" for="input-secondary-color">Secondary color:</label>
        <div class="col-12 col-sm-8">
          <input type="text" name="input-secondary-color" class="form-control" v-model="color.secondary" required/>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-12 col-sm-4" for="input-third-color">Third color:</label>
        <div class="col-12 col-sm-8">
          <input type="text" name="input-third-color" class="form-control" v-model="color.third" required/>
        </div>
      </div>
      <div class="form-buttons">
        <button type="submit" class="btn btn-primary float-right">Save</button>
      </div>
    </form>
    <div class="row w-100">
      <div class="col-12">
        <h4 class="page-header">Preview</h4>
      </div>
    </div>
    <div class="preview w-100">
      <header>
        <div class="languageSwitchSection" v-bind:style="{ 'border-color': color.main }">
          <ul class="list-inline languageSwitchSection__list">
            <li class="list-inline-item languageSwitchSection__list-item">
              <a href="#">
                <img src="~/static/images/en-GB.png">English
              </a>
            </li>
            <li class="list-inline-item languageSwitchSection__list-item">
              <a href="#">
                <img src="~/static/images/ru-RU.png">Русский
              </a>
            </li>
          </ul>
        </div>
        <div class="exhibitionInfoSection row">
          <div class="col-12 col-sm-4">
            <logo-component />
          </div>
          <div class="col-12 col-sm-8">
            <p class="exhibitionInfoSection__name" v-bind:style="{ color: color.main }">Международная выставка спортивного оборудования, инвентаря, одежды и аксессуаров</p>
            <p class="exhibitionInfoSection__date-venue">
              <span class="exhibitionInfoSection__data" v-bind:style="{ color: color.secondary }">12 января - 24 декабря</span>
              •
              <span class="exhibitionInfoSection__data">Москва, Выставочный центр</span>
            </p>
          </div>
        </div>
        <div class="p-1">
          <h1 class="page-title" v-bind:style="{ 'background-color': color.main }">Page title</h1>
        </div>
        <div class="p-1">
          <h4 class="page-subtitle" v-bind:style="{ color: color.main }">Page subtitle</h4>
        </div>
        <div class="p-1">
          <a href="#" class="btn btn-primary" v-bind:style="{ 'background-color': color.main, 'border-color': color.main }">Primary button</a>
        </div>
        <div class="p-1">
          <a href="#" class="btn btn-secondary" v-bind:style="{ 'background-color': color.secondary, 'border-color': color.secondary }">Secondary button</a>
        </div>
        <div class="p-1">
          <a href="#" class="link" v-bind:style="{ color: color.main }">Link in text</a>
        </div>
      </header>
    </div>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import LogoComponent from '~/components/Site/Exhibition/Logo.vue'

export default {
  layout: 'admin_dashboard',
  head () {
    return {
      title: 'Color Settings'
    }
  },
  components: {
    LogoComponent: LogoComponent
  },
  methods: {
    saveColors: function (color) {
      // Save values to style.json
      axios({
        method: 'post',
        url: '/api/colors',
        data: color
      }).then(response => {
        // Save values to global site.json
        axios({
          method: 'post',
          url: '/api/site/colors',
          data: color
        }).then(response => {
          console.log(response)
        }).catch(error => {
          console.log(error)
        })
      }).catch(error => {
        console.log(error)
      })
    }
  },
  async asyncData () {
    let { data } = await axios.get('/api/colors')
    return { color: data }
  }
}
</script>

<style scoped>
  .preview
  {
    border: 1px solid #e2e2e2;
    padding: 10px;
  }
  .languageSwitchSection
  {
    padding: .5rem 0;
    text-align: right;
    border-bottom-width: 4px;
    border-bottom-style: solid;
    margin-bottom: 20px;
  }
  .languageSwitchSection__list-item:not(:last-child)
  {
    margin-right: 10px;
  }
  .page-title
  {
    font-size: 1.5rem; 
    margin: 0;
    padding: 15px 20px;
    color: #fff;
  }
</style>