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
            icon: 'desktop-mac',
            label: 'Dashboard'
          }
        ],
        'Data',
        [
          {
            to: '/articles',
            label: 'Articles',
            icon: 'book-open'
          },
          {
            to: '/metabolities',
            label: 'Metabolities',
            icon: 'bacteria'
          },
          {
            to: '/reactions',
            label: 'Reactions',
            icon: 'test-tube'
          },
          {
            to: '/diseases',
            label: 'Diseases',
            icon: 'needle'
          }
          // {
          //   label: 'Submenus',
          //   subLabel: 'Submenus Example',
          //   icon: 'view-list',
          //   menu: [
          //     {
          //       href: '#void',
          //       label: 'Sub-item One'
          //     },
          //     {
          //       href: '#void',
          //       label: 'Sub-item Two'
          //     }
          //   ]
          // }
        ]
      ]
    }
  },
  created () {
    this.$store.commit('user', {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg'
    })
  }
}
</script>
