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
      <table class="table">
        <thead>
        <tr>
          <th>Article Title</th>
          <th>Publish Date</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in fetched_items" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ parseInt(item.pub_date) }}</td>
          <td>
            <b-button
              label="Detail"
              type="is-primary"
              size="is-small"
              @click="isComponentModalActive = true" />
          </td>
        </tr>
        </tbody>
      </table>
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
import mapValues from 'lodash/mapValues'

export default {
  components: { CardComponent },
  comments: {
    CardComponent
  },
  data () {
    return {
      isComponentModalActive: false,
      fetched_items: [],
      words: 'cancer cell CDK2',
      text: '',
      form: {
        disease: '',
        pathway: ''
      }
    }
  },

  methods: {
    submit () {
      console.log('this.form.disease:: ', this.form.disease)
      let searchParam = ''
      if (this.form.pathway !== '') {
        searchParam = this.form.disease + ' ' + this.form.pathway
      } else {
        searchParam = this.form.disease
      }

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
  margin: 40px 0 0;
  margin-bottom: 20px;
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
