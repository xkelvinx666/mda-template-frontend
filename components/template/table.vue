<template>
  <a-table :data-source="datas" row-key="id" bordered :pagination="false">
    <a-table-column
      v-for="{ prop, displayProp, enums, label, listComponent } in configs"
      :key="prop"
      :title="label"
    >
      <template slot-scope="row">
        <!--优先使用动态组件处理-->
        <component
          :is="listComponent"
          v-if="listComponent"
          :data.sync="isFull ? row : row[prop]"
        />
        <!--专用显示字段-->
        <span v-else-if="displayProp">{{
          row[displayProp] | mapArray | mapDefault
        }}</span>
        <!--使用枚举显示字段信息-->
        <span v-else-if="enums">{{
          row[prop] | mapEnums(enums) | mapDefault
        }}</span>
        <!--默认显示-->
        <span v-else>{{ row[prop] | mapArray | mapDefault }}</span>
      </template>
    </a-table-column>
    <slot></slot>
  </a-table>
</template>

<script>
import filters from '@/modules/filters/list'
import ATableColumn from 'ant-design-vue/es/table/Column'
export default {
  name: 'TemplateTable',
  components: { ATableColumn },
  // 过滤器，控制文本显示
  filters,
  // 动态传入配置和数据
  props: {
    configs: {
      type: Array,
      default() {
        return []
      }
    },
    datas: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
