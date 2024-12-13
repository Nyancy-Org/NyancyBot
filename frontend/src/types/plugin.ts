export interface PluginList {
  name: string
  enabled: boolean
  autoLoad: boolean
}

export interface PluginConfig {
  name: string // 插件名称
  note: string // 插件说明
  value: any // 插件值，可以根据需要更改类型
}
