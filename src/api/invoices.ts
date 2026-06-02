import { apiClient } from './client'
import type { InvoicePublic, InvoiceStatus } from './types'

export interface ListInvoicesParams {
  status?: InvoiceStatus | null
}

export async function listMyInvoices(
  params?: ListInvoicesParams,
): Promise<InvoicePublic[]> {
  const { data } = await apiClient.get<InvoicePublic[]>('/users/me/invoices', {
    params,
  })
  return data
}
