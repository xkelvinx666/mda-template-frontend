export default {
  data() {
    return {
      // 第一次请求延时时长
      delay: 1000,
      // 记录interval的id, 用于清除轮询计时器
      interval: 0,
      // 轮询请求的时间间隔
      time: 10000
    }
  },
  methods: {
    // 执行通知轮询请求
    startReq() {
      setTimeout(() => {
        this.loopEvent()
      }, this.delay)
      this.interval = setInterval(() => {
        this.loopEvent()
      }, this.time)
    },
    // 覆盖此方法实现轮询事件
    loopEvent() {
      console.log('当前页面加载了轮询，并且未设置要轮询执行的loopEvent方法')
    },
    endReq() {
      clearInterval(this.interval)
    }
  }
}
