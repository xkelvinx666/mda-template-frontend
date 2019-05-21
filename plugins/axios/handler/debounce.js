import axios from 'axios'

const queue = []
const DELAY = 500

const { CancelToken } = axios
const source = CancelToken.source()

function exists(_url, _method, _params, _data) {
  return queue.some(({ url, method, params, data }) => {
    return (
      url === _url &&
      method === _method &&
      Object.is(params, _params) &&
      Object.is(data, _data)
    )
  })
}

function add(url, method, params, data) {
  queue.push({
    url,
    method,
    params,
    data
  })
}

function remove(_url, _method, _params, _data) {
  const request = queue.find(({ url, method, params, data }) => {
    return (
      url === _url &&
      method === _method &&
      Object.is(params, _params) &&
      Object.is(data, _data)
    )
  })
  if (request) {
    queue.splice(queue.indexOf(request), 1)
  }
}

/**
 * 防抖函数
 * 一定时间内队列只能有一个同一个url请求
 * 以url和method作为请求的唯一标志
 */
export default {
  requestResolve(config) {
    const { debounce = true } = config
    if (debounce) {
      const { url, method, params, data } = config
      if (!exists(url, method, params, data)) {
        add(url, method, params, data)
        setTimeout(() => {
          remove(url, method, params, data)
        }, DELAY)
      } else {
        config.cancelToken = source.token
        source.cancel('cancel request because of debounce')
      }
    }
    // 必须返回config，否则会无视修改
    return config
  }
}
