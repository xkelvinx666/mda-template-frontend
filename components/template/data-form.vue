<template>
  <template-form ref="form" :configs="configs" :params="params" />
</template>

<script>
import TemplateForm from './form'
import EditDataMixin from '@/modules/mixins/edit-data'

export default {
  name: 'TemplateDataForm',
  components: {
    TemplateForm
  },
  mixins: [EditDataMixin],
  props: {
    configs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  mounted() {
    // 传递插槽
    this.$refs.form.$slots = this.$slots
    this.$refs.form.$scopedSlots = this.$scopedSlots
  },
  methods: {
    resetParams() {
      // 重置数据时，先传递默认值，再填充传入的原始数据
      this.$refs.form && this.$refs.form.resetParams()
      this.updateParams()
    },
    // 移除不在配置文件中的数据
    filterConfigs(params) {
      const configKeys = this.configs.reduce(
        (propKeys, { prop, props }) => propKeys.concat(prop).concat(props),
        []
      )
      Object.keys(params)
        .filter(key => {
          return !configKeys.includes(key)
        })
        .forEach(key => {
          this.$set(params, key, undefined)
          delete params[key]
        })
    },
    submit() {
      const result = this.$refs.form && this.$refs.form.submit()
      this.filterConfigs(result)
      return result
    },
    beforeUpdateParams() {
      this.$refs.form && this.$refs.form.resetParams()
    },
    afterUpdateParams(params) {
      this.$refs.form && this.$refs.form.updateExtraParams()
    }
  }
}
</script>
