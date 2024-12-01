import { getResponse } from '@/utils'
import { axios } from '@/utils/request'

// 获取
export const getSettingsApi = async () =>
  getResponse<Record<string, Record<string, any>>>(await axios.get('/settings'))

// 保存
export const saveSettingsApi = async (data: Record<string, any>) =>
  getResponse<null>(await axios.put('/settings', data))
