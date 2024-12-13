<script lang="ts" setup>
import { ref } from 'vue'
import { indexStore } from '@/stores'
import { getPluginConfigApi, savePluginConfigApi } from '@/apis/plugins'
import _ from 'lodash'
import type { PluginConfig } from '@/types/plugin'
import { useRouteParams } from '@vueuse/router'
import OPluginC from './dialogs/oPluginC.vue'

const name = useRouteParams('name'),
  { showMsg, openConfirmDialog } = indexStore(),
  headers = ref([
    { key: 'name', title: '配置名称' },
    { key: 'note', title: '说明' },
    { key: 'value', title: '当前值' },
    { key: 'operate', title: '操作', sortable: false }
  ]),
  oPDialog = ref<InstanceType<typeof OPluginC>>(),
  serverItems = ref<PluginConfig[]>([]),
  totalItems = ref(0),
  loading = ref(false)

// 获取数据
const loadItems = _.throttle(async () => {
  try {
    loading.value = true
    const { data } = await getPluginConfigApi(String(name.value))
    loading.value = false
    serverItems.value = data
    totalItems.value = data.length
  } catch (err: any) {
    loading.value = false
    console.error(err)
  }
}, 1000)

const saveItem = async (item: PluginConfig) => {
  const index = serverItems.value.findIndex((i) => i.name === item.name)
  if (index !== -1) {
    serverItems.value[index] = item
  }
  const transformedItems = serverItems.value.reduce((acc: any, item) => {
    acc[item.name] = item.value
    return acc
  }, {})
  const { msg } = await savePluginConfigApi(String(name.value), transformedItems)
  showMsg(msg, 'green')
  return loadItems()
}
onMounted(() => {
  loadItems()
})
</script>

<template>
  <div>
    <div class="d-flex flex-wrap align-center ga-3">
      <div class="me-auto text-h6">插件 {{ name }} 配置</div>

      <div class="d-flex align-center ga-4">
        <v-btn
          @click="$router.back"
          :loading="loading"
          prepend-icon="mdi-arrow-left"
          variant="text"
          color="warning"
          >返回</v-btn
        >
        <v-btn
          @click="loadItems"
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
          :hide-default-footer="true"
          hover
          color="transparent"
          @update:options="loadItems"
        >
          <template v-slot:[`item.operate`]="{ item }">
            <v-btn
              class="mr-4"
              icon="mdi-pencil"
              variant="text"
              size="small"
              color="primary"
              @click="oPDialog?.openDialog(item)"
            ></v-btn>
          </template>
        </v-data-table-server>
      </v-card-text>
    </v-card>
  </div>

  <OPluginC ref="oPDialog" @update="saveItem" />
</template>
