<template>
  <div>
    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="checkable"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      :data="analysis"
    >
      <b-table-column label="Doi" field="doi" sortable v-slot="props">
        {{ props.row.doi }}
      </b-table-column>
      <b-table-column label="Abstract" field="abstract" sortable v-slot="props">
        {{ props.row.abstract }}
      </b-table-column>
      <b-table-column label="Disease" field="disease" sortable v-slot="props">
        {{ props.row.disease }}
      </b-table-column>
      <b-table-column label="Parameter" field="parameter" sortable v-slot="props">
        {{ props.row.parameter }}
      </b-table-column>
      <b-table-column label="Result" field="result" sortable v-slot="props">
        {{ props.row.result }}
      </b-table-column>

      <section slot="empty" class="section">
        <div class="content has-text-grey has-text-centered">
          <template v-if="isLoading">
            <p>
              <b-icon icon="dots-horizontal" size="is-large" />
            </p>
            <p>Fetching data...</p>
          </template>
          <template v-else>
            <p>
              <b-icon icon="emoticon-sad" size="is-large" />
            </p>
            <p>Nothing's here&hellip;</p>
          </template>
        </div>
      </section>
    </b-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AnalysisTableSample',
  props: {
    dataUrl: {
      type: String,
      default: null
    },
    checkable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isModalActive: false,
      analysis: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: []
    }
  },
  mounted () {
    if (this.dataUrl) {
      this.isLoading = true
      axios
        .get(this.dataUrl)
        .then((r) => {
          this.isLoading = false
          if (r.data && r.data.data) {
            if (r.data.data.length > this.perPage) {
              this.paginated = true
            }
            this.analysis = r.data.data
          }
        })
        .catch((e) => {
          this.isLoading = false
          this.$buefy.toast.open({
            message: `Error: ${e.message}`,
            type: 'is-danger'
          })
        })
    }
  }
}
</script>
