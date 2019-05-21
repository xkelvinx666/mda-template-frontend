import axios from 'axios'
import hanlder from './handler'

const instance = axios.create({
  timeout: 2000,
  baseURL: 'api'
})

hanlder(instance)

export default instance
