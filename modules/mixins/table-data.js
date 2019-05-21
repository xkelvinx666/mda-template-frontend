import SectionLoadingMixin from '@/modules/mixins/page-event/section-loading'
export default {
  mixins: [SectionLoadingMixin],
  data() {
    return {
      param: {},
      query: {
        limit: 10,
        offset: 0
      },
      datas: [],
      total: 0
    }
  },
  computed: {
    currentPage() {
      return ((this.query.offset + 1) * this.query.limit) % this.total
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handlePageChange(page) {
      this.query.offset = (page - 1) * this.query.limit
      this.fetchData(this.params)
    },
    async handleTableChange(params = this.params, query = this.query) {
      this.loading()
      this.params = params
      await this.fetchData(params, query)
      this.$nextTick(() => {
        this.loaded()
      })
    },
    async fetchData(params = this.params, query = this.query) {}
  }
}
