<template>
  <section>

    <b-table

      :data="data"
      ref="table"
      :opened-detailed="defaultOpenedDetails"
      detailed
      detail-key="pathway_id"
      :detail-transition="transitionName"
      @details-open="(row) => $buefy.toast.open(`Expanded ${row.pathway}`)"
      :show-detail-icon="showDetailIcon"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page">

      <b-table-column field="pathway" label="Pathway Name" width="150px" sortable v-slot="props">
        <template v-if="showDetailIcon">
          {{ props.row.pathway }}
        </template>
        <template v-else>
          <a @click="props.toggleDetails(props.row)">
            {{ props.row.pathway }}
          </a>
        </template>
      </b-table-column>
      <b-table-column field="total_evidence" label="Total Disease Count">
        <template v-slot:header="{ column }">
          <b-tooltip :label="column.label" append-to-body dashed>
            {{ 'Disease' }}
          </b-tooltip>
        </template>
        <template v-slot="props">
          {{ props.row.total_disease }}
        </template>
      </b-table-column>
      <b-table-column field="total_evidence" label="Total Evidence Count">
        <template v-slot:header="{ column }">
          <b-tooltip :label="column.label" append-to-body dashed>
            {{ 'Evidence' }}
          </b-tooltip>
        </template>
        <template v-slot="props">
          {{ props.row.total_evidence }}
        </template>
      </b-table-column>

      <template style="width: available"  slot="detail" slot-scope="props">

        <b-table
          :data="props.row.details"
          :bordered=true
          :striped=true
          :narrowed=false
          :hoverable=false
          :loading=false
          :focusable=true>

          <b-table-column field="disease" centered label="Disease" width="200" :td-attrs="columnTdAttrs" numeric v-slot="props">
            {{ props.row.disease }}
          </b-table-column>

          <b-table-column field="score" centered label="Score" width="100" :td-attrs="columnTdAttrs" v-slot="props">
            {{ props.row.score }}
          </b-table-column>

          <b-table-column field="activity_change" centered label="Activity Change" :td-attrs="columnTdAttrs" v-slot="props">
            <div class="control">
                <b-button native-type="submit" type="is-success is-light is-text">
                  {{props.row.activity_change.increase}}
                </b-button>
            </div>

            <br/>
            <div class="control">
              <b-button native-type="submit" type="is-danger is-light is-text">
                {{props.row.activity_change.decrease}}
              </b-button>
            </div>
            <br/>
            <div class="control">
              <b-button native-type="submit" type="is-text">
                {{props.row.activity_change.unknown}}
              </b-button>
            </div>
          </b-table-column>

          <b-table-column field="evidence" label="Evidence" :td-attrs="columnTdAttrs" centered v-slot="props">
            <b-button
              type="is-primary"
              icon-left="settings-outline"
              size="is-small"
              @click="openEditModal(props.row)">
                {{props.row.evidence}}
            </b-button>
          </b-table-column>

          <template #empty>
            <div class="has-text-centered">No records</div>
          </template>

        </b-table>
      </template>
    </b-table>
    <b-modal :active.sync="isEditModalActive" has-modal-card>
      <show-modal
        :todo='selectedTodo'
        @edit-todo="onEditTodo"
      ></show-modal>
    </b-modal>
  </section>
</template>

<script>

import ShowModal from './ShowModal'
const data = require('../../public/data-sources/pathway.json')

export default {
  name: 'PathwayRowGrid',
  components: { ShowModal },
  data () {
    return {
      data,
      isEditModalActive: false,
      defaultOpenedDetails: [1],
      showDetailIcon: true,
      useTransition: false,
      columnsVisible: {
        pathway: { title: 'Disease', display: true },
        score: { title: 'Score', display: true },
        activity_change: { title: 'Activity Change', display: true },
        evidence: { title: 'Evidence', display: true }
      }
    }
  },
  methods: {
    openEditModal (item) {
      this.selectedTodo = item
      this.isEditModalActive = true
    },
    columnTdAttrs (row, column) {
      if (row.id === 'Total') {
        if (column.label === 'ID') {
          return {
            colspan: 4,
            class: 'has-text-weight-bold',
            style: {
              'text-align': 'left !important'
            }
          }
        } else if (column.label === 'Gender') {
          return {
            class: 'has-text-weight-semibold'
          }
        } else {
          return {
            style: { display: 'none' }
          }
        }
      }
      return null
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    transitionName () {
      if (this.useTransition) {
        return 'fade'
      }
    }
  }
}
</script>
