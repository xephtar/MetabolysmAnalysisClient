import httpClient from './httpClient'

const END_POINT = 'http://localhost:8000/api/articles'

// const getAllUsers = () => httpClient.get(END_POINT)

// you can pass arguments to use as request parameters/data
const getSearch = (search) => httpClient.get(END_POINT, { search })
// maybe more than one..
// const createUser = (username, password) => httpClient.post(END_POINT, { username, password })

export {
  // getAllUsers,
  getSearch
  // createUser
}
