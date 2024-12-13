<script setup lang="ts">
import { ref } from 'vue'
import type { SystemConfigKey, settingType } from '@/types'
import type { VForm } from 'vuetify/components'
import { formatSetObj, objFilter } from '@/utils'
import { systemConfigs } from '@/hooks/useSettings'
import { getSettingsApi, saveSettingsApi } from '@/apis/settings'
import _ from 'lodash'

const loading = ref<boolean>(false),
  form = ref<InstanceType<typeof VForm>>(),
  activeTab = ref<SystemConfigKey>('http'),
  tabs: Record<SystemConfigKey, string> = {
    http: '系统',
    o: 'OneBot',
    plugin: '插件'
  }

const getConfig = async () => {
  let sysConfig: Record<string, Record<string, settingType>>
  try {
    loading.value = true
    sysConfig = (await getSettingsApi()).data

    for (const _key in sysConfig) {
      const key = _key as SystemConfigKey
      if (!(key in systemConfigs.value)) {
        systemConfigs.value[key] = {}
      }
      for (const k in sysConfig[key]) {
        if (!(k in systemConfigs.value[key])) {
          systemConfigs.value[key][k] = {
            value: sysConfig[key][k],
            title: k
          }
        } else {
          const c = systemConfigs.value[key][k]
          c.value = sysConfig[key][k]
        }
      }
    }
  } finally {
    loading.value = false
  }
}

const save = async () => {
  try {
    loading.value = true
    const o2 = formatSetObj(
      // {
      //   [activeTab.value]: systemConfigs.value[activeTab.value]
      // },
      systemConfigs.value,
      {
        port: 'number',
        admin: 'numArr',
        autoLoads: 'strArr'
      }
    )
    await saveSettingsApi(o2)
    getConfig()
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getConfig()
})
</script>

<template>
  <v-card>
    <v-tabs v-model="activeTab">
      <v-tab color="primary" v-for="(item, i) in tabs" :key="i" :text="item" :value="i"></v-tab>
    </v-tabs>
  </v-card>

  <v-tabs-window v-model="activeTab">
    <v-tabs-window-item v-for="(_, i) in tabs" :key="i" :value="i">
      <v-card flat :loading :disabled="loading">
        <v-card-text>
          <v-form ref="form" autocomplete="off" fast-fail @submit.prevent>
            <v-row
              class="mb-2"
              align="center"
              v-for="(key, j) in objFilter(systemConfigs[i])"
              :key="j"
              :class="key.extraClass"
            >
              <v-col cols="12" lg="6">
                <h3 class="mb-1">{{ key.title }}</h3>
                <div class="text-medium-emphasis">
                  {{ key.subtitle }}
                </div>
              </v-col>

              <v-col cols="12" lg="6">
                <v-textarea
                  v-if="key.type === 'textarea'"
                  v-model:model-value.lazy="key.value"
                  variant="outlined"
                  clearable
                  rows="2"
                  @change="save"
                ></v-textarea>
                <v-select
                  v-else-if="key.type === 'select'"
                  v-model="key.value"
                  variant="outlined"
                  density="compact"
                  item-title="label"
                  item-value="value"
                  :items="key.selectOptions"
                  :placeholder="key.placeholder"
                  :disabled="key.disabled"
                  @change="save"
                />
                <v-switch
                  v-else-if="key.type === 'switch'"
                  v-model="key.value"
                  color="primary"
                  hide-details
                  :disabled="key.disabled"
                  @change="save"
                />
                <component v-else-if="key.type === 'component'" :is="key.component" />
                <v-text-field
                  v-else
                  v-model.trim.lazy="key.value"
                  :type="key.valueType"
                  density="compact"
                  hide-details
                  clearable
                  @change="save"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            prepend-icon="mdi-refresh"
            variant="tonal"
            color="primary"
            @click="getConfig"
            :loading
          >
            刷新
          </v-btn>
          <v-spacer />
          <div class="text-body-2 text-disabled">
            温馨提示：绝大部分配置修改后需要重启才能生效！
          </div>
        </v-card-actions>
      </v-card>
    </v-tabs-window-item>
  </v-tabs-window>
</template>
