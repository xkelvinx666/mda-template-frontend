<template>
  <a-form :layout="inline ? 'inline' : 'horizontal'">
    <a-form-item
      v-for="{
        prop,
        label,
        type,
        enums,
        props,
        required,
        editComponent,
        isFull,
        disabled,
        placeholder,
        inputClass,
        ...arg
      } in configs"
      :key="prop"
      v-bind="
        inline ? {} : label ? defaultFormItemLayout : noLabelFormItemLayout
      "
      :required="required && !isQuery"
      :label="label"
    >
      <slot :name="prop">
        <!--搜索时，不支持动态组件-->
        <template v-if="!(editComponent && isQuery)">
          <component
            :is="editComponent"
            v-if="editComponent"
            :class="inputClass"
            :data.sync="isFull ? params : params[prop]"
            :disabled="disabled"
            :placeholder="placeholder"
            v-bind="arg"
          />
          <a-select
            v-else-if="
              (type === 'multiple-select' || type === 'select') && enums
            "
            v-model="params[prop]"
            :class="inputClass"
            class="template-form-select"
            :mode="type === 'multiple-select' ? 'multiple' : 'default'"
            :disabled="disabled"
          >
            <a-select-option
              v-for="{ id, value } in enums"
              :key="id"
              :value="id"
            >
              {{ value }}
            </a-select-option>
          </a-select>
          <a-radio-group
            v-else-if="type === 'radio' && enums"
            v-model="params[prop]"
            :class="inputClass"
            :disabled="disabled"
          >
            <a-radio v-for="{ id, value } in enums" :key="id" :label="id">
              {{ value }}
            </a-radio>
          </a-radio-group>
          <a-input
            v-else
            v-model="params[prop]"
            :class="inputClass"
            :placeholder="placeholder || `请输入${label}`"
            :disabled="disabled"
          />
        </template>
      </slot>
    </a-form-item>
    <slot></slot>
  </a-form>
</template>

<script>
import { isSet, isNotSet } from '@/modules/utils/set'
import filterParams from '@/modules/utils/filterParams'

export default {
  name: 'TemplateForm',
  props: {
    isQuery: {
      type: Boolean,
      default: false
    },
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
    params: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      extraParams: {},
      defaultFormItemLayout: {
        labelCol: {
          xs: { span: 12 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 12 },
          sm: { span: 20 }
        }
      },
      noLabelFormItemLayout: {
        labelCol: {
          sm: { span: 0 }
        },
        wrapperCol: {
          sm: { span: 24 }
        }
      }
    }
  },
  computed: {
    uriParams() {
      return this.$route.query
    }
  },
  created() {
    this.registerParams()
  },
  methods: {
    registerParams() {
      // 为所有没有复合的props的字段注册监听
      this.configs
        .filter(({ props }) => {
          return !props
        })
        .forEach(({ prop }) => {
          isNotSet(this.params[prop]) && this.$set(this.params, prop, undefined)
        })
      // 注册复合props,并添加对应关系
      this.configs
        .filter(({ props }) => {
          return props
        })
        .forEach(({ prop, props }) => {
          props.forEach(prop => {
            isNotSet(this.params[prop]) &&
              this.$set(this.params, prop, undefined)
          })
        })
      this.updateExtraParams()
    },
    resetParams() {
      this.configs.forEach(({ prop, props = [], defaultValue }) => {
        const keys = [...props, prop]
        keys.forEach((prop, index) => {
          // 优先获取路径参数
          const uriValue = this.uriParams && this.uriParams[prop]
          // 复合条件时挨个赋值defaultValue
          const value = isSet(uriValue)
            ? uriValue
            : Array.isArray(defaultValue) && props.length > 0
            ? defaultValue[index]
            : defaultValue
          // 忽略undefined和null的深拷贝
          this.$set(
            this.params,
            prop,
            isSet(value) ? JSON.parse(JSON.stringify(value)) : undefined
          )
        })
      })
      this.updateExtraParams()
      this.$emit('reset')
      return this.filterParams()
    },
    updateExtraParams() {
      this.configs
        .filter(({ props }) => {
          return props
        })
        .forEach(({ prop, props }) => {
          const results = props.map(prop => {
            return this.params[prop]
          })
          this.$set(this.extraParams, prop, results)
        })
    },
    filterParams() {
      return filterParams(this.params)
    },
    submit() {
      this.$emit('before-submit')
      const params = this.filterParams()
      // 自动提示信息
      const requireds = this.configs.filter(({ required, prop, props }) => {
        return (
          !this.isQuery &&
          required &&
          (props
            ? props.some(prop => isNotSet(this.params[prop]))
            : isNotSet(this.params[prop]))
        )
      })
      if (requireds.length === 0) {
        this.$emit('submit', params)
      } else {
        const h = this.$createElement
        const messages = requireds.map(({ label }) => h('p', `${label}必填`))
        this.$error({
          title: '以下参数必填',
          content: h('div', {}, messages)
        })
        this.$emit('validate-error', params)
      }
    }
  }
}
</script>

<style scoped>
.template-form-select {
  min-width: 80px;
}
</style>
