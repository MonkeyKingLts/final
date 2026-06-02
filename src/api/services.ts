import { apiClient } from './client'
import type {
  BankServicePublic,
  UserServicePublic,
  UserServiceStatus,
} from './types'

export async function listMyBankServices(): Promise<BankServicePublic[]> {
  const { data } = await apiClient.get<BankServicePublic[]>(
    '/users/me/bank-services',
  )
  return data
}

export interface ListUserServicesParams {
  status?: UserServiceStatus | null
}

export async function listMyUserServices(
  params?: ListUserServicesParams,
): Promise<UserServicePublic[]> {
  const { data } = await apiClient.get<UserServicePublic[]>(
    '/users/me/user-services',
    { params },
  )
  return data
}
