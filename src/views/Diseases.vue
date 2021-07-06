<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Diseases
      <router-link slot="right" to="/" class="button">
        Dashboard
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <notification class="is-info">
        <div>
          <b-icon icon="buffer" custom-size="default" />
          <b>Sorted and paginated diseases.</b>
        </div>
      </notification>

      <card-component
        class="has-table has-mobile-sort-spaced"
        title="Diseases"
        icon="account-multiple"
      >
        <diseases-table
          :data-url="this.diseasesUrl"
          :checkable="true"
          :features="this.diseasesColumn"
        />
      </card-component>

    </section>
  </div>
</template>

<script>
import Notification from '@/components/Notification'
import DiseasesTable from '@/components/DiseasesTable'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
export default {
  name: 'Metabolities',
  components: {
    HeroBar,
    TitleBar,
    CardComponent,
    DiseasesTable,
    Notification
  },
  data () {
    return {
      diseasesUrl: 'http://localhost:8000/api/diseases/',
      diseasesColumn: [
        {
          field: 'name',
          label: 'Disease Name'
        }
      ]
    }
  },
  computed: {
    titleStack () {
      return ['Association Tool', 'Diseases']
    }
  }
}
</script>
