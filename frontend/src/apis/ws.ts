import { getResponse } from '@/utils'
import { axios } from '@/utils/request'

// 状态
export const getStatusApi = async () =>
  getResponse<{
    status: boolean
  }>(await axios.get('/ws'))
