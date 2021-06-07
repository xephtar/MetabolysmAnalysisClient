<template>
  <div class="hello">
    <h2>Analysis Result Page</h2>
    <hr>
    <CardComponent title="Parameters" icon="ballot">
      <form @submit.prevent="submit">
        <b-field>
          <b-input
            v-model="form.disease"
            icon="account"
            placeholder="Disease"
            name="disease"
            required
          />
        </b-field>
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
              <b-button type="is-primary is-outlined" @click="reset"
              >Reset</b-button
              >
            </div>
          </b-field>
        </b-field>
    </form>
    </CardComponent>
    <hr>
    <div class="content">
      <h3>Analysis Data</h3>
      <section>
        <div class="block">
          <b-button
            label="Disease"
            type="is-primary"
            size="is-medium"
            @click="isOpen = !isOpen"
            aria-controls="contentIdForA11y2" />
          <b-button
            label="Pathway"
            type="is-primary"
            size="is-medium"
            @click="isOpen_2 = !isOpen_2"
            aria-controls="contentIdForA11y3" />
        </div>

        <b-collapse
          aria-id="contentIdForA11y2"
          class="panel"
          animation="slide"
          v-model="isOpen">
          <template #trigger>
            <div
              class="panel-heading"
              role="button"
              aria-controls="contentIdForA11y2">
              <strong>Group by Disease</strong>
            </div>
          </template>
          <div class="panel-block">
            <DiseaseRowGrid/>
          </div>
        </b-collapse>
        <b-collapse
          aria-id="contentIdForA11y3"
          class="panel"
          animation="slide"
          v-model="isOpen_2">
          <template #trigger>
            <div
              class="panel-heading"
              role="button"
              aria-controls="contentIdForA11y3">
              <strong>Group by Pathway</strong>
            </div>
          </template>
          <div class="panel-block">
            <PathwayRowGrid />
          </div>
        </b-collapse>
      </section>
    </div>
    <b-modal :active.sync="isEditModalActive" has-modal-card>
      <show-modal
        :todo='selectedTodo'
        @edit-todo="onEditTodo"
      ></show-modal>
    </b-modal>
    <div>
      <b-table :items="items" :fields="fields" striped responsive="sm">
        <template #cell(show_details)="row">
          <b-button size="sm" @click="row.toggleDetails" class="mr-2">
            {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
          </b-button>

          <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
          <b-form-checkbox v-model="row.detailsShowing" @change="row.toggleDetails">
            Details via check
          </b-form-checkbox>
        </template>

        <template #row-details="row">
          <b-card>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Age:</b></b-col>
              <b-col>{{ row.item.age }}</b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right"><b>Is Active:</b></b-col>
              <b-col>{{ row.item.isActive }}</b-col>
            </b-row>

            <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
          </b-card>
        </template>
      </b-table>
    </div>
    <div id="footer">
      <hr>
      <p>Graduation Project &copy; 2021</p>
      <a class="btn btn-sm btn-outline-success" href="https://siposm.hu" target="_blank"></a>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import CardComponent from '@/components/CardComponent'
import ShowModal from '@/components/ShowModal'
import mapValues from 'lodash/mapValues'
import DiseaseRowGrid from '@/components/DiseaseRowGrid'
import PathwayRowGrid from '@/components/PathwayRowGrid'

export default {
  components: { PathwayRowGrid, DiseaseRowGrid, CardComponent, ShowModal },
  comments: {
    CardComponent
  },
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
      todos: [],
      isAddModalActive: false
    }
  },

  methods: {
    openEditModal (item) {
      this.selectedTodo = item
      this.isEditModalActive = true
    },
    submit () {
      console.log('this.form.disease:: ', this.form.disease)
      let searchParam = ''
      if (this.form.pathway !== '') {
        searchParam = this.form.disease + ' ' + this.form.pathway
      } else {
        searchParam = this.form.disease
      }
      this.words = searchParam
      axios.get('http://127.0.0.1:8000/api/articles/?search=' + searchParam).then(resp => {
        console.log('--- SUCCESS ---')
        this.fetched_items = []
        resp.data.results.forEach(x => this.fetched_items.push(x))
      }).catch(() => { console.log('--- ERROR ---') })
    },
    reset () {
      this.form = mapValues(this.form, (item) => {
        if (item && typeof item === 'object') {
          return []
        }
        return null
      })

      this.$buefy.snackbar.open({
        message: 'Reset successfully',
        queue: false
      })
      this.fetched_items = []
    }
  },
  computed: {
    keywords () {
      return this.words.split(' ')
    },
    console: () => console
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
