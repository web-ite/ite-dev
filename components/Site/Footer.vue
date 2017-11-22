<template>
  <footer class="footerSection">
    <div class="row">
      <div class="col-12">
         <div class="footerSection__topRow footerSection__topRow-flex">
          <div class="footerSection__topColumn" v-for="page in pages" :key="page.id">
            <h6><a :href="`/${page.alias}`">{{ page.name }}</a></h6>
            <ul class="list-unstyled">
        			<li v-for="child in page.children" :key="child.id"><a :href="`/${page.alias}/${child.alias}`">{{ child.name }}</a></li>
            </ul>
          </div>
          <!--<div class="footerSection__topColumn">
            <h6>О выставке</h6>
            <ul class="list-unstyled">
        			<li><a href="/ru-RU/about/sections.aspx" style="">Разделы выставки</a></li>
        			<li><a href="/ru-RU/about/products.aspx">Каталог продукции</a></li>
        			<li><a href="/ru-RU/about/exposition.aspx">Интерактивный план</a></li>
        			<li><a href="/ru-RU/about/exhibitor-list.aspx">Список участников</a></li>
        			<li><a href="/ru-RU/about/venue.aspx" style="">Место проведения</a></li>
        			<li><a href="/ru-RU/about/support/official.aspx" style="">Поддержка</a></li>
        			<li><a href="/ru-RU/about/sponsor/golden.aspx" style="">Спонсоры</a></li>
        			<li><a href="/ru-RU/about/travel.aspx" style="">Организация поездки</a></li>
        			<li><a href="/ru-RU/about/organizer.aspx" style="">Организатор</a></li>
        			<li><a href="/ru-RU/about/contacts.aspx" style="">Контакты</a></li>
        			<li><a href="/ru-RU/about/exhibitions.aspx" style="">Выставки</a></li>
            </ul>
          </div>
          <div class="footerSection__topColumn">
            <h6>О выставке</h6>
            <ul class="list-unstyled">
        			<li><a href="/ru-RU/about/sections.aspx" style="">Разделы выставки</a></li>
        			<li><a href="/ru-RU/about/products.aspx">Каталог продукции</a></li>
        			<li><a href="/ru-RU/about/exposition.aspx">Интерактивный план</a></li>
        			<li><a href="/ru-RU/about/exhibitor-list.aspx">Список участников</a></li>
        			<li><a href="/ru-RU/about/venue.aspx" style="">Место проведения</a></li>
        			<li><a href="/ru-RU/about/support/official.aspx" style="">Поддержка</a></li>
        			<li><a href="/ru-RU/about/sponsor/golden.aspx" style="">Спонсоры</a></li>
        			<li><a href="/ru-RU/about/travel.aspx" style="">Организация поездки</a></li>
        			<li><a href="/ru-RU/about/organizer.aspx" style="">Организатор</a></li>
        			<li><a href="/ru-RU/about/contacts.aspx" style="">Контакты</a></li>
        			<li><a href="/ru-RU/about/exhibitions.aspx" style="">Выставки</a></li>
            </ul>
          </div>
          <div class="footerSection__topColumn">
            <h6>О выставке</h6>
            <ul class="list-unstyled">
        			<li><a href="/ru-RU/about/sections.aspx" style="">Разделы выставки</a></li>
        			<li><a href="/ru-RU/about/products.aspx">Каталог продукции</a></li>
        			<li><a href="/ru-RU/about/exposition.aspx">Интерактивный план</a></li>
        			<li><a href="/ru-RU/about/exhibitor-list.aspx">Список участников</a></li>
        			<li><a href="/ru-RU/about/venue.aspx" style="">Место проведения</a></li>
        			<li><a href="/ru-RU/about/support/official.aspx" style="">Поддержка</a></li>
        			<li><a href="/ru-RU/about/sponsor/golden.aspx" style="">Спонсоры</a></li>
        			<li><a href="/ru-RU/about/travel.aspx" style="">Организация поездки</a></li>
        			<li><a href="/ru-RU/about/organizer.aspx" style="">Организатор</a></li>
        			<li><a href="/ru-RU/about/contacts.aspx" style="">Контакты</a></li>
        			<li><a href="/ru-RU/about/exhibitions.aspx" style="">Выставки</a></li>
            </ul>
          </div>
          <div class="footerSection__topColumn">
            <h6>О выставке</h6>
            <ul class="list-unstyled">
        			<li><a href="/ru-RU/about/sections.aspx" style="">Разделы выставки</a></li>
        			<li><a href="/ru-RU/about/products.aspx">Каталог продукции</a></li>
        			<li><a href="/ru-RU/about/exposition.aspx">Интерактивный план</a></li>
        			<li><a href="/ru-RU/about/exhibitor-list.aspx">Список участников</a></li>
        			<li><a href="/ru-RU/about/venue.aspx" style="">Место проведения</a></li>
        			<li><a href="/ru-RU/about/support/official.aspx" style="">Поддержка</a></li>
        			<li><a href="/ru-RU/about/sponsor/golden.aspx" style="">Спонсоры</a></li>
        			<li><a href="/ru-RU/about/travel.aspx" style="">Организация поездки</a></li>
        			<li><a href="/ru-RU/about/organizer.aspx" style="">Организатор</a></li>
        			<li><a href="/ru-RU/about/contacts.aspx" style="">Контакты</a></li>
        			<li><a href="/ru-RU/about/exhibitions.aspx" style="">Выставки</a></li>
            </ul>
          </div>-->
        </div>
      </div>
    </div>
    <div class="row">
      <div class="footerSection__bottomRow col-12" v-bind:class="{ 'd-relative': $store.state.admin }">
        
        <!-- Footer bottom row organizers -->       
        <div class="footerSection__organisers">
          <div class="organiser" v-for="organiser in organisers" :key="organiser.order">
            <h6>{{ organiser.organiserTitle }}</h6>
            <ul class="list-inline d-flex">
              <li v-if="organiser.companyLogotype" class="list-inline-item">
                <img :src="`/images/footer/${organiser.companyLogotype}`" />
              </li>
              <li class="list-inline-item">
                {{ organiser.companyName }}<br />
                {{ organiser.companyPhone }}<br />
                <a href="#">{{ organiser.companyEmail }}</a><br />
                <a href="#" :title="organiser.companySite">{{ organiser.companySite }}</a>
              </li>
            </ul>
          </div>
        </div>
        
        <!-- Footer bottom row supports -->
        <div class="footerSection__supports">
          <div class="support" v-for="support in supports">
            <h6>При поддержке</h6>
            <a href="http://www.ufi.org/" rel="nofollow" target="_blank">
              <img :src="`/images/footer/${support.companyLogotype}`" />
            </a>
          </div>
        </div>
        <div class="footerSection__social">
          <ul class="list-inline social">
            <li class="list-inline-item">
              <a href="http://www.facebook.com/" target="_blank" rel="nofollow" style="background-image:url('/images/facebook.png');">&nbsp;</a>
            </li>
            <li class="list-inline-item">
              <a href="http://www.linkedin.com/" target="_blank" rel="nofollow" style="background-image:url('/images/linkedin.png');">&nbsp;</a>
            </li>
            <li class="list-inline-item">
              <a href="http://www.vk.com/" target="_blank" rel="nofollow" style="background-image:url('/images/vkontakte.png');">&nbsp;</a>
            </li>
            <li class="list-inline-item">
              <a href="https://twitter.com/" target="_blank" rel="nofollow" style="background-image:url('/images/twitter.png');">&nbsp;</a>
            </li>
            <li class="list-inline-item">
              <a href="https://instagram.com/" target="_blank" rel="nofollow" style="background-image:url('/images/instagram.png')">&nbsp;</a>
            </li>
          </ul>
        </div>
        
        <!-- Footer bottom row editor -->
        <div v-if="$store.state.admin" class="d-modal">
          
          <button class="btn btn-primary btn-edit-mode" @click="footerBottomRowEdit = true">Edit</button>
          
          <b-modal hide-header-close v-model="footerBottomRowEdit" title="Edit footer bootom row">
            <div role="tablist">
              
              <b-card no-body class="mb-2">
                <div class="p-3 bg-info text-white header-title" role="tab" v-b-toggle.exhibitionOrganisers>
                  <div class="header-left">
                    Exhibition organisers
                  </div>
                  <div class="header-right">
                    <i class="fa fa-plus" @click="addOrganiser"></i>
                  </div>
                </div>
                <b-collapse id="exhibitionOrganisers" visible accordion="my-accordion" role="tabpanel">
                    
                    <div class="bg-dark text-white header-title exhibitionOrganiser" v-for="organiser in organisers">
                      <div class="header-left">{{ organiser.organiserTitle }}</div>
                      <div class="header-right">
                        <i class="fa fa-edit" @click="editOrganiser(organiser)"></i>
                        <i class="fa fa-arrow-down" @click="changeOrderDown(organiser)"></i>
                        <i class="fa fa-arrow-up" @click="changeOrderUp(organiser)"></i>
                      </div>
                    </div>
              
                </b-collapse>
              </b-card>
              
              <!--<b-card no-body class="mb-2">
                <b-card-header header-tag="header" class="p-3 bg-info text-white header-title" role="tab" v-b-toggle.exhibitionSupports>
                  <div class="header-left">
                    Exhibition supports
                  </div>
                  <div class="header-right">
                    <i class="fa fa-plus"></i>
                  </div>
                </b-card-header>
                <b-collapse id="exhibitionSupports" visible accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    
                    <div class="header-title exhibitionOrganiser" v-for="support in supports">
                      <div class="header-left">{{ organiser.organiserTitle }}</div>
                      <div class="header-right">
                        <i class="fa fa-edit" @click="editOrganiser(organiser)"></i>
                        <i class="fa fa-arrow-down" @click="changeOrderDown(organiser)"></i>
                        <i class="fa fa-arrow-up" @click="changeOrderUp(organiser)"></i>
                      </div>
                    </div>
                    
                  </b-card-body>
                </b-collapse>
              </b-card>-->
            </div>
            
            <template slot="modal-footer">
            </template>
            
          </b-modal>
          
          <b-modal ref="organiserCardModal" hide-header-close :title="organiserCard.title">
            <b-row>
              <b-col cols="12">
                <div class="dropbox">
                  <b-form-file v-show="organiserCard.isInitial" id="inputNewLogotype" v-model="organiserCard.companyLogotype" @change="organiserCard__onNewLogotypeChange"></b-form-file>
                  <p v-if="organiserCard.isInitial">Drag your file(s) here to begin or click to browse</p>
                  <img v-if="!organiserCard.isInitial && organiserCard.mode == 'add'" :src="organiserCard.companyLogotypePreview" class="logotype-preview"/>
                  <img v-if="!organiserCard.isInitial && organiserCard.companyLogotype ==='' && organiserCard.mode == 'edit'" :src="`images/footer/${organiserCard.companyLogotypePreview}`" class="logotype-preview"/>
                  <img v-if="!organiserCard.isInitial && organiserCard.companyLogotype !=='' && organiserCard.mode == 'edit'" :src="organiserCard.companyLogotypePreview" class="logotype-preview"/>
                  <a v-if="!organiserCard.isInitial" @click="organiserCard__removeNewLogotype" class="remove-btn"><i class="fa fa-trash"></i></a>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <b-form-group id="input-organiser-title-group" label="Title:" label-for="input-organiser-title">
                  <b-form-input id="input-organiser-title" type="text" v-model="organiserCard.organiserTitle"></b-form-input>
                </b-form-group>
                <b-form-group id="input-company-name-group" label="Company name:" label-for="input-company-name">
                  <b-form-input id="input-company-name" type="text" v-model="organiserCard.companyName"></b-form-input>
                </b-form-group>
                <b-form-group id="input-company-phone-group" label="Company phone:" label-for="input-company-phone">
                  <b-form-input id="input-company-phone" type="text" v-model="organiserCard.companyPhone"></b-form-input>
                </b-form-group>
                <b-form-group id="input-company-email-group" label="Company email:" label-for="input-company-email">
                  <b-form-input id="input-company-email" type="text" v-model="organiserCard.companyEmail"></b-form-input>
                </b-form-group>
                <b-form-group id="input-company-site-group" label="Company site:" label-for="input-company-site">
                  <b-form-input id="input-company-site" type="text" v-model="organiserCard.companySite"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <template slot="modal-footer">
              <b-button @click="organiserCard__save" variant="primary">{{ organiserCard.action }}</b-button>
            </template>
          </b-modal>
          
        </div>
        <!-- End of footer bottom row editor -->
     </div>
   </div>
    
  </footer>
