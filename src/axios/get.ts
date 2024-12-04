import axios from 'axios'

export const get = axios({
  method: 'get',
  url: '/todos/1',
  // responseType: 'stream'
  baseURL: 'https://jsonplaceholder.typicode.com',

  params: { // in the url
    id: 'ddsd'
  },

  // serializes params before sending them to the server
  // paramsSerializer: function (params) {
  //   console.log(params)
  //   return JSON.stringify(params)
  // },

})
