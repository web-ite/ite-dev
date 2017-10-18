<template>
  <header class="headerSection">
    <button class="btn btn-secondary btn-edit-global" @click="admin = !admin"><i class="fa fa-edit"></i></button>
    <div class="container">
      <div class="siteSwitchSection btn-group">
        <a href="#" class="siteSwitchSection__btn siteSwitchSection__btn-blue">Sport World Krasnodar</a>
        <a href="#" class="siteSwitchSection__btn siteSwitchSection__btn-red">Sport World St. Petersburg</a>
        <a href="#" class="siteSwitchSection__btn siteSwitchSection__btn-green">Sport World Novosibirsk</a>
      </div>
      <div class="languageSwitchSection">
        <ul class="list-inline">
          <li class="list-inline-item">
            <a href="#"><img src="~/static/images/en-GB.png"> English</a>
          </li>
          <li class="list-inline-item">
            <a href="#"><img src="~/static/images/ru-RU.png"> Русский</a>
          </li>
        </ul>
      </div>
      <div class="exhibitionInfoSection row">
        <div class="col-12 col-sm-4 d-flex align-items-center" v-bind:class="{ 'd-relative': admin }">
          <logo-component />
          <div v-if="admin" class="d-modal">
            <button class="btn btn-primary btn-edit-mode" @click="headerExhibitionLogotype = true">Edit</button>
            <b-modal hide-header-close v-model="headerExhibitionLogotype" title="Edit exhibition logotype">
              <b-alert :variant="headerExhibitionLogotypeAlertType" show>{{ headerExhibitionLogotypeAlertText }}</b-alert>
              <b-row>
                <b-col cols="12" sm="6">
                  <img class="exhibitionLogotype img-fluid" :src="`/images/${ logotype }`">
                </b-col>
                <b-col cols="12" sm="6">
                  <b-form-file id="input-exhibition-logotype" v-model="newLogotype" choose-label="Choose"></b-form-file>
                </b-col>
              </b-row>
              <template slot="modal-footer">
                <b-button @click="saveExhibitionLogotype" variant="primary">Submit</b-button>
                <b-button @click="headerExhibitionLogotype = false" variant="secondary">Cancel</b-button>
              </template>
            </b-modal>
          </div>
        </div>
        <div class="col-12 col-sm-8" v-bind:class="{ 'd-relative': admin }">
          <exhibition-title-component />
          <exhibition-date-venue-component />
          <div v-if="admin" class="d-modal">
            <button class="btn btn-primary btn-edit-mode" @click="headerExhibitionText = true">Edit</button>
            <b-modal hide-header-close v-model="headerExhibitionText" title="Edit exhibition text information">
              <b-alert :variant="headerExhibitionTextAlertType" show>{{ headerExhibitionTextAlertText }}</b-alert>
              <b-form-group id="inputTitleGroup" label="Exhibition Title:" label-for="input-exhibition-title">
                <b-form-textarea id="input-exhibition-title" v-model="title" :rows="2" :max-rows="2" required></b-form-textarea>
              </b-form-group>
              <b-form-group id="inputDateGroup" label="Exhibition Date:" label-for="input-exhibition-date">
                <b-form-textarea id="input-exhibition-date" v-model="date" :rows="2" :max-rows="2" required></b-form-textarea>
              </b-form-group>
              <b-form-group id="inputVenueGroup" label="Exhibition Venue:" label-for="input-exhibition-venue">
                <b-form-textarea id="input-exhibition-venue" v-model="venue" :rows="2" :max-rows="2" required></b-form-textarea>
              </b-form-group>
              <template slot="modal-footer">
                <b-button @click="saveExhibitionText" variant="primary">Submit</b-button>
                <b-button @click="headerExhibitionText = false" variant="secondary">Cancel</b-button>
              </template>
            </b-modal>
          </div>
        </div>
      </div>
      <primary-navigation-component />
    </div>
  </header>
</template>

<script>
  import axios from '~/plugins/axios'
  import LogoComponent from '~/components/Site/Exhibition/Logo.vue'
  import ExhibitionTitleComponent from '~/components/Site/Exhibition/ExhibitionTitle.vue'
  import ExhibitionDateVenueComponent from '~/components/Site/Exhibition/ExhibitionDateVenue.vue'
  import PrimaryNavigationComponent from '~/components/Site/PrimaryNavigation.vue'
  
  export default {
    components: {
      LogoComponent,
      ExhibitionTitleComponent,
      ExhibitionDateVenueComponent,
      PrimaryNavigationComponent
    },
    data: function () {
      return {
        admin: true,
        logotype: '',
        newLogotype: '',
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
          self.headerExhibitionTextAlertType = 'success'
          self.headerExhibitionTextAlertText = 'All data was saved'
          console.log(response)
          setTimeout(() => {
            self.$refs.modalTitleDateVenue.hide()
            location.reload()
          }, 700)
        }).catch((error) => {
          self.headerExhibitionTextAlertType = 'danger'
          self.headerExhibitionTextAlertText = 'Data was not saved. See error in console.'
          console.log(error)
        })
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
        }).catch((error) => {
          console.log(error)
          self.headerExhibitionLogotypeAlertType = 'danger'
          self.headerExhibitionLogotypeAlertText = 'Error. Logotype was not uploaded'
        })
      },
      fetchData: function () {
        let self = this
        axios({
          method: 'get',
          url: '/api/content/header'
        }).then((response) => {
          self.title = response.data.title
          self.date = response.data.date
          self.venue = response.data.venue
        })
        axios({
          method: 'get',
          url: '/api/content/header/logotype'
        }).then((response) => {
          self.logotype = response.data
        })
      },
      /* Need to rewrite after authorization */
      getCookies: function () {
        let self = this
        self.admin = true
        if (self.admin) {
          self.fetchData()
        }
      }
    },
    created: function () {
      let self = this
      self.getCookies()
    }
  }
</script>

<style>
  .siteSwitchSection
  {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .siteSwitchSection__btn
  {
    padding: .5rem .75rem;
    color: #fff;
    text-align: center;
    font-size: 18px;
  }
  .siteSwitchSection__btn:hover,
  .siteSwitchSection__btn:focus
  {
    color: #fff;
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
  .languageSwitchSection
  {
    padding: .5rem 0;
    text-align: right;
    border-bottom: 4px solid #349b1d;
    margin-bottom: 20px;
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