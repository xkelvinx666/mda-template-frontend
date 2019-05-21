import LoopEventMixin from './loop-event'

export default {
  mixins: [LoopEventMixin],
  created() {
    this.regEvent()
  },
  methods: {
    // 注册窗口监听事件
    regEvent() {
      this.startReq()
      /**
       * 修复Firefox环境无法监听window.blur
       */
      window.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.endReq()
        }
      })
      window.addEventListener('blur', this.endReq)
      window.addEventListener('focus', this.startReq)
    },
    unRegEvent() {
      this.endReq()
      window.removeEventListener('blur', this.endReq)
      window.removeEventListener('focus', this.startReq)
    }
  }
}
