import type { NyaResponse } from '@/types'
import type { AxiosResponse } from 'axios'

export const getResponse = async <T>(response: AxiosResponse<NyaResponse<T>>) => response.data
