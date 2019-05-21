<template>
  <div
    class="responsive-height-flex-item-flex-box"
    :class="{
      'responsive-height-flex-item-flex-box-full': full,
      'responsive-height-flex-item-flex-box-row': row
    }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ResponsiveHeightFlexBox',
  props: {
    full: {
      type: Boolean,
      default: false
    },
    row: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.responsive-height-flex-item-flex-box {
  display: flex;
  flex-direction: column;
}
.responsive-height-flex-item-flex-box.responsive-height-flex-item-flex-box-full {
  width: 100%;
  height: 100%;
}
.responsive-height-flex-item-flex-box.responsive-height-flex-item-flex-box-row {
  flex-direction: row;
}
</style>
