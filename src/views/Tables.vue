<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Tables
      <router-link slot="right" to="/" class="button">
        Dashboard
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <notification class="is-info">
        <div>
          <b-icon icon="buffer" custom-size="default" />
          <b>Sorted and paginated table.</b>&nbsp;Based on Buefy's table.
        </div>
      </notification>

      <card-component
        class="has-table has-mobile-sort-spaced"
        title="Analysis"
        icon="account-multiple"
      >
        <analysis-table-sample
          :data-url="`${$router.options.base}data-sources/analysis.json`"
          :checkable="true"
        />
      </card-component>

    </section>
  </div>
</template>

<script>
import Notification from '@/components/Notification'
import AnalysisTableSample from '@/components/AnalysisTableSample'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
export default {
  name: 'Tables',
  components: {
    HeroBar,
    TitleBar,
    CardComponent,
    AnalysisTableSample,
    Notification
  },
  computed: {
    titleStack () {
      return ['Association Tool', 'Analysis']
    }
  }
}
</script>
