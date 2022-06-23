/* eslint-disable no-restricted-globals */
import axios from "axios"

axios.defaults.baseURL = "http://localhost:3001/api"
axios.defaults.withCredentials = true

axios.interceptors.response.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    if (error.response.status === 401) {
      location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default axios.default
