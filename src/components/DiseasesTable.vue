<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObjectName"
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />
    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="checkable"
      :loading="isLoading"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="name"
      :data="diseases"
      :columns="this.features"
      detailed
      detail-key="disease_id"
      @details-open="(row) => $buefy.toast.open(`Expanded ${row.name}`)"
      :show-detail-icon="showDetailIcon"

    >
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
      <template #detail="props">
        <article class="media">
            <div class="media-content">
                <div class="content">
                    <h3>{{ props.row.name }}</h3>
                    <p>
                        <strong>Detail</strong>
                        <br>
                        <small>Type: </small> <a> {{ props.row.type }} </a>
                        <br>
                        <small>Semantic Type: </small> <a> {{ props.row.semantic_type }} </a>
                        <br>
                        <small>Class Of:</small>
                        <small v-for="cl in (props.row.class_of.split(';'))" :key="cl">
                          <a> {{ cl }} </a> |
                        </small>
                    </p>
                </div>
            </div>
          </article>
        </template>
    </b-table>
    <b-pagination
      v-if="!isLoading"
      :total="total"
      v-model="current"
      :range-before="rangeBefore"
      :range-after="rangeAfter"
      :order="order"
      :size="size"
      :simple="isSimple"
      :rounded="isRounded"
      :per-page="perPage"
      :icon-prev="prevIcon"
      :icon-next="nextIcon"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page">
    </b-pagination>
  </div>
</template>

<script>
import axios from 'axios'
import ModalBox from '@/components/ModalBox'

export default {
  name: 'DiseasesTable',
  components: { ModalBox },
  props: {
    dataUrl: {
      type: String,
      default: null
    },
    checkable: {
      type: Boolean,
      default: false
    },
    features: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      total: 0,
      current: 1,
      perPage: 10,
      rangeBefore: 3,
      rangeAfter: 1,
      order: '',
      size: '',
      isSimple: false,
      isRounded: false,
      prevIcon: 'chevron-left',
      nextIcon: 'chevron-right',
      isModalActive: false,
      trashObject: null,
      diseases: [],
      isLoading: false,
      paginated: false,
      checkedRows: [],
      showDetailIcon: true
    }
  },
  computed: {
    trashObjectName () {
      if (this.trashObject) {
        return this.trashObject.name
      }

      return null
    }
  },
  watch: {
    current: function () {
      this.isLoading = true
      axios
        .get(this.dataUrl, { params: { page: this.current } })
        .then((r) => {
          this.isLoading = false
          if (r.data && r.data.results) {
            if (r.data.count > this.perPage) {
              this.total = r.data.count
              this.paginated = true
            }
            this.diseases = r.data.results
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
  },
  mounted () {
    if (this.dataUrl) {
      this.isLoading = true
      axios
        .get(this.dataUrl)
        .then((r) => {
          this.isLoading = false
          if (r.data && r.data.results) {
            if (r.data.count > this.perPage) {
              this.total = r.data.count
              this.paginated = true
            }
            this.diseases = r.data.results
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
  },
  methods: {
    trashModal (trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    trashConfirm () {
      this.isModalActive = false
      this.$buefy.snackbar.open({
        message: 'Confirmed',
        queue: false
      })
    },
    trashCancel () {
      this.isModalActive = false
    }
  }
}
</script>
