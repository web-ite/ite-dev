<template>
  <header class="headerSection">
    <div class="edit-section">
      <button class="btn btn-edit-global" 
              @click="$store.commit('adminMode')" 
              v-bind:class="{ 'btn-primary': $store.state.admin, 'btn-warning': !$store.state.admin }">
        <i class="fa fa-edit"></i>
      </button>
      <a href="/admin" class="btn btn-warning btn-edit-global">
        <i class="fa fa-user"></i>
      </a>
    </div>
    <div class="container">
      <!--<div class="siteSwitchSection btn-group">
        <nuxt-link to="/ru" class="siteSwitchSection__btn siteSwitchSection__btn-blue">Sport World Krasnodar</nuxt-link>
        <nuxt-link to="/ru" class="siteSwitchSection__btn siteSwitchSection__btn-red">Sport World St. Petersburg</nuxt-link>
        <nuxt-link to="/ru" class="siteSwitchSection__btn siteSwitchSection__btn-green">Sport World Novosibirsk</nuxt-link>
      </div>-->
      <div class="languageSwitchSection">
        <ul class="list-inline">
          <li class="list-inline-item" v-for="language in languages">
            <a class="language-switcher" :href="`/${language.code}`"> {{ language.name }}</a>
          </li>
        </ul>
      </div>
      <div class="exhibitionInfoSection">
        <div class="row">
          <div class="col-12 col-sm-4 d-flex align-items-center" v-bind:class="{ 'd-relative': $store.state.admin }">
            <!-- Exhibition logotype -->
            <a :href="`/`">
              <img class="exhibitionLogotype" :src="`/${logotype}`" />
            </a>
            <!-- Logotype editor -->
            <div v-if="$store.state.admin" class="d-modal">
              <button class="btn btn-primary btn-edit-mode" @click="headerExhibitionLogotype = true">Edit</button>
              <b-modal ref="headerExhibitionLogotypeRef" hide-header-close v-model="headerExhibitionLogotype" title="Edit exhibition logotype" @hidden="restoreExhibitionLogotypeModalState">
                <b-alert :variant="headerExhibitionLogotypeAlertType" show>{{ headerExhibitionLogotypeAlertText }}</b-alert>
                <b-row>
                  <b-col cols="12">
                    <div class="dropbox">
                      <b-form-file v-show="isInitial" id="inputNewLogotype" v-model="newLogotype" @change="onNewLogotypeChange"></b-form-file>
                      <p v-if="isInitial">Drag your file(s) here to begin or click to browse</p>
                      <img v-if="!isInitial" :src="newLogotypePreview" class="logotype-preview"/>
                      <a v-if="!isInitial" @click="removeNewLogotype" class="remove-btn"><i class="fa fa-trash"></i></a>
                    </div>
                  </b-col>
                </b-row>
                <template slot="modal-footer">
                  <b-button @click="saveExhibitionLogotype" variant="primary">Submit</b-button>
                </template>
              </b-modal>
            </div>
            <!-- End of logotype editor-->
          </div>
          <div class="col-12 col-sm-8" v-bind:class="{ 'd-relative': $store.state.admin }">
            <!-- Exhibition title -->
            <p class="exhibitionTitle text-center text-sm-left primary-text">{{ title }}</p>
            <!-- Exhibition date and venue -->
            <div class="exhibitionDateVenue text-center text-sm-left">
              <span class="exhibitionDateVenue__date secondary-text">{{ date }}</span>
              <span class="pl-3 pr-3">•</span>
              <span class="exhibitionDateVenue__venue">{{ venue }}</span>
            </div>
            <!-- Title, date and venue editor -->
            <div v-if="$store.state.admin" class="d-modal">
              <button class="btn btn-primary btn-edit-mode" :class="{ 'active': headerExhibitionText === true }" @click="headerExhibitionText = true">Edit</button>
              <b-modal ref="headerExhibitionTextRef" hide-header-close v-model="headerExhibitionText" title="Edit exhibition text information" @hidden="restoreExhibitionTextModalState">
                <b-alert :variant="headerExhibitionTextAlertType" show>{{ headerExhibitionTextAlertText }}</b-alert>
                <b-form-group id="inputTitleGroup" label="Exhibition Title:" label-for="input-exhibition-title">
                  <b-form-textarea id="input-exhibition-title" v-model="title" :rows="3" :max-rows="3" required></b-form-textarea>
                </b-form-group>
                <b-form-group id="inputDateGroup" label="Exhibition Date:" label-for="input-exhibition-date">
                  <b-form-textarea id="input-exhibition-date" v-model="date" :rows="2" :max-rows="2" required></b-form-textarea>
                </b-form-group>
                <b-form-group id="inputVenueGroup" label="Exhibition Venue:" label-for="input-exhibition-venue">
                  <b-form-textarea id="input-exhibition-venue" v-model="venue" :rows="3" :max-rows="3" required></b-form-textarea>
                </b-form-group>
                <template slot="modal-footer">
                  <b-button @click="saveExhibitionText" variant="primary">Submit</b-button>
                </template>
              </b-modal>
            </div>
            <!-- End of title, date and venue editor -->
          </div>
        </div>
      </div>
      <div class="primaryNavigationSection">
        <primary-navigation-component />
      </div>
    </div>
  </header>
</template>

