import { getResponse } from '@/utils'
import { axios } from '@/utils/request'

// 插件列表
export const getAllPluginListApi = async () => getResponse<string[]>(await axios.get('/plugins'))

// 已加载的插件列表
export const getLoadedPluginListApi = async () =>
  getResponse<string[]>(await axios.get('/plugins/loaded'))

// 自启动列表
export const getAutoLoadsApi = async () =>
  getResponse<string[]>(await axios.get('/plugins/autoLoads'))
