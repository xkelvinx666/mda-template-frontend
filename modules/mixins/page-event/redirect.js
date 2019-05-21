// 处理重定向的mixins
export default {
  methods: {
    redirect: function(location) {
      if (window.location.pathname !== location) {
        window.location.href = location
      }
    }
  }
}
