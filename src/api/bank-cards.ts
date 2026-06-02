import { apiClient } from './client'
import type { BankCardCreate, BankCardPublic } from './types'

export async function listMyBankCards(): Promise<BankCardPublic[]> {
  const { data } = await apiClient.get<BankCardPublic[]>('/users/me/bank-cards')
  return data
}

export async function createMyBankCard(payload: BankCardCreate): Promise<BankCardPublic> {
  const { data } = await apiClient.post<BankCardPublic>('/users/me/bank-cards', payload)
  return data
}