</template>

<script>
  import axios from '~/plugins/axios'
  import _ from 'lodash'
  
  export default {
    data: function () {
      return {
        pages: [],
        organisers: [],
        organiserCard: {},
        supports: [],
        footerBottomRowEdit: false,
        footerBottomRowEditAlertType: 'info',
        footerBottomRowEditAlertText: 'Choose image 270x90 px'
      }
    },
    methods: {
      addOrganiser: function () {
        let self = this
        self.$refs.organiserCardModal.show()
        self.organiserCard = {
          mode: 'add',
          title: 'Add new organiser',
          isInitial: true,
          companyLogotype: '',
          companyLogotypePreview: '',
          companyName: '',
          companyPhone: '',
          companyEmail: '',
          companySite: '',
          order: 0,
          id: 0,
          organiserTitle: '',
          action: 'Add'
        }
      },
      organiserCard__onNewLogotypeChange: function (e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        this.organiserCard__createNewLogotype(files[0])
      },
      organiserCard__createNewLogotype: function (file) {
        let self = this
        let reader = new FileReader()
        self.organiserCard.isInitial = false
        reader.onload = (e) => {
          self.organiserCard.companyLogotypePreview = e.target.result
        }
        reader.readAsDataURL(file)
      },
      organiserCard__removeNewLogotype: function () {
        let self = this
        self.organiserCard.companyLogotype = ''
        self.organiserCard.companyLogotypePreview = ''
        self.organiserCard.isInitial = true
      },
      organiserCard__save: function () {
        let self = this
        let data
        console.log(self.organiserCard)
        if ((self.organiserCard.companyLogotype !== null) && (self.organiserCard.companyLogotype !== undefined) && (self.organiserCard.companyLogotype !== '')) {
          data = new FormData()
          data.append('image', self.organiserCard.companyLogotype)
          data.append('name', self.organiserCard.companyName)
          data.append('phone', self.organiserCard.companyPhone)
          data.append('email', self.organiserCard.companyEmail)
          data.append('site', self.organiserCard.companySite)
          data.append('title', self.organiserCard.organiserTitle)
          if (self.organiserCard.mode === 'edit') {
            data.append('order', self.organiserCard.order)
            data.append('id', self.organiserCard.id)
          }
        } else {
          data = {
            name: self.organiserCard.companyName,
            phone: self.organiserCard.companyPhone,
            email: self.organiserCard.companyEmail,
            site: self.organiserCard.companySite,
            title: self.organiserCard.organiserTitle
          }
          if (self.organiserCard.mode === 'edit') {
            data.id = self.organiserCard.id
            data.order = self.organiserCard.order
          }
        }
        console.log(data)
        if (self.organiserCard.mode === 'add') {
          axios({
            method: 'post',
            url: '/api/content/footer/organisers',
            data: data
          }).then((response) => {
            console.log(response)
            self.fetchData()
            self.$refs.organiserCardModal.hide()
          }).catch((error) => {
            console.log(error)
          })
        } else if (self.organiserCard.mode === 'edit') {
          console.log(data)
          axios({
            method: 'put',
            url: '/api/content/footer/organisers',
            data: data
          }).then((response) => {
            console.log(response)
            self.fetchData()
            self.$refs.organiserCardModal.hide()
          }).catch((error) => {
            console.log(error)
          })
        }
      },
      editOrganiser: function (organiser) {
        let self = this
        self.$refs.organiserCardModal.show()
        self.organiserCard = {
          mode: 'edit',
          title: 'Edit organiser',
          isInitial: false,
          companyLogotype: '',
          companyLogotypePreview: organiser.companyLogotype === undefined ? '' : organiser.companyLogotype,
          companyName: organiser.companyName,
          companyPhone: organiser.companyPhone,
          companyEmail: organiser.companyEmail,
          companySite: organiser.companySite,
          order: organiser.order,
          id: organiser.id,
          organiserTitle: organiser.organiserTitle,
          action: 'Save'
        }
      },
      changeOrderUp: function (object) {
        let self = this
        let data = {
          typeOfAction: 'incremention',
          object: object
        }
        console.log(data)
        axios({
          method: 'put',
          url: '/api/content/footer/organisers/order',
          data: data
        }).then((response) => {
          console.log(response)
          self.fetchData()
        })
      },
      changeOrderDown: function (object) {
        let self = this
        let data = {
          typeOfAction: 'decremention',
          object: object
        }
        console.log(data)
        axios({
          method: 'put',
          url: '/api/content/footer/organisers/order',
          data: data
        }).then((response) => {
          console.log(response)
          self.fetchData()
        })
      },
      fetchPages: function () {
        let self = this
        axios({
          method: 'get',
          url: '/api/pages'
        }).then((response) => {
          self.pages = response.data.children
        }, (error) => {
          console.log(error)
        })
      },
      fetchData: function () {
        let self = this
        axios({
          method: 'get',
          url: '/api/content/footer'
        }).then((response) => {
          let _organisers = _.orderBy(response.data.organisers, 'order', 'asc')
          self.organisers = _organisers
          self.supports = response.data.supports
        }).catch((error) => {
          console.log(error)
        })
      }
    },
    created: function () {
      let self = this
      self.fetchPages()
      self.fetchData()
    }
  }
