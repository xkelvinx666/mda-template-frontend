<template>
  <a-layout class="main-layout">
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item
          v-for="{ name, path, icon } in sidebarRoutes"
          :key="name"
          :class="{ 'ant-menu-item-selected': path === $route.path }"
        >
          <nuxt-link :to="path">
            <a-icon :type="icon" />
            <span>{{ name }}</span>
          </nuxt-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="main-header">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="collapsed = !collapsed"
        />
      </a-layout-header>
      <a-layout-content class="main-content">
        <nuxt />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import ALayoutSider from 'ant-design-vue/es/layout/Sider'
import { sidebarRoutes } from '@/configs/router'

export default {
  components: { ALayoutSider },
  head() {
    return {
      title: 'Model Driven Architecture',
      meta: [
        {
          hid: 'default-viewport',
          name: 'viewport',
          content:
            'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no'
        },
        {
          hid: 'default-msapplication-tap-highlight',
          name: 'msapplication-tap-highlight',
          content: 'no'
        },
        {
          hid: 'default-apple-mobile-web-app-capablt',
          name: 'apple-mobile-web-app-capabl',
          content: 'yes'
        },
        {
          hid: 'default-robots',
          name: 'robots',
          content: 'noindex,noarchive'
        },
        {
          hid: 'default-X-UA-Compatibl',
          'http-equiv': 'X-UA-Compatible',
          content: 'IE=Edge,chrome=1'
        },
        {
          hid: 'default-renderer',
          name: 'renderer',
          content: 'webkit'
        },
        {
          hid: 'default-Copyright',
          name: 'Copyright',
          content: 'captaincai, jinbiaocai, caijinbiao'
        },
        {
          hid: 'default-Description',
          name: 'Description',
          content: 'Model Driven Architecture, 旨在实现模型抽象的后台系统'
        },
        {
          hid: 'default-Keywords',
          name: 'Keywords',
          content: 'Model Driven Architecture, 模型抽象, mda'
        }
      ]
    }
  },
  data() {
    return {
      collapsed: false,
      sidebarRoutes
    }
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
#__nuxt,
#__layout {
  height: 100%;
  width: 100%;
}
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>

<style scoped>
.main-layout {
  height: 100%;
  width: 100%;
}
.main-layout .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.main-layout .trigger:hover {
  color: #1890ff;
}
.main-header {
  background: #fff;
  padding: 0;
}
.main-content {
  margin: 24px 16px;
  padding: 24px;
  background: #fff;
  min-height: 280px;
}
</style>
