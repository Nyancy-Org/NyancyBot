<script setup lang="ts">
// import { userStore } from '@/stores/user'
// import md5 from 'md5'

const emit = defineEmits(['updateRail'])
// const { info } = userStore()

const menus = [
  {
    title: '仪表板',
    icon: 'view-dashboard-outline',
    color: 'primary',
    to: '/admin/dashboard'
  },
  {
    title: '插件管理',
    icon: 'puzzle-outline',
    color: 'orange',
    to: '/admin/plugins'
  },
  {
    title: '连接状态',
    icon: 'vector-link',
    color: 'teal',
    to: '/admin/ws'
  },
  {
    title: '查看日志',
    icon: 'script-text-key-outline',
    color: 'purple',
    to: '/admin/logs',
    disabled: true
  },
  {
    title: '系统配置',
    icon: 'cog-outline',
    color: 'blue-grey',
    to: '/admin/settings'
  }
]
</script>

<template>
  <v-list>
    <!-- <v-list-item :subtitle="info?.email" :title="`#${info?.id} ${info?.username}`">
      <template v-slot:prepend>
        <v-avatar @click.stop="eimt('updateRail')" class="cursor-pointer">
          <v-img
            :alt="`#${info?.id} ${info?.username}`"
            :src="`https://cdn.imlazy.ink:233/avatar/${md5(info?.email || '')}?s=64&r=R&d=`"
          ></v-img>
        </v-avatar>
      </template>
    </v-list-item> -->
    <v-list-item :subtitle="Date.now()" title="#1 System">
      <template v-slot:prepend>
        <v-avatar @click.stop="emit('updateRail')" class="cursor-pointer">
          <v-img
            src="https://cravatar.cn/avatar/b19a098dd3061f2fd0b180c54f4b40ea?s=64&r=R&d="
          ></v-img>
        </v-avatar>
      </template>
    </v-list-item>
  </v-list>
  <v-divider></v-divider>
  <v-list density="compact" nav>
    <v-list-item
      v-for="(item, i) in menus"
      :key="i"
      :prepend-icon="`mdi-${item.icon}`"
      :title="item.title"
      :to="item.to"
      :color="item.color"
      :disabled="item.disabled"
    ></v-list-item>
  </v-list>
  <!-- <v-divider></v-divider>
  <v-list density="compact" nav>
    <v-list-item
      prepend-icon="mdi-account-arrow-left-outline"
      title="返回用户中心"
      to="/user/info"
    ></v-list-item>
  </v-list> -->
</template>
