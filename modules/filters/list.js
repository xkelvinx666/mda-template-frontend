import { isSet } from '@/modules/utils/set'

export default {
  mapEnums(val, enums) {
    if (Array.isArray(enums)) {
      const match = enums.find(({ id }) => {
        return id === val
      })
      return match ? match.value : ''
    } else {
      return val
    }
  },
  mapArray(val) {
    return Array.isArray(val) ? val.join(',') : val
  },
  mapDefault(value) {
    return isSet(value) ? value : '--'
  }
}
