import type { Component } from 'vue'

export interface NyaResponse<T> {
  code: number
  msg: string
  data: T
  time: number
  path?: string
}

export type SystemConfigKey = 'http' | 'o' | 'plugin'

export interface BaseSettingType {
  title: string
  subtitle?: string
  value: any
  valueType?: 'text' | 'number'
  append?: string
  placeholder?: string
  disabled?: boolean
  type?: 'switch' | 'textarea' | 'placeholder'
  suffix?: string
  extraClass?: string
  loading?: boolean
  condition?: (v: Record<string, settingType>) => boolean
}

export interface SelectSettingType extends Omit<BaseSettingType, 'type'> {
  type: 'select'
  selectOptions: any
}

export interface ComponentSettingType extends Omit<BaseSettingType, 'type'> {
  type: 'component'
  component: Component
}

export type settingType = BaseSettingType | SelectSettingType | ComponentSettingType
