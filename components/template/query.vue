<template>
  <form-component
    ref="form"
    inline
    :configs="configs"
    is-query
    @submit="handleSubmit"
  >
    <a-form-item>
      <a-button icon="search" type="primary" @click="handleQuery"
        >搜 索</a-button
      >
      <a-button class="query-reset-button" icon="reload" @click="resetParams"
        >重 置</a-button
      >
      <div class="query-extra-buttons">
        <slot name="extra-buttons"></slot>
      </div>
    </a-form-item>
  </form-component>
</template>

<script>
import FormComponent from './form'

export default {
  name: 'TemplateQuery',
  components: {
    FormComponent
  },
  props: {
    configs: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    resetParams() {
      this.$refs.form.resetParams()
    },
    handleQuery() {
      this.$refs.form && this.$refs.form.submit()
    },
    handleSubmit(params) {
      this.$emit('query', params)
    }
  }
}
</script>

<style scoped>
.query-reset-button,
.query-extra-buttons {
  display: inline-block;
  margin-left: 10px;
}
</style>
