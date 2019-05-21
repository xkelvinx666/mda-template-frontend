<template>
  <a-form :layout="inline ? 'inline' : 'horizontal'">
    <a-form-item
      v-for="{
        prop,
        displayProp,
        label,
        type,
        enums,
        props,
        listComponent,
        isFull
      } in configs"
      :key="prop"
      v-bind="inline ? {} : defaultFormItemLayout"
      :label="label"
    >
      <slot :name="prop">
        <!--优先使用动态组件处理-->
        <component
          :is="listComponent"
          v-if="listComponent"
          :data.sync="isFull ? data : data[prop]"
        />
        <!--专用显示字段-->
        <span v-else-if="displayProp">{{
          data[displayProp] | mapArray | mapDefault
        }}</span>
        <!--使用枚举显示字段信息-->
        <span v-else-if="enums">{{
          data[prop] | mapEnums(enums) | mapDefault
        }}</span>
        <!--默认显示-->
        <span v-else>{{ data[prop] | mapArray | mapDefault }}</span>
      </slot>
    </a-form-item>
    <slot></slot>
  </a-form>
</template>

<script>
import filters from '@/modules/filters/list'
export default {
  name: 'TemplateFormList',
  filters,
  props: {
    inline: {
      type: Boolean,
      default: false
    },
    configs: {
      type: Array,
      default() {
        return []
      }
    },
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      defaultFormItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 2 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 22 }
        }
      }
    }
  }
}
</script>
