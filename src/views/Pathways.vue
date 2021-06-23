<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Pathways
      <router-link slot="right" to="/" class="button">
        Dashboard
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <notification class="is-info">
        <div>
          <b-icon icon="buffer" custom-size="default" />
          <b>Sorted and paginated pathways.</b>
        </div>
      </notification>

      <card-component
        class="has-table has-mobile-sort-spaced"
        title="Pathways"
        icon="account-multiple"
      >
        <pathways-table
          :data-url="this.pathwaysUrl"
          :checkable="true"
          :features="this.pathwaysColumn"
        />
      </card-component>

    </section>
  </div>
</template>

<script>
import Notification from '@/components/Notification'
import PathwaysTable from '@/components/PathwaysTable'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
export default {
  name: 'Metabolities',
  components: {
    HeroBar,
    TitleBar,
    CardComponent,
    PathwaysTable,
    Notification
  },
  data () {
    return {
      pathwaysUrl: 'https://meta-analysis-api.herokuapp.com/api/pathways/',
      pathwaysColumn: [
        {
          field: 'name',
          label: 'Pathway Name'
        }
      ]
    }
  },
  computed: {
    titleStack () {
      return ['Admin', 'Pathways']
    }
  }
}
</script>
