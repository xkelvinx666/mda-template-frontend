<template>
  <div
    class="responsive-height-flex-item"
    :class="{ 'responsive-height-flex-item-auto': auto }"
  >
    <slot v-if="!auto"></slot>
    <div
      v-else
      class="child"
      :class="{ 'responsive-height-flex-item-scroll': scroll }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResponsiveHeightFlexItem',
  props: {
    auto: {
      type: Boolean,
      default: false
    },
    scroll: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.responsive-height-flex-item {
  width: 100%;
  flex: 0 0 auto;
}
.responsive-height-flex-item.responsive-height-flex-item-auto {
  height: 0;
  flex: 1 1 auto;
  position: relative;
}
.responsive-height-flex-item > .child {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.responsive-height-flex-item > .child.responsive-height-flex-item-scroll {
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
