import axios from 'axios'

const httpClient = axios.create({
  baseUrl: process.env.VUE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
    // anything you want to add to the headers
  }
})

export default httpClient
