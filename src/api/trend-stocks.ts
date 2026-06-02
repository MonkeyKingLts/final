import { apiClient } from './client'
import type { TrendStockPublic } from './types'

export interface ListTrendStocksParams {
  limit?: number
}

export async function listTrendStocks(
  params?: ListTrendStocksParams,
): Promise<TrendStockPublic[]> {
  const { data } = await apiClient.get<TrendStockPublic[]>(
    '/users/me/trend-stocks',
    { params },
  )
  return data
}
