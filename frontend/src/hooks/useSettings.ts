import type { SystemConfigKey, settingType } from '@/types'
import { ref } from 'vue'

export const systemConfigs = ref<Record<SystemConfigKey, Record<string, settingType>>>({
  http: {
    port: {
      title: '启动端口',
      placeholder: '1241',
      valueType: 'number',
      value: ''
    }
    // component: {
    //   title: 'Example 1',
    //   type: 'component',
    //   value: '',
    //   // component: ExampleComponent,
    //   condition: (v) => !!v.switch.value
    // },
    // switch: {
    //   title: 'Example 2',
    //   type: 'switch',
    //   value: ''
    // }
    // select: {
    //   title: 'Example 3',
    //   subtitle: '',
    //   type: 'select',
    //   selectOptions: [
    //     { label: '亮', value: 'light' },
    //     { label: '暗', value: 'dark' }
    //   ],
    //   value: ''
    // }
  },
  o: {
    http: {
      title: 'HTTP API 地址',
      subtitle: '请输入 OneBot HTTP API 地址，末尾不要 /',
      value: ''
    },

    ws: {
      title: 'Websocket 地址',
      subtitle: '请输入 OneBot Websocket 地址，末尾不要 /',
      value: ''
    },

    key: {
      title: 'Access Token',
      subtitle: '请输入 OneBot API Token',
      value: ''
    },

    admin: {
      title: '管理员 QQ',
      subtitle: '请输入管理员 QQ 号，如有多个可用逗号分割',
      type: 'textarea',
      value: ''
    }
  },

  plugin: {
    entry: {
      title: '入口文件',
      subtitle: '如果你不知道自己在做什么，请不要更改此选项！',
      placeholder: 'main.js',
      value: ''
    },

    autoLoads: {
      title: '自启动插件列表',
      subtitle: '请输入插件名称，如有多个可用逗号分割。（可在“插件管理”页面进行可视化管理）',
      type: 'textarea',
      value: ''
    }
  }
})
