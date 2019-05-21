import { isNotSet } from '@/modules/utils/set'

export default {
  props: {
    data: {
      type: [Object, Array],
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      params: {}
    }
  },
  watch: {
    data(data) {
      // 需要有严格变化才会触发更新
      if (!Object.is(this.params, data)) {
        this.updateParams()
      }
    }
  },
  methods: {
    beforeSubmit(params) {},
    submit(callback) {
      this.beforeSubmit(this.params)
      this.$emit('submit', {
        params: this.params,
        callback
      })
    },
    beforeUpdateParams(params) {},
    afterUpdateParams(params) {},
    updateParams() {
      this.beforeUpdateParams(this.params)
      // 增加深拷贝，防止引用到内部属性
      const data = JSON.parse(JSON.stringify(this.data))
      Object.keys(data).forEach(key =>
        this.$set(
          this.params,
          key,
          isNotSet(data[key]) ? this.params[key] : data[key]
        )
      )
      this.afterUpdateParams(this.params)
    },
    resetParams() {
      this.beforeUpdateParams(this.params)
      const data = JSON.parse(JSON.stringify(this.data))
      this.params = data
      this.afterUpdateParams(data)
    }
  },
  mounted() {
    this.updateParams()
  }
}
