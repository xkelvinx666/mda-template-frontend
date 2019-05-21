import axios from 'axios'

export default {
  responseReject(error) {
    if (axios.isCancel(error)) {
      return error
    } else {
      return Promise.reject(error)
    }
  }
}
