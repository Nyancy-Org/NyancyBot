import type { NyaResponse } from '@/types'
import type { AxiosResponse } from 'axios'

export const getResponse = async <T>(response: AxiosResponse<NyaResponse<T>>) => response.data

export const objFilter = <T>(
  obj: T & Record<string, any> & { condition?: (val: T) => boolean }
) => {
  const filteredConfigs: Record<string, any> = {}

  // 遍历所有属性
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const config = obj[key]

      // 检查是否有condition函数，并执行它
      if (typeof config.condition === 'function') {
        // 如果condition函数返回true，保留该属性
        if (config.condition(obj)) filteredConfigs[key] = config
      } else {
        // 如果没有condition函数，默认保留该属性
        filteredConfigs[key] = config
      }
    }
  }

  return filteredConfigs as T
}

type ToWhat = 'string' | 'number' | 'boolean' | 'strArr' | 'numArr'
export const formatSetVal = (val: any, toWhat: ToWhat) => {
  switch (toWhat) {
    case 'string':
      return String(val)
    case 'number':
      return Number(val)
    case 'boolean':
      return Boolean(val)
    case 'strArr':
      return Array.isArray(val) ? val : val.split(',')
    case 'numArr':
      return Array.isArray(val) ? val : val.split(',').map(Number)
    default:
      throw new Error('Invalid toWhat value')
  }
}

export const formatSetObj = (obj: Object, format?: Record<any, ToWhat>) => {
  const hasFormat = format && typeof format === 'object'

  return Object.entries(obj).reduce((_result, [key, value]) => {
    const result = _result as any

    if (value && typeof value === 'object' && 'value' in value) {
      if (hasFormat && Object.keys(format).includes(key)) {
        result[key] = formatSetVal(value.value, format[key])
      } else {
        result[key] = value.value
      }
    } else if (value && typeof value === 'object') {
      result[key] = formatSetObj(value, format) // 递归处理子对象
    }
    return result
  }, {})
}
