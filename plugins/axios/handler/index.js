import codeHandler from './code'
import cancelHandler from './cancel'
import debounceHandler from './debounce'
import removeNullHandler from './remove-null'

const handlers = [
  removeNullHandler,
  debounceHandler,
  cancelHandler,
  codeHandler
]

/**
 * 如需继续处理需要返回config
 */
function normalResolve(config) {
  return config
}

/**
 * 如需继续处理reject需要返回Promise.reject
 */
function normalReject(error) {
  return Promise.reject(error)
}

/**
 * 单文件添加拦截器
 * resolve与reject函数格式参考以上两个函数
 */
export default function(axios) {
  handlers.forEach(
    ({
      requestResolve = normalResolve,
      requestReject = normalReject,
      responseResolve = normalResolve,
      responseReject = normalReject
    }) => {
      axios.interceptors.request.use(requestResolve, requestReject)
      axios.interceptors.response.use(responseResolve, responseReject)
    }
  )
}
