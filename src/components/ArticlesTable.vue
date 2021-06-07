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
      :data="articles"
      :columns="this.features"
      detailed
      detail-key="id"
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
                        <strong>Authors: </strong>
                        <small v-for="author in props.row.authors" :key="author.url">
                          <a> {{ author.initials }} </a> |
                        </small>
                        <br>
                        {{ props.row.abstract_text }}
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
  name: 'ArticlesTable',
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
      articles: [],
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
            this.articles = r.data.results
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
            this.articles = r.data.results
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
