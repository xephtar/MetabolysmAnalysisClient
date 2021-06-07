<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar :has-right-visible="false">
      Dashboard
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-widget
          class="tile is-child"
          type="is-info"
          icon="book-open"
          :number="this.articlesCount"
          label="Articles"
        />
        <card-widget
          class="tile is-child"
          type="is-info"
          icon="bacteria"
          :number="this.metabolitiesCount"
          label="Metabolities"
        />
        <card-widget
          class="tile is-child"
          type="is-info"
          icon="needle"
          :number="this.diseasesCount"
          label="Diseases"
        />
        <card-widget
          class="tile is-child"
          type="is-info"
          icon="test-tube"
          :number="this.reactionsCount"
          label="Reactions"
        />
      </tiles>
      <b-loading :is-full-page="true" v-model="isLoading"></b-loading>
      <!-- <card-component
        title="Performance"
        icon="finance"
        header-icon="reload"
        @header-icon-click="fillChartData"
      >
        <div v-if="defaultChart.chartData" class="chart-area">
          <line-chart
            ref="bigChart"
            style="height: 100%;"
            chart-id="big-line-chart"
            :chart-data="defaultChart.chartData"
            :extra-options="defaultChart.extraOptions"
          >
          </line-chart>
        </div>
      </card-component> -->
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import * as chartConfig from '@/components/Charts/chart.config'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardWidget from '@/components/CardWidget'
// import CardComponent from '@/components/CardComponent'
// import LineChart from '@/components/Charts/LineChart'
import axios from 'axios'
export default {
  name: 'Home',
  components: {
    // LineChart,
    // CardComponent,
    CardWidget,
    Tiles,
    HeroBar,
    TitleBar
  },
  data () {
    return {
      defaultChart: {
        chartData: null,
        extraOptions: chartConfig.chartOptionsMain
      },
      articlesUrl: 'http://localhost:8000/api/articles/',
      articlesCount: 0,
      metabolitiesUrl: 'http://localhost:8000/api/metabolities/',
      metabolitiesCount: 0,
      diseasesUrl: 'http://localhost:8000/api/diseases/',
      diseasesCount: 0,
      reactionsUrl: 'http://localhost:8000/api/reactions/',
      reactionsCount: 0,
      isLoading: true
    }
  },
  computed: {
    titleStack () {
      return ['Admin', 'Dashboard']
    }
  },
  async mounted () {
    this.isLoading = true
    await axios.get(this.articlesUrl).then((response) => {
      this.articlesCount = response.data.count
    })
    await axios.get(this.metabolitiesUrl).then((response) => {
      this.metabolitiesCount = response.data.count
    })
    await axios.get(this.diseasesUrl).then((response) => {
      this.diseasesCount = response.data.count
    })
    await axios.get(this.reactionsUrl).then((response) => {
      this.reactionsCount = response.data.count
    })
    this.isLoading = false
    this.fillChartData()
    this.$buefy.snackbar.open({
      message: 'Welcome back',
      queue: false
    })
  },
  methods: {
    randomChartData (n) {
      const data = []

      for (let i = 0; i < n; i++) {
        data.push(Math.round(Math.random() * 200))
      }

      return data
    },
    fillChartData () {
      this.defaultChart.chartData = {
        datasets: [
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9)
          },
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.info,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.info,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.info,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9)
          },
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.danger,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.danger,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.danger,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.randomChartData(9)
          }
        ],
        labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09']
      }
    }
  }
}
</script>
