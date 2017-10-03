<template>
  <header class="headerSection">
    <div class="container">
      <div class="siteSwitchSection btn-group">
        <a href="#" class="siteSwitchSection__btn siteSwitchSection__btn-blue">Sport World Krasnodar</a>
        <a href="#" class="siteSwitchSection__btn siteSwitchSection__btn-red">Sport World St. Petersburg</a>
        <a href="#" class="siteSwitchSection__btn siteSwitchSection__btn-green">Sport World Novosibirsk</a>
      </div>
      <div class="languageSwitchSection">
        <ul class="list-inline">
          <li class="list-inline-item">
            <a href="#">English</a>
          </li>
          <li class="list-inline-item">
            <a href="#">Русский</a>
          </li>
        </ul>
      </div>
      <div class="exhibitionInfoSection row">
        <div class="col-12 col-sm-4">
          <logo-component />
        </div>
        <div class="col-12 col-sm-8">
          <exhibition-title-component />
          <exhibition-date-venue-component />
        </div>
      </div>
      <primary-navigation-component />
    </div>
  </header>
</template>

<script>
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
    }
  }
</script>

<style>
  .headerSection
  {
    
  }
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