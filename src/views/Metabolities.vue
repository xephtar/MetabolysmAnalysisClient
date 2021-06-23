<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Metabolities
      <router-link slot="right" to="/" class="button">
        Dashboard
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <notification class="is-info">
        <div>
          <b-icon icon="buffer" custom-size="default" />
          <b>Sorted and paginated metabolities.</b>
        </div>
      </notification>

      <card-component
        class="has-table has-mobile-sort-spaced"
        title="Metabolities"
        icon="account-multiple"
      >
        <metabolities-table
          :data-url="this.metabolitiesUrl"
          :checkable="true"
          :features="this.metabolitiesColumn"
        />
      </card-component>

    </section>
  </div>
</template>

<script>
import Notification from '@/components/Notification'
import MetabolitiesTable from '@/components/MetabolitiesTable'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
export default {
  name: 'Metabolities',
  components: {
    HeroBar,
    TitleBar,
    CardComponent,
    MetabolitiesTable,
    Notification
  },
  data () {
    return {
      metabolitiesUrl: 'https://meta-analysis-api.herokuapp.com/api/metabolities/',
      metabolitiesColumn: [
        {
          field: 'name',
          label: 'Metabolism Name'
        }
      ]
    }
  },
  computed: {
    titleStack () {
      return ['Admin', 'Metabolities']
    }
  }
}
</script>
