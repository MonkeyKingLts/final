import { apiClient } from './client'
import type {
  SecuritySettingPublic,
  SecuritySettingUpdate,
  SystemSettingPublic,
  SystemSettingUpdate,
} from './types'

export async function getMySystemSettings(): Promise<SystemSettingPublic> {
  const { data } = await apiClient.get<SystemSettingPublic>(
    '/users/me/system-settings',
  )
  return data
}

export async function updateMySystemSettings(
  payload: SystemSettingUpdate,
): Promise<SystemSettingPublic> {
  const { data } = await apiClient.patch<SystemSettingPublic>(
    '/users/me/system-settings',
    payload,
  )
  return data
}

export async function getMySecuritySettings(): Promise<SecuritySettingPublic> {
  const { data } = await apiClient.get<SecuritySettingPublic>(
    '/users/me/security-settings',
  )
  return data
}

export async function updateMySecuritySettings(
  payload: SecuritySettingUpdate,
): Promise<SecuritySettingPublic> {
  const { data } = await apiClient.patch<SecuritySettingPublic>(
    '/users/me/security-settings',
    payload,
  )
  return data
}
