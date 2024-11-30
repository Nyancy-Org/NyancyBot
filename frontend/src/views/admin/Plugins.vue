<script lang="ts" setup>
import { ref } from 'vue'
import { indexStore } from '@/stores'
import { getAllPluginListApi, togglePluginApi, setPluginAutoLoadApi } from '@/apis/plugins'
import _ from 'lodash'
import type { PluginList } from '@/types/plugin'

const { showMsg } = indexStore(),
  headers = ref([
    { key: 'name', title: '插件名称' },
    { key: 'enabled', title: '状态' },
    { key: 'autoLoad', title: '自启动' },
    { key: 'operate', title: '操作', sortable: false }
  ]),
  oDialog = ref<InstanceType<any>>(),
  serverItems = ref<PluginList[]>([]),
  totalItems = ref(0),
  loading = ref(false)

// 获取数据
const loadItems = _.throttle(async () => {
  try {
    loading.value = true
    const { data } = await getAllPluginListApi()
    loading.value = false
    serverItems.value = data
    totalItems.value = data.length
  } catch (err: any) {
    loading.value = false
    console.error(err)
  }
}, 1000)

const refreshItems = () => loadItems()

const toggleItem = async (item: PluginList) => {
  const { msg } = await togglePluginApi(item)
  showMsg(msg, 'green')
  loadItems()
}

const setAutoLoad = async (item: PluginList) => {
  const { msg } = await setPluginAutoLoadApi(item)
  showMsg(msg, 'green')
  loadItems()
}

onMounted(() => {
  loadItems()
})
</script>

<template>
  <div>
    <div class="d-flex flex-wrap align-center ga-3">
      <div class="me-auto text-h6">插件管理</div>

      <div class="d-flex align-center ga-4">
        <v-btn
          @click="refreshItems"
          :loading="loading"
          prepend-icon="mdi-refresh"
          variant="outlined"
          color="primary"
          >刷新</v-btn
        >
      </div>
    </div>

    <v-card class="mt-5" variant="outlined">
      <v-card-text>
        <v-data-table-server
          :headers="headers"
          :items-length="totalItems"
          :items="serverItems"
          :loading="loading"
          hover
          color="transparent"
          @update:options="loadItems"
        >
          <template v-slot:[`item.enabled`]="{ item }">
            <v-chip
              v-if="item.enabled"
              color="green"
              prepend-icon="mdi-check-circle-outline"
              @click="toggleItem(item)"
            >
              开启
            </v-chip>
            <v-chip
              v-else
              color="grey"
              prepend-icon="mdi-close-circle-outline"
              @click="toggleItem(item)"
            >
              关闭
            </v-chip>
          </template>
          <template v-slot:[`item.autoLoad`]="{ item }">
            <v-switch
              v-model="item.autoLoad"
              color="primary"
              hide-details
              @change="setAutoLoad(item)"
            >
            </v-switch>
          </template>
          <template v-slot:[`item.operate`]="{ item }">
            <v-btn icon="mdi-trash-can-outline" variant="text" size="small" color="red"></v-btn>
          </template>
        </v-data-table-server>
      </v-card-text>
    </v-card>
  </div>
</template>
