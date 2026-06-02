import { apiClient } from './client'
import type { ConsumptionStatPublic, ConsumptionStatType } from './types'

export interface ListConsumptionStatsParams {
  stat_type?: ConsumptionStatType | null
  period?: string | null
}

export async function listMyConsumptionStats(
  params?: ListConsumptionStatsParams,
): Promise<ConsumptionStatPublic[]> {
  const { data } = await apiClient.get<ConsumptionStatPublic[]>(
    '/users/me/consumption-stats',
    { params },
  )
  return data
}
