<script lang="ts" setup>
import { ref } from 'vue'
import { indexStore } from '@/stores'
import { getStatusApi, setStatusApi } from '@/apis/ws'
import _ from 'lodash'

const { showMsg, openConfirmDialog } = indexStore(),
  loading = ref(false),
  ws = ref<boolean>(false)

// 获取数据
const loadItems = _.throttle(async () => {
  try {
    loading.value = true
    ws.value = (await getStatusApi()).data.status
    loading.value = false
  } catch (err: any) {
    loading.value = false
    console.error(err)
  }
}, 1000)

const toggleItem = async () => {
  await openConfirmDialog('警告', `你确定要 ${ws.value ? '关闭' : '开启'} 连接 ？`)
  const { msg } = await setStatusApi(ws.value)
  loadItems()
  return showMsg(msg, 'green')
}

onMounted(() => {
  loadItems()
})
</script>

<template>
  <v-row>
    <v-col cols="12" xs="12" sm="6" md="4" xl="3">
      <v-card v-if="ws" variant="outlined" :loading="loading" :disabled="loading">
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
          <v-btn block color="teal" :loading="loading" @click="toggleItem"> UwU </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else variant="outlined" :loading="loading" :disabled="loading">
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
          <v-btn block color="red" :loading="loading" @click="toggleItem"> QWQ </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