<script>
  import axios from '~/plugins/axios'
  import PrimaryNavigationComponent from '~/components/Site/PrimaryNavigation.vue'
  
  export default {
    components: {
      PrimaryNavigationComponent
    },
    data: function () {
      return {
        languages: [],
        logotype: '',
        newLogotype: '',
        newLogotypePreview: '',
        isInitial: true,
        title: '',
        date: '',
        venue: '',
        headerExhibitionLogotype: false,
        headerExhibitionLogotypeAlertType: 'info',
        headerExhibitionLogotypeAlertText: 'Choose image 270x90 px',
        headerExhibitionText: false,
        headerExhibitionTextAlertType: 'info',
        headerExhibitionTextAlertText: 'Fill all fields'
      }
    },
    methods: {
      saveExhibitionText: function () {
        let self = this
        let header = {
          title: self.title,
          date: self.date,
          venue: self.venue
        }
        axios({
          method: 'post',
          url: '/api/content/header',
          data: header
        }).then((response) => {
          console.log(response)
          self.headerExhibitionTextAlertType = 'success'
          self.headerExhibitionTextAlertText = 'All data was saved'
          self.$refs.headerExhibitionTextRef.hide()
        }).catch((error) => {
          console.log(error)
          self.headerExhibitionTextAlertType = 'danger'
          self.headerExhibitionTextAlertText = 'Data was not saved. See error in console.'
        })
      },
      restoreExhibitionTextModalState: function () {
        let self = this
        self.fetchTextData()
        self.headerExhibitionText = false
        self.headerExhibitionTextAlertType = 'info'
        self.headerExhibitionTextAlertText = 'Fill all fields'
      },
      onNewLogotypeChange: function (e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        this.createNewLogotypePreview(files[0])
      },
      createNewLogotypePreview: function (file) {
        let reader = new FileReader()
        let self = this
        self.isInitial = false
        reader.onload = (e) => {
          self.newLogotypePreview = e.target.result
        }
        reader.readAsDataURL(file)
      },
      removeNewLogotype: function (e) {
        let self = this
        self.newLogotypePreview = ''
        self.newLogotype = ''
        self.isInitial = true
        self.headerExhibitionLogotypeAlertType = 'info'
        self.headerExhibitionLogotypeAlertText = 'Choose image 270x90 px'
      },
      saveExhibitionLogotype: function (e) {
        let self = this
        if (!self.newLogotype) {
          self.headerExhibitionLogotypeAlertType = 'warning'
          self.headerExhibitionLogotypeAlertText = 'Please select file before upload'
          return
        }
        let data = new FormData()
        data.append('image', self.newLogotype)
        axios({
          method: 'post',
          url: '/api/content/header/logotype',
          data: data,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((response) => {
          console.log(response)
          self.headerExhibitionLogotypeAlertType = 'success'
          self.headerExhibitionLogotypeAlertText = 'Logotype was uploaded'
          self.logotype = self.newLogotypePreview
          self.$refs.headerExhibitionLogotypeRef.hide()
        }).catch((error) => {
          console.log(error)
          self.headerExhibitionLogotypeAlertType = 'danger'
          self.headerExhibitionLogotypeAlertText = 'Error. Logotype was not uploaded'
        })
      },
      restoreExhibitionLogotypeModalState: function () {
        let self = this
        self.newLogotypePreview = ''
        self.newLogotype = ''
        self.isInitial = true
        self.headerExhibitionLogotype = false
        self.headerExhibitionLogotypeAlertType = 'info'
        self.headerExhibitionLogotypeAlertText = 'Choose image 270x90 px'
      },
      fetchTextData: function () {
        let self = this
        axios({
          method: 'get',
          url: '/api/content/header'
        }).then((response) => {
          self.title = response.data.title
          self.date = response.data.date
          self.venue = response.data.venue
        })
      },
      fetchLogotypeData: function () {
        let self = this
        axios({
          method: 'get',
          url: '/api/content/header/logotype'
        }).then((response) => {
          self.logotype = 'images/' + response.data
        })
      },
      fetchLanguagesData: function () {
        let self = this
        axios.get('/api/site/languages').then(response => {
          self.languages = response.data
        })
      }
    },
    created: function () {
      let self = this
      self.fetchLanguagesData()
      self.fetchTextData()
      self.fetchLogotypeData()
    }
  }
</script>

<style lang="scss">
  @import "assets/css/colors.scss";
  @import "assets/css/main.scss";
  .headerSection
  {
    margin-bottom: 20px;
  } 
  /* Site switcher */
  .siteSwitchSection
  {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .siteSwitchSection__btn
  {
    padding: 8px 16px;
    color: #fff;
    text-align: center;
    font-size: 18px;
  }    
  .siteSwitchSection__btn:hover,
  .siteSwitchSection__btn:focus,
  .siteSwitchSection__btn:visited
  {
    color: #fff;
    text-decoration: none;
  }
  .siteSwitchSection__btn-blue
  {
    background-color: #00a7e7;
  }
  .siteSwitchSection__btn-red
  {
    background-color: #bc1833;
  }
  .siteSwitchSection__btn-green
  {
    background-color: #009b8f;
  }
  /* Language switcher */
  .languageSwitchSection
  {
    padding-top: 4px;
    padding-bottom: 4px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    border-bottom: 4px solid $primary-color;
    margin-bottom: 20px;
  }
  .language-switcher
  {
    color: $text-color;
  }
  /* Site header */
  .exhibitionInfoSection
  {
    margin-bottom: 20px;
  }
  .exhibitionTitle
  {
    font-size: 20px;
    color: $primary-color;
  }
  .exhibitionDateVenue__date
  {
    font-size: 16px;
    color: $secondary-color;
  }
  .exhibitionDateVenue__venue
  {
    font-size: 16px;
  }
  @media(max-width: 456px)
  {
    .siteSwitchSection__btn
    {
      width: 100%;
    }
  }
  @media(min-width: 457px)
  {
    .siteSwitchSection__btn
    {
      width: 33.333333%;
    }
  }
</style>