import type { PluginList } from '@/types/plugin'
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
  getResponse<string>(
    await axios.post('/plugins/toggle/enabled', {
      name: plugin.name
    })
  )

// 设置插件自启动
export const setPluginAutoLoadApi = async (plugin: PluginList) =>
  getResponse<string>(
    await axios.post('/plugins/autoLoad', {
      name: plugin.name,
      enabled: plugin.autoLoad
    })
  )

// 删除插件
export const deletePluginApi = async (plugin: PluginList) =>
  getResponse<string>(
    await axios.delete('/plugins', {
      params: {
        name: plugin.name
      }
    })
  )
