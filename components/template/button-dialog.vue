<template>
  <span>
    <a
      v-if="btnType === 'text'"
      href="javascript:void(0)"
      :style="btnStyle"
      :class="btnClass"
      @click.stop.prevent="open"
      >{{ btnText }}
    </a>
    <a-button
      v-else
      :type="btnType"
      :style="btnStyle"
      :class="btnClass"
      :icon="icon"
      :disabled="btnDisabled"
      :size="btnSize"
      @click.stop.prevent="open"
      >{{ btnText }}</a-button
    >
    <template v-if="isRenderDialog">
      <a-modal
        :width="width"
        :visible.sync="isShowDialog"
        :title="title"
        @open="opened"
        @close="close"
        @ok="ok"
        @cancel="closeDialog"
      >
        <slot></slot>
      </a-modal>
    </template>
  </span>
</template>

<script>
export default {
  name: 'ButtonDialog',
  inheritAttrs: false,
  props: {
    width: {
      type: String,
      default: '35%'
    },
    isSubmit: {
      type: Boolean,
      default: true
    },
    submitText: {
      type: String,
      default: '提交'
    },
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      required: true
    },
    btnDisabled: {
      type: Boolean,
      default: false
    },
    btnClass: {
      type: String,
      default: ''
    },
    btnText: {
      type: [String, Number],
      default: ''
    },
    btnType: {
      type: String,
      default: 'primary'
    },
    btnStyle: {
      type: Object,
      default() {
        return {}
      }
    },
    btnSize: {
      type: String,
      default: 'default'
    },
    tips: {
      type: String,
      default: ''
    },
    isValid: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isRenderDialog: false,
      isShowDialog: false
    }
  },
  methods: {
    open() {
      this.isRenderDialog = true
      this.$nextTick(() => {
        this.$emit('open')
        this.isShowDialog = true
      })
    },
    ok() {
      this.$emit('ok', this.closeDialog)
    },
    close() {
      this.$emit('close')
      this.$nextTick(() => {
        this.isRenderDialog = false
      })
    },
    closeDialog() {
      this.isShowDialog = false
      this.close()
    },
    opened() {
      this.$nextTick(() => {
        this.$emit('opened')
      })
    }
  }
}
</script>
