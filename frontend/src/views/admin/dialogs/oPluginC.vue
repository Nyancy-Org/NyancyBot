<script lang="ts" setup>
import { ref } from 'vue'
import type { VForm } from 'vuetify/lib/components/index.mjs'
import _ from 'lodash'
import type { PluginConfig } from '@/types/plugin'

const emit = defineEmits(['update']),
  form = ref<InstanceType<typeof VForm>>(),
  formData = ref<PluginConfig>({
    name: '',
    note: '',
    value: ''
  }),
  open = ref(false),
  numMode = ref(false)

const openDialog = (config: PluginConfig) => {
  open.value = true
  formData.value = _.cloneDeep(config)
  // formData.value.value = JSON.stringify(formData.value.value)
}

const handleOk = async () => {
  try {
    if (!form.value) return
    const { valid } = await form.value.validate()
    if (!valid) return
    if (numMode.value) {
      formData.value.value = formData.value.value.map((val: string) => Number(val))
    }
    emit('update', formData.value)
    handleCancel()
  } finally {
  }
}

const handleCancel = async () => {
  open.value = false
  form.value?.reset()
}

defineExpose({
  openDialog
})
</script>

<template>
  <v-dialog v-model="open" max-width="500" persistent>
    <v-card title="编辑" variant="flat">
      <v-card-text class="py-0">
        <v-form ref="form" fast-fail @submit.prevent>
          <v-text-field
            v-model="formData.note"
            :rules="[(v) => (v ? true : false)]"
            :clearable="false"
            label="备注"
            density="compact"
            readonly
            hide-details
          >
          </v-text-field>
          <v-switch
            v-if="typeof formData.value === 'boolean'"
            v-model="formData.value"
            color="primary"
            hide-details
          >
          </v-switch>
          <template v-else-if="Array.isArray(formData.value)">
            <v-switch v-model="numMode" color="primary" hide-details label="数字模式"> </v-switch>
            <v-text-field
              v-for="(_, i) in formData.value"
              :key="i"
              v-model="formData.value[i]"
              :type="numMode ? 'number' : 'text'"
              :rules="[(v) => (v ? true : false)]"
              clearable
              :label="`值 ${i + 1}`"
              density="compact"
              append-icon="mdi-delete"
              @click:append="formData.value.splice(i, 1)"
            ></v-text-field>
            <v-btn
              prepend-icon="mdi-plus"
              variant="tonal"
              block
              @click="formData.value.push('')"
              color="green"
              >添加</v-btn
            >
          </template>
          <v-textarea
            v-else
            v-model="formData.value"
            :rules="[(v) => (v && v.length > 0 ? true : false)]"
            clearable
            label="值"
            density="compact"
            variant="outlined"
          >
          </v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="handleCancel"> 取消 </v-btn>

        <v-btn @click="handleOk" color="primary"> 确定 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
