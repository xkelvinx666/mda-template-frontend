<template>
  <flex-box-component full>
    <flex-item-component v-if="$slots.header">
      <slot name="header"></slot>
    </flex-item-component>
    <flex-item-component auto scroll>
      <div
        class="responsive-height-card-body"
        :class="{
          'responsive-height-card-body-padding-content': isPaddingContent
        }"
      >
        <slot></slot>
      </div>
    </flex-item-component>
    <flex-item-component v-if="$slots.footer">
      <slot name="footer"></slot>
    </flex-item-component>
  </flex-box-component>
</template>

<script>
// 参考https://pocill.com/2018/10/25/%E4%BD%BF%E7%94%A8flex%E8%BF%9B%E8%A1%8C%E7%A7%BB%E5%8A%A8%E7%AB%AF%E8%87%AA%E9%80%82%E5%BA%94%E6%BB%A1%E5%B1%8F%E5%B8%83%E5%B1%80.html
import FlexBoxComponent from './height/FlexBox'
import FlexItemComponent from './height/FlexItem'
export default {
  name: 'ResponsiveHeightCard',
  components: {
    FlexBoxComponent,
    FlexItemComponent
  },
  props: {
    isPaddingContent: {
      type: Boolean,
      default: false
    },
    isScroll: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.responsive-height-card-body {
  width: 100%;
  height: 100%;
}
.responsive-height-card-body.responsive-height-card-body-padding-content {
  padding: 10px 5px;
}
</style>
