import axios from 'axios'

const api = axios.create({
  // baseURL: 'http://localhost:3000/api' || process.env.NEXT_APP_API_URL
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

export default api
