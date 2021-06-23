<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Articles
      <router-link slot="right" to="/" class="button">
        Dashboard
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <notification class="is-info">
        <div>
          <b-icon icon="buffer" custom-size="default" />
          <b>Sorted and paginated articles.</b>
        </div>
      </notification>

      <card-component
        class="has-table has-mobile-sort-spaced"
        title="Articles"
        icon="account-multiple"
      >
        <articles-table
          :data-url="this.articlesUrl"
          :checkable="true"
          :features="this.articleColumns"
        />
      </card-component>

    </section>
  </div>
</template>

<script>
import Notification from '@/components/Notification'
import ArticlesTable from '@/components/ArticlesTable'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
export default {
  name: 'Articles',
  components: {
    HeroBar,
    TitleBar,
    CardComponent,
    ArticlesTable,
    Notification
  },
  data () {
    return {
      articlesUrl: 'https://meta-analysis-api.herokuapp.com/api/articles/',
      articleColumns: [
        {
          field: 'name',
          label: 'Title',
          width: '50%'
        },
        {
          field: 'pub_date',
          label: 'Pub Date',
          centered: true
        },
        {
          field: 'doi',
          label: 'Doi'
        }
      ]
    }
  },
  computed: {
    titleStack () {
      return ['Admin', 'Articles']
    }
  }
}
</script>
