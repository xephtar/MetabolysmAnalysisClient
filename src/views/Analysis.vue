<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Analysis
      <router-link slot="right" to="/" class="button">
        Dashboard
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <div class="columns">
        <div class="column">
          <card-component title="Pathway Search" icon="ballot">
            <form @submit.prevent="submitPathway">
              <b-field>
                <b-input
                  v-model="form.pathway"
                  icon="email"
                  placeholder="Pathway"
                  name="pathway"
                />
              </b-field>
              <b-field horizontal>
                <b-field grouped>
                  <div class="control">
                    <b-button native-type="submit" type="is-primary"
                    >Search</b-button
                    >
                  </div>
                  <div class="control">
                    <b-button type="is-primary is-outlined" @click="resetPathway">
                      Reset
                    </b-button>
                  </div>
                </b-field>
              </b-field>
            </form>
          </card-component>
        </div>
        <div class="column">
            <card-component title="Disease Search" icon="ballot">
              <form @submit.prevent="submitDisease">
                  <b-field>
                    <b-input
                      v-model="form.disease"
                      icon="account"
                      placeholder="Disease"
                      name="disease"
                    />
                  </b-field>
                  <b-field horizontal>
                    <b-field grouped>
                      <div class="control">
                        <b-button native-type="submit" type="is-primary"
                        >Search</b-button
                        >
                      </div>
                      <div class="control">
                        <b-button type="is-primary is-outlined" @click="resetDisease">
                          Reset
                        </b-button>
                      </div>
                    </b-field>
                  </b-field>
                </form>
            </card-component>
        </div>
      </div>
      <div>
        <h3>Analysis Data</h3>
        <div>
          <b-loading :is-full-page="false" v-model="isFirstLoading" :can-cancel="false">
          </b-loading>
        </div>
        <card-component v-if="diseasesHaveData"  title="Disease Data" icon="ballot">
          <b-table :key="key" :data="diseases" :columns="diseaseColumns"
            detailed
            detail-key="disease_name"
            :loading="isDiseasesLoading || isDiseaseDetailLoading"
            @details-open="(row) => takeDiseaseDetail(row.disease_name)"
            >
          <template #detail="props">
              <article class="media" v-if="diseaseDetailData !== null" :key="diseaseDetailKey">
                <div class="media-content" :key="diseaseDetailKey">
                    <div :key="detailKey">
                        <b-table
                          :data="diseaseDetailMap.get(props.row.disease_name)"
                          :key="diseaseDetailKey"
                          :per-page="perPage"
                          :paginated="isPaginated"
                          :current-page.sync="diseaseCurrentPage"
                          :pagination-simple="isPaginationSimple"
                          :pagination-position="paginationPosition"
                          :pagination-rounded="isPaginationRounded"
                        >
                          <b-table-column field="pathway" label="Pathway" width="50" centered v-slot="props">
                            <b-tag type="is-primary" size="is-medium">{{ props.row.pathway }}</b-tag>
                          </b-table-column>

                          <b-table-column field="data.flair" label="Flair Model" centered v-slot="props">
                            <div class="is-flex-direction-column is-flex-wrap-nowrap">
                              <div v-for="(value, scoreKey) in props.row.data.flair" :key="scoreKey" class="mb-3">
                                <b-tag native-type="submit" :type="getType(scoreKey)"> {{ value }} </b-tag>
                              </div>
                            </div>
                          </b-table-column>
                          <b-table-column field="data.sia" label="NLTK Model" centered v-slot="props">
                            <div class="is-flex-direction-column is-flex-wrap-nowrap">
                              <div v-for="(value, scoreKey) in props.row.data.sia" :key="scoreKey" class="mb-3">
                                <b-tag native-type="submit" :type="getType(scoreKey)"> {{ value }} </b-tag>
                              </div>
                            </div>
                          </b-table-column>
                          <b-table-column field="data.textblob" label="Textblob Model" centered v-slot="props">
                            <div class="is-flex-direction-column is-flex-wrap-nowrap">
                              <div v-for="(value, scoreKey) in props.row.data.textblob" :key="scoreKey" class="mb-3">
                                <b-tag native-type="submit" :type="getType(scoreKey)"> {{ value }} </b-tag>
                              </div>
                            </div>
                          </b-table-column>
                          <b-table-column field="data.totalEvidence" label="Evidence" centered v-slot="props">
                            <b-button
                              type="is-primary"
                              icon-left="settings-outline"
                              size="is-small"
                              >
                              {{ props.row.data.totalEvidence }}
                            </b-button>
                          </b-table-column>
                        </b-table>
                    </div>
                </div>
              </article>
          </template>
          </b-table>
        </card-component>
        <card-component v-if="pathwaysHaveData"  title="Pathways Data" icon="ballot">
          <b-table v-if="pathwaysHaveData" :key="key" :data="pathways" :columns="pathwayColumns"
            detailed
            :loading="isPathwaysLoading || isDetailLoading"
            detail-key="pathway_name"
            @details-open="(row) => takePathwayDetail(row.pathway_name)"
          >
          <template #detail="props">
              <article class="media" v-if="detailData !== null" :key="detailKey">
                <div class="media-content" :key="detailKey">
                    <div :key="detailKey">
                        <b-table
                          :data="pathwayDetailMap.get(props.row.pathway_name)"
                          :key="key"
                          :per-page="perPage"
                          :paginated="isPaginated"
                          :current-page.sync="currentPage"
                          :pagination-simple="isPaginationSimple"
                          :pagination-position="paginationPosition"
                          :pagination-rounded="isPaginationRounded"
                        >
                          <b-table-column field="disease" label="Disease" width="50" centered v-slot="props">
                            <b-tag type="is-primary" size="is-medium">{{ props.row.disease }}</b-tag>
                          </b-table-column>

                          <b-table-column field="data.flair" label="Flair Model" centered v-slot="props">
                            <div class="is-flex-direction-column is-flex-wrap-nowrap">
                              <div v-for="(value, scoreKey) in props.row.data.flair" :key="scoreKey" class="mb-3">
                                <b-tag native-type="submit" :type="getType(scoreKey)"> {{ value }} </b-tag>
                              </div>
                            </div>
                          </b-table-column>
                          <b-table-column field="data.sia" label="NLTK Model" centered v-slot="props">
                            <div class="is-flex-direction-column is-flex-wrap-nowrap">
                              <div v-for="(value, scoreKey) in props.row.data.sia" :key="scoreKey" class="mb-3">
                                <b-tag native-type="submit" :type="getType(scoreKey)"> {{ value }} </b-tag>
                              </div>
                            </div>
                          </b-table-column>
                          <b-table-column field="data.textblob" label="Textblob Model" centered v-slot="props">
                            <div class="is-flex-direction-column is-flex-wrap-nowrap">
                              <div v-for="(value, scoreKey) in props.row.data.textblob" :key="scoreKey" class="mb-3">
                                <b-tag native-type="submit" :type="getType(scoreKey)"> {{ value }} </b-tag>
                              </div>
                            </div>
                          </b-table-column>
                          <b-table-column field="data.totalEvidence" label="Evidence" centered v-slot="props">
                            <b-button
                              type="is-primary"
                              icon-left="settings-outline"
                              size="is-small"
                              >
                              {{ props.row.data.totalEvidence }}
                            </b-button>
                          </b-table-column>
                        </b-table>
                    </div>
                </div>
              </article>
          </template>
          </b-table>
        </card-component>
        <div class="content has-text-grey has-text-centered">
          <template v-if="!diseasesHaveData && !pathwaysHaveData && !(isDiseasesLoading || isPathwaysLoading)">
            <p>
              <b-icon icon="magnify" size="is-large" />
            </p>
            <p>You can search pathway or disease</p>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import axios from 'axios'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import CardComponent from '@/components/CardComponent'

