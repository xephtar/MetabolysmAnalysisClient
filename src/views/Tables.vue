<template>
  <div class="hello">
    <h2>Abstract Demo List</h2>
    <hr>
    <button type="button" class="btn btn-sm btn-outline-success" v-on:click="fetchAllData">LOAD ALL</button>
    <button type="button" class="btn btn-sm btn-outline-success" v-on:click="fetchDataWithParam('40')">LOAD 40 YO</button>
    <button type="button" class="btn btn-sm btn-outline-success" v-on:click="fetchDataWithParam('22')">LOAD 22 YO</button>
    <hr>
    <div class="content">
      <h3>Human Meta - Analysis List</h3>
      <table class="table">
        <thead>
        <tr>
          <th>NAME</th>
          <th>ID</th>
          <th>DOI</th>
          <th>ABSTRACT</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in fetched_items" :key="item.name">
          <td><img v-bind:src="item.img" alt="profile image" class="prof-img"> {{ item.name }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.doi }}</td>
          <td>
            <Highlighter class="my-highlight" :style="{ color: 'red' }"
                           highlightClassName="highlight"
                           :searchWords="keywords"
                           :autoEscape="true"
                           :textToHighlight=item.abstract_text
            />
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
import Highlighter from 'vue-highlight-words'
export default {

  components: {
    Highlighter
  },
  data () {
    return { fetched_items: [], words: 'cancer cell CDK2', text: '' }
  },

  methods: {
    fetchDataWithParam: function (ageParam) {
      axios.get('http://127.0.0.1:8000/api/articles/?search=' + ageParam).then(resp => {
        console.log('--- SUCCESS ---')
        this.fetched_items = []
        resp.data.results.forEach(x => this.fetched_items.push(x))
      }).catch(() => { console.log('--- ERROR ---') })
    },
    fetchAllData: function () {
      axios.get('http://127.0.0.1:8000/api/articles/?search=cancer').then(resp => {
        console.log('--- SUCCESS ---')
        this.fetched_items = []
        resp.data.results.forEach(x => this.fetched_items.push(x))
      }).catch(() => { console.log('--- ERROR ---') })
    }
  },
  computed: {
    keywords () {
      return this.words.split(' ')
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
  background-color: #42b983;
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
