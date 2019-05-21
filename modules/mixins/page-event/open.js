// 打开新的标签页
export default {
  methods: {
    open(url, title = '_blank') {
      window.open(url, title)
    }
  }
}
