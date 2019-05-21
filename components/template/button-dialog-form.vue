<template>
  <button-dialog
    ref="dialog"
    v-bind="$attrs"
    @open="resetParams"
    @ok="handleOk"
  >
    <template-from
      ref="form"
      :params="params"
      :configs="configs"
      @submit="handleSubmit"
    />
  </button-dialog>
</template>

<script>
import ButtonDialog from '@/components/template/button-dialog'
import TemplateFrom from '@/components/template/form'
import EditDataMixin from '@/modules/mixins/edit-data'

export default {
  name: 'ButtonDialogForm',
  components: {
    ButtonDialog,
    TemplateFrom
  },
  mixins: [EditDataMixin],
  inheritAttrs: false,
  props: {
    configs: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleOk() {
      this.$refs.form.submit()
    },
    handleSubmit(result) {
      this.$emit('submit', result)
      this.$refs.dialog && this.$refs.dialog.closeDialog()
    }
  }
}
</script>
