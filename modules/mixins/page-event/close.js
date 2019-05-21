export default {
  methods: {
    close() {
      if (navigator.userAgent.indexOf('MSIE') > 0) {
        if (navigator.userAgent.indexOf('MSIE 6.0') > 0) {
          window.opener = null
          window.close()
        } else {
          window.open('', '_top')
          window.top.close()
        }
      } else if (navigator.userAgent.indexOf('Firefox') > 0) {
        window.location.href = 'about:blank '
      } else {
        window.opener = null
        window.open('', '_self', '')
        window.close()
      }
    }
  }
}
