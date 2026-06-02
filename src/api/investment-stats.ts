import { apiClient } from './client'
import type { InvestmentStatPublic, StatType } from './types'

export interface ListInvestmentStatsParams {
  stat_type?: StatType | null
  period?: string | null
}

export async function listMyInvestmentStats(
  params?: ListInvestmentStatsParams,
): Promise<InvestmentStatPublic[]> {
  const { data } = await apiClient.get<InvestmentStatPublic[]>(
    '/users/me/investment-stats',
    { params },
  )
  return data
}
