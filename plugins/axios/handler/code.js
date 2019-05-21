import { Modal } from 'ant-design-vue'

export default {
  responseReject(error) {
    // 如果配置设置自己处理异常, 就直接 reject
    if (error.config && error.config.handleError) {
      return Promise.reject(error)
    }
    if (!error.response) {
      // 极端情况下
      Modal.error({
        title: '请求错误',
        content: error.message || '请求发生错误, 请稍后再试'
      })
    }
    const { status = 0 } = error.response
    if (status === 422) {
      Modal.error({
        title: '参数错误',
        content: error.message || '422'
      })
    } else if (status === 413) {
      Modal.error({
        title: '请求内容错误413',
        content: '发送内容太大，请尝试修改发送内容'
      })
    } else if (status === 501) {
      Modal.error({
        title: '请求被拒绝(501)',
        content: '发送内容太大，请尝试修改发送内容'
      })
    } else if (status === 404) {
      Modal.error({
        title: '请求错误',
        content: '请求资源未找到'
      })
    } else if (status >= 400) {
      // 其它错误
      Modal.error({
        title: '请求错误',
        content: '请求发生错误, 请稍后再试'
      })
    } else {
      Promise.resolve()
    }
    return error.response
  }
}
