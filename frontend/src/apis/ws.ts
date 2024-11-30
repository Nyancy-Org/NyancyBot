import { getResponse } from '@/utils'
import { axios } from '@/utils/request'

// 获取状态
export const getStatusApi = async () =>
  getResponse<{
    status: boolean
  }>(await axios.get('/ws'))

// 设置状态
export const setStatusApi = async (status: boolean) =>
  getResponse<{
    status: boolean
  }>(await axios.post('/ws/action', { action: status ? 0 : 1 }))
