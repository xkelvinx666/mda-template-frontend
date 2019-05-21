import { isNotSet } from '@/modules/utils/set'

export default (params = {}) => {
  params = JSON.parse(JSON.stringify(params))
  // 移除空数组或空字符串参数
  Object.keys(params)
    .filter(key => {
      return isNotSet(params[key]) || params[key].length === 0
    })
    .forEach(key => {
      params[key] = undefined
      delete params[key]
    })
  return params
}
