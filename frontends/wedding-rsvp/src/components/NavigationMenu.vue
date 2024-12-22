<script lang="ts">
import type { Component } from 'vue'
import { defineComponent, h, ref } from 'vue'
import { NIcon, NSpace, NSwitch, NLayout, NLayoutSider, NMenu } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon
} from '@vicons/ionicons5'
import router from '../router'

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: 'Admin Menu',
    key: 'admin-menu',
    icon: renderIcon(BookIcon),
    children: [
      {
        label: 'Manage Admins',
        key: 'ManageAdmins',
        icon: renderIcon(PersonIcon)
      },
      {
        label: 'Manage Accommodations',
        key: 'ManageAccommodations',
        icon: renderIcon(PersonIcon)
      },
      {
        label: 'Manage Guests',
        key: 'ManageGuests',
        icon: renderIcon(PersonIcon)
      },
      {
        label: 'Logout',
        key: 'AdminLogout',
        icon: renderIcon(PersonIcon)
      },
    ]
  }
]

export default defineComponent({
  name: 'NavigationMenu',
  components: {
    NIcon,
    NSpace,
    NSwitch,
    NLayout,
    NLayoutSider,
    NMenu,
  },
  setup() {

    const handleClick = (key: string) => {
      router.push({ name: key })
    }

    return {
      activeKey: ref<string | null>(null),
      collapsed: ref(false),
      menuOptions,
      handleClick,
    }
  }
})
</script>
<template>
  <n-space vertical>
    <n-layout has-sider>
      <n-layout-sider
        bordered
        :collapsed-width="64"
        :width="300"
        @expand="collapsed = false"
      >
        <n-menu
          v-model:value="activeKey"
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          :on-update:value="handleClick"
        />
      </n-layout-sider>
    </n-layout>
  </n-space>
</template>
