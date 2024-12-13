import type { PluginList, PluginConfig } from '@/types/plugin'
import { getResponse } from '@/utils'
import { axios } from '@/utils/request'

// 插件列表
export const getAllPluginListApi = async () =>
  getResponse<PluginList[]>(await axios.get('/plugins'))

// 已加载的插件列表
export const getLoadedPluginListApi = async () =>
  getResponse<string[]>(await axios.get('/plugins/loaded'))

// 自启动列表
export const getAutoLoadsApi = async () =>
  getResponse<string[]>(await axios.get('/plugins/autoLoads'))

// 切换插件状态
export const togglePluginApi = async (plugin: PluginList) =>
  getResponse<null>(
    await axios.post('/plugins/toggle/enabled', {
      name: plugin.name
    })
  )

// 设置插件自启动
export const setPluginAutoLoadApi = async (plugin: PluginList) =>
  getResponse<null>(
    await axios.post('/plugins/autoLoad', {
      name: plugin.name,
      enabled: plugin.autoLoad
    })
  )

// 删除插件
export const deletePluginApi = async (plugin: PluginList) =>
  getResponse<null>(
    await axios.delete('/plugins', {
      params: {
        name: plugin.name
      }
    })
  )

// 重载插件
export const reloadPluginApi = async (plugin: PluginList) =>
  getResponse<null>(
    await axios.post('/plugins/reload', {
      name: plugin.name
    })
  )

// 获取插件配置文件
export const getPluginConfigApi = async (name: string) =>
  getResponse<PluginConfig[]>(await axios.get(`/plugins/${name}/config`))

// 保存插件配置文件
export const savePluginConfigApi = async (name: string, data: Record<string, any>) =>
  getResponse<null>(await axios.put(`/plugins/${name}/config`, data))