export default {
  components: { TitleBar, HeroBar, CardComponent }, // PathwayRowGrid, DiseaseRowGrid, CardComponent, ShowModal },
  data () {
    return {
      isOpen: true,
      isOpen_2: false,
      isEditModalActive: false,
      fetched_items: [],
      words: '',
      text: '',
      form: {
        disease: '',
        pathway: ''
      },
      isAddModalActive: false,
      disease_information: [],
      pathway_information: [],
      key: 0,
      diseaseColumns: [{ field: 'disease_name', label: 'Disease Name' }, { field: 'total_count', label: 'Pathway Count' }],
      pathwayColumns: [{ field: 'pathway_name', label: 'Pathway Name' }, { field: 'total_count', label: 'Disease Count' }],
      detailColumns: [{ field: 'disease', label: 'Disease' }, { field: 'data', label: 'data' }],
      isDiseasesLoading: false,
      isPathwaysLoading: false,
      isDetailLoading: false,
      isDiseaseDetailLoading: false,
      detail: null,
      diseaseDetail: null,
      detailKey: 0,
      diseaseDetailKey: 0,
      isPaginated: true,
      isPaginationSimple: false,
      isPaginationRounded: false,
      paginationPosition: 'bottom',
      currentPage: 1,
      diseaseCurrentPage: 1,
      perPage: 3,
      diseaseDetailMap: new Map(),
      pathwayDetailMap: new Map()
    }
  },

  methods: {
    danger () {
      this.$buefy.toast.open({
        duration: 5000,
        message: 'No data found with given creteria!',
        position: 'is-bottom',
        type: 'is-danger'
      })
    },
    getType (key) {
      return key === 'neutreal' ? 'is-light is-text is-medium' : key === 'positive' ? 'is-success is-light is-text is-medium' : 'is-danger is-light is-text is-medium'
    },
    takePathwayDetail (pathway) {
      if (this.pathwayDetailMap.has(pathway)) {
        return
      }
      this.isDetailLoading = true
      axios.get('http://localhost:8000/api/get-pathway-relation-detail/?pathway=' + pathway).then(resp => {
        this.detail = resp.data
        var sorted = resp.data.sort((a, b) => b.data.totalEvidence - a.data.totalEvidence)
        this.pathwayDetailMap.set(pathway, sorted)
        this.forceDetailRerender()
      }).then(() => { this.isDetailLoading = false }).catch(() => { console.log('--- ERROR ---') })
    },
    takeDiseaseDetail (disease) {
      if (this.diseaseDetailMap.has(disease)) {
        return
      }
      this.isDiseaseDetailLoading = true
      axios.get('http://localhost:8000/api/get-disease-relation-detail/?disease=' + disease).then(resp => {
        this.diseaseDetail = resp.data
        var sorted = resp.data.sort((a, b) => b.data.totalEvidence - a.data.totalEvidence)
        this.diseaseDetailMap.set(disease, sorted)
        this.forceDiseaseDetailRerender()
      }).then(() => { this.isDiseaseDetailLoading = false }).catch(() => { console.log('--- ERROR ---') })
    },
    submitDisease () {
      this.isDiseasesLoading = true
      axios.get('http://localhost:8000/api/get-relation/?disease=' + this.form.disease).then(resp => {
        this.disease_information = resp.data.disease_information
        this.forceRerender()
      }).then(() => {
        this.isDiseasesLoading = false
        if (!this.diseasesHaveData) {
          this.danger()
        }
      }).catch(() => { console.log('--- ERROR ---') })
    },
    submitPathway () {
      this.isPathwaysLoading = true
      axios.get('http://localhost:8000/api/get-relation/?pathway=' + this.form.pathway).then(resp => {
        this.pathway_information = resp.data.pathway_information
        this.key = this.key + 1
        this.forceRerender()
      }).then(() => {
        this.isPathwaysLoading = false
        if (!this.pathwaysHaveData) {
          this.danger()
        }
      }).catch(() => { console.log('--- ERROR ---') })
    },
    resetDisease () {
      this.form.disease = ''
      this.$buefy.snackbar.open({
        message: 'Reset successfully',
        queue: false
      })
      this.disease_information = []
    },
    resetPathway () {
      this.form.pathway = ''
      this.$buefy.snackbar.open({
        message: 'Reset successfully',
        queue: false
      })
      this.pathway_information = []
    },
    forceRerender () {
      this.key += 1
    },
    forceDetailRerender () {
      this.detailKey += 1
    },
    forceDiseaseDetailRerender () {
      this.diseaseDetailKey += 1
    }
  },
  computed: {
    titleStack () {
      return ['Association Tool', 'Analysis']
    },
    diseases () {
      return this.disease_information
    },
    pathways () {
      return this.pathway_information
    },
    diseasesHaveData () {
      return this.disease_information?.length > 0
    },
    pathwaysHaveData () {
      return this.pathway_information?.length > 0
    },
    isFirstLoading () {
      return (!this.diseasesHaveData && this.isDiseasesLoading) || (!this.pathwaysHaveData && this.isPathwaysLoading)
    },
    detailData () {
      return this.detail
    },
    diseaseDetailData () {
      return this.diseaseDetail
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#footer {
  margin-bottom: 100px;
}
#footer p{
  font-size: 0.6em;
}
.prof-img {
  margin-right: 10px;
  border-radius: 50px;
}
.hello {
  width: 800px;
  margin: 0 auto;
}
.content {
  text-align: left;
  min-height: 600px;
}
button {
  margin: 0 10px;
}
th {
  font-size: 0.8em;
  background-color: rgb(241, 241, 241);
}
tbody > tr:hover {
  background-color: #f2b727;
}
tbody > tr {
  height: 60px;
}
td {
  padding-top: 20px;
}
hr {
  margin: 30px 0;
  border: 1px solid #42b983;
}
h3 {
  margin: 40px 0 20px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 10px;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#insert_to_here {
  height: 700px;
  width: 500px;
}
</style>
