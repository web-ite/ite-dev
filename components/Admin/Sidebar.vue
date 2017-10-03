<template>
  <aside class="adminSidebarSection w-20 p-4">
    <a href="/admin/dashboard">
      <h4 class="page-header">Admin Panel</h4>
    </a>
    <ul class="adminSiteControls">
      <li class="adminSiteControls__item">
        <a href="/admin/dashboard/seo-settings">SEO settings</a>
      </li>
      <li class="adminSiteControls__item">
        <a href="/admin/dashboard/counters">Counters</a>
      </li>
      <li class="adminSiteControls__item">
        <a href="/admin/dashboard/color-settings">Color settings</a>
      </li>
      <li class="adminSiteControls__item">
        <a href="/admin/dashboard/language-settings">Languages</a>
        </li>
      <li class="adminSiteControls__item">
        <a href="/admin/dashboard/pages">Pages</a>
      </li>
    </ul>
  </aside>
</template>

<style>
  
  .adminSiteControls
  {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
  }
  
  .adminSiteControls__item
  {
    margin-bottom: 20px;
  }
  
</style>