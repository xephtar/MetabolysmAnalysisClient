<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Result</p>
    </header>
    <section class="modal-card-body">
      <b-field label="Title">
        <b-input type="text" v-model="todo.name">
        </b-input>
      </b-field>

      <b-field label="Result">
        <b-field type="text">
          <b-input type="text" v-model="todo.doi">
          </b-input>
        </b-field>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <button class="button" type="button" @click="$parent.close()">
        Close
      </button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'ShowModal',
  props: {
    todo: {
      type: Object,
      required: true
    },
    priorities: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      authors: '',
      doi: ''
    }
  },
  mounted () {
    this.authors = this.todo.todo
    this.doi = this.todo.priority
  },
  methods: {}
}
</script>

<style scoped></style>
