<template>
  <div
    class="responsive-width-container"
    :style="{
      minWidth: minWidth,
      paddingLeft: leftWidthPx,
      paddingRight: rightWidthPx
    }"
  >
    <div class="responsive-width-body responsive-width-column">
      <slot></slot>
    </div>
    <div
      v-if="$slots.left"
      class="responsive-width-left responsive-width-column"
      :style="{ width: leftWidthPx, right: leftWidthPx }"
    >
      <slot name="left"></slot>
    </div>
    <div
      v-if="$slots.right"
      class="responsive-width-right responsive-width-column"
      :style="{ width: rightWidthPx, marginRight: rightPx }"
    >
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResponsiveWidthCard',
  props: {
    leftWidth: {
      type: Number,
      default: 0
    },
    rightWidth: {
      type: Number,
      default: 0
    }
  },
  computed: {
    minWidth() {
      const minWidth = this.leftWidth + this.rightWidth
      return `${minWidth}px`
    },
    leftWidthPx() {
      return `${this.leftWidth}px`
    },
    rightWidthPx() {
      return `${this.rightWidth}px`
    },
    rightPx() {
      return `-${this.rightWidth}px`
    }
  }
}
</script>

<style scoped>
.responsive-width-container {
  height: 100%;
  overflow: hidden;
}
.responsive-width-container > .responsive-width-column {
  position: relative;
  float: left;
  height: 100%;
}
.responsive-width-container > .responsive-width-left {
  margin-left: -100%;
  overflow: auto;
}
.responsive-width-container > .responsive-width-body {
  width: 100%;
}
.responsive-width-container > .responsive-width-right {
  overflow: auto;
}
</style>
