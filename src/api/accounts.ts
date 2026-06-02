import { apiClient } from './client'
import type { AccountOverview } from './types'

export async function getMyAccountOverview(): Promise<AccountOverview> {
  const { data } = await apiClient.get<AccountOverview>('/users/me/account')
  return data
}
