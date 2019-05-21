import filterParams from '@/modules/utils/filterParams'

// 移除参数未设置的情况
export default {
  requestResolve(config) {
    const { params, data } = config
    return {
      ...config,
      params: filterParams(params),
      data: filterParams(data)
    }
  }
}
