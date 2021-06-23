<template>
  <div id="app">
    <nav-bar />
    <aside-menu :menu="menu" />
    <router-view />
    <footer-bar />
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar'
import AsideMenu from '@/components/AsideMenu'
import FooterBar from '@/components/FooterBar'

export default {
  name: 'Home',
  components: {
    FooterBar,
    AsideMenu,
    NavBar
  },
  computed: {
    menu () {
      return [
        'General',
        [
          {
            to: '/',
            label: 'Dashboard',
            icon: 'home'
          }
        ],
        [
          {
            to: '/analysis',
            label: 'Analysis',
            icon: 'cloud-search'
          }
        ],
        [
          {
            to: '/articles',
            label: 'Articles',
            icon: 'database'
          }
        ],
        [
          {
            to: '/pathways',
            label: 'Pathways',
            icon: 'database'
          }
        ],
        [
          {
            to: '/diseases',
            label: 'Diseases',
            icon: 'database'
          }
        ],
        [
          {
            to: '/metabolities',
            label: 'Metabolities',
            icon: 'database'
          }
        ]
      ]
    }
  }
}
</script>
