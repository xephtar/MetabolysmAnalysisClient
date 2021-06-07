<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Reactions
      <router-link slot="right" to="/" class="button">
        Dashboard
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <notification class="is-info">
        <div>
          <b-icon icon="buffer" custom-size="default" />
          <b>Sorted and paginated reactions.</b>
        </div>
      </notification>

      <card-component
        class="has-table has-mobile-sort-spaced"
        title="Reactions"
        icon="account-multiple"
      >
        <reactions-table
          :data-url="this.reactionsUrl"
          :checkable="true"
          :features="this.reactionsColumn"
        />
      </card-component>

    </section>
  </div>
</template>

<script>
import Notification from '@/components/Notification'
import ReactionsTable from '@/components/ReactionsTable'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
export default {
  name: 'Metabolities',
  components: {
    HeroBar,
    TitleBar,
    CardComponent,
    ReactionsTable,
    Notification
  },
  data () {
    return {
      reactionsUrl: 'http://localhost:8000/api/reactions/',
      reactionsColumn: [
        {
          field: 'name',
          label: 'Reaction Name'
        }
      ]
    }
  },
  computed: {
    titleStack () {
      return ['Admin', 'Tables']
    }
  }
}
</script>
