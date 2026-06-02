import { apiClient } from './client'
import type { LoanPublic, LoanStatus } from './types'

export interface ListLoansParams {
  status?: LoanStatus | null
}

export async function listMyLoans(
  params?: ListLoansParams,
): Promise<LoanPublic[]> {
  const { data } = await apiClient.get<LoanPublic[]>('/users/me/loans', {
    params,
  })
  return data
}
