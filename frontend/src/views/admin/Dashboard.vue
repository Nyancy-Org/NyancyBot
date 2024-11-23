<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useElementSize } from '@vueuse/core'
import { getAllPluginListApi, getLoadedPluginListApi, getAutoLoadsApi } from '@/apis/plugins'
import { getStatusApi } from '@/apis/ws'

const c1 = ref<HTMLElement>(),
  { height: c1_h } = useElementSize(c1),
  loading = ref(false),
  plugins = ref<string[]>([]),
  loaded = ref<string[]>([]),
  autoLoads = ref<string[]>([]),
  ws = ref<boolean>(false)

// 获取数据
const initData = async () => {
  loading.value = true
  plugins.value = await getAllPluginListApi()
  loaded.value = await getLoadedPluginListApi()
  autoLoads.value = await getAutoLoadsApi()
  ws.value = (await getStatusApi()).status
  loading.value = false
}

const statisticCard = computed(() => [
  {
    title: '插件数量',
    count: plugins.value.length,
    textClass: 'text-orange-lighten-2',
    icon: {
      name: 'puzzle-outline',
      class: 'a-icon-shadow',
      color: 'orange-lighten-2'
    },
    btn: {
      text: '插件管理',
      color: 'orange',
      to: '/admin/plugins'
    }
  },
  {
    title: '正在运行',
    count: loaded.value.length,
    textClass: 'text-deep-purple-lighten-2',
    icon: {
      name: 'bike-fast',
      class: 'b-icon-shadow',
      color: 'deep-purple-lighten-2'
    },
    btn: {
      text: '插件管理',
      color: 'deep-purple',
      to: '/admin/plugins'
    }
  },
  {
    title: '自启动个数',
    count: autoLoads.value.length,
    textClass: 'text-indigo-lighten-2',
    icon: {
      name: 'rocket-launch-outline',
      class: 'c-icon-shadow',
      color: 'indigo-lighten-2'
    },
    btn: {
      text: '插件管理',
      color: 'indigo',
      to: '/admin/plugins'
    }
  }
])

onMounted(() => {
  initData()
})
</script>

<template>
  <v-row>
    <v-col cols="12" xs="12" sm="6" md="4" xl="3" v-for="(item, i) in statisticCard" :key="i">
      <v-card variant="outlined" :loading="loading" :disabled="loading">
        <v-card-title> {{ item.title }} </v-card-title>

        <v-card-text class="py-0">
          <v-row align="center" no-gutters>
            <v-col class="text-h2" :class="item.textClass" cols="8">{{ item.count }} </v-col>

            <v-col class="text-right" cols="4">
              <v-icon
                :class="item.icon.class"
                :color="item.icon.color"
                :icon="`mdi-${item.icon.name}`"
                size="88"
              ></v-icon>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn block :color="item.btn.color" :to="item.btn.to"> {{ item.btn.text }} </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" xs="12" sm="6" md="4" xl="3">
      <v-card v-if="ws" variant="outlined" ref="c1" :loading="loading" :disabled="loading">
        <v-card-title> Websocket 状态 </v-card-title>

        <v-card-text class="py-0">
          <v-row align="center" no-gutters>
            <v-col class="text-h4 text-teal" cols="8"> 已连接 </v-col>

            <v-col class="text-right" cols="4">
              <v-icon class="d-icon-shadow" color="teal" icon="mdi-web" size="88"></v-icon>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn block color="teal" to="/admin/ws"> 状态控制 </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else variant="outlined" ref="c1" :loading="loading" :disabled="loading">
        <v-card-title> Websocket 状态 </v-card-title>

        <v-card-text class="py-0">
          <v-row align="center" no-gutters>
            <v-col class="text-h4 text-red" cols="8"> 已断开！ </v-col>

            <v-col class="text-right" cols="4">
              <v-icon class="d-2-icon-shadow" color="red" icon="mdi-web-off" size="88"></v-icon>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn block color="red" to="/admin/ws"> 状态控制 </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12" xs="12" sm="12" md="8" xl="6">
      <v-card variant="outlined" :disabled="loading" @click="initData">
        <v-img
          src="https://api.imlazy.ink/img/"
          loading="lazy"
          cover
          :height="c1_h"
          alt="Random image"
        ></v-img>
      </v-card>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.a-icon-shadow {
  text-shadow: -3px 3px 10px #e5b6717d, 3px -3px 10px #db9b7d8c;
}

.b-icon-shadow {
  text-shadow: -23px 0px 10px #ab71da61, 8px 0px 10px #4e99d5eb;
}

.c-icon-shadow {
  text-shadow: -7px 7px 10px #72747e7d, 3px -3px 10px #ad81ed85;
}

.d-icon-shadow {
  text-shadow: 0px 0px 20px #7ffff070;
}

.d-2-icon-shadow {
  text-shadow: 0px 0px 20px #ff7f7f70;
}
</style>
