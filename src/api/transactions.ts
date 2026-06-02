import { apiClient } from './client'
import type { TransactionPublic, TransferCreate, TransferPublic } from './types'

export interface ListTransactionsParams {
  limit?: number
}

export async function listMyRecentTransactions(
  params?: ListTransactionsParams,
): Promise<TransactionPublic[]> {
  const { data } = await apiClient.get<TransactionPublic[]>(
    '/users/me/transactions',
    { params },
  )
  return data
}

export async function transferToUser(
  payload: TransferCreate,
): Promise<TransferPublic> {
  const { data } = await apiClient.post<TransferPublic>(
    '/users/me/transfers',
    payload,
  )
  return data
}