</script>

<style>
  .footerSection
  {
    text-align: left;
    border: none;
    padding: 0 15px;
    margin-bottom: 20px;
  }
  .footerSection__topRow
  {
    background-color: #b5bbbd;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }
  .footerSection__topColumn
  {
    width: 20%;
    padding: 10px 15px;
    color: #fff;
  }
  .footerSection__bottomRow
  {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .footerSection__organisers,
  .footerSection__supports
  {
    display: flex;
    flex-direction: row;
    margin-right: 10px;
  }
  .organiser:not(:last-child),
  .support:not(:last-child)
  {
    margin-right: 10px;
  }
  .footerSection__social
  {
    text-align: right;
  }
  .exhibitionOrganiser
  {
    padding: 1rem;
    background-color: #aaa;
    color: #fff;
  }
  .header-title
  {
    display: flex;
  }
  .header-title .header-left
  {
    width: 60%;
    text-align: left;
  }
  .header-title .header-right
  {
    width: 40%;
    text-align: right;
  }
  .header-title .fa
  {
    font-size: 16px;
  }
  .header-title .fa:not(:last-child)
  {
    margin-right: 10px;
  }
  @media(max-width: 456px)
  {
    .footerSection__topRow-flex
    {
      flex-direction: column;
    }
  }
  @media(min-width: 457px)
  {
    .footerSection__topRow-flex
    {
      flex-direction: row;
    }
  }
</style>