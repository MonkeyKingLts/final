import { apiClient } from './client'
import type { InvestmentPublic, InvestmentStatus } from './types'

export interface ListInvestmentsParams {
  status?: InvestmentStatus | null
}

export async function listMyInvestments(
  params?: ListInvestmentsParams,
): Promise<InvestmentPublic[]> {
  const { data } = await apiClient.get<InvestmentPublic[]>(
    '/users/me/investments',
    { params },
  )
  return data
}
