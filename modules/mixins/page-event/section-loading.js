// 配合element-ui的v-loading进行局部加载，可以通过覆盖beforeLoading和afterLoading处理加载前后回调
export default {
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    beforeLoading() {},
    afterLoading() {},
    loading() {
      this.beforeLoading()
      this.isLoading = true
    },
    loaded() {
      this.afterLoading()
      this.isLoading = false
    }
  }
}
