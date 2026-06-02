export interface Token {
  access_token: string
  token_type: string
}

export interface UserRegister {
  username: string
  email: string
  password: string
  full_name: string
  birth_date: string
  current_address: string
  permanent_address?: string | null
  city: string
  state: string
  country?: string
  postal_code: string
}

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'FROZEN'

export interface UserPublic {
  id: number
  username: string
  email: string
  full_name: string
  former_name: string
  birth_date: string
  current_address: string
  permanent_address: string
  city: string
  state: string
  country: string
  postal_code: string
  avatar_url: string | null
  status: UserStatus
  created_at: string
}

export interface UserProfileUpdate {
  full_name?: string | null
  former_name?: string | null
  email?: string | null
  password?: string | null
  birth_date?: string | null
  current_address?: string | null
  permanent_address?: string | null
  city?: string | null
  state?: string | null
  postal_code?: string | null
  country?: string | null
  avatar_url?: string | null
}

export interface AccountOverview {
  id: number
  total_balance: string
  total_income: string
  total_expense: string
  total_saving: string
  weekly_debit: string
  weekly_credit: string
  version: number
  last_updated: string
  created_at: string
  updated_at: string
}

export type CardType = 'DEBIT' | 'CREDIT' | 'SUPPLEMENTARY'
export type CardStatus = 'ACTIVE' | 'FROZEN' | 'EXPIRED' | 'LOST'

export interface BankCardCreate {
  card_number: string
  card_holder: string
  expiry_date: string
  cvv: string
  bank_name: string
  card_type: CardType
  balance?: string | number
  credit_limit?: string | number | null
  status?: CardStatus
}

export interface BankCardPublic {
  id: number
  card_number_masked: string
  card_holder: string
  expiry_date: string
  bank_name: string
  card_type: CardType
  balance: string
  credit_limit: string | null
  status: CardStatus
  created_at: string
  updated_at: string
}

export type TransactionType =
  | 'SHOPPING'
  | 'TRANSFER_IN'
  | 'TRANSFER_OUT'
  | 'SERVICE'
  | 'WITHDRAWAL'
  | 'DEPOSIT'

export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED'

export interface TransactionPublic {
  id: number
  transaction_no: string
  bank_card_id: number
  description: string
  transaction_type: TransactionType
  amount: string
  currency: string
  status: TransactionStatus
  transaction_time: string
  receipt_url: string | null
}

export interface TransferCreate {
  to_username: string
  amount: string | number
  bank_card_id?: number | null
}

export interface TransferPublic {
  transaction: TransactionPublic
  to_username: string
  to_full_name: string
}

export type ConsumptionStatType = 'WEEKLY' | 'MONTHLY' | 'CATEGORY'

export interface ConsumptionStatPublic {
  id: number
  stat_type: ConsumptionStatType
  period: string
  category: string | null
  amount: string
  percentage: string | null
  created_at: string
  updated_at: string
}

export type InvestmentStatus = 'HOLDING' | 'SOLD' | 'PENDING'

export interface InvestmentPublic {
  id: number
  investment_name: string
  category: string
  investment_value: string
  return_rate: string
  investment_date: string
  status: InvestmentStatus
  created_at: string
  updated_at: string
}

export type StatType = 'YEARLY' | 'MONTHLY'

export interface InvestmentStatPublic {
  id: number
  stat_type: StatType
  period: string
  amount: string
  created_at: string
  updated_at: string
}

export interface TrendStockPublic {
  id: number
  stock_name: string
  price: string
  return_rate: string
  stock_rank: number
  created_at: string
  updated_at: string
}

export type LoanType = 'PERSONAL' | 'COMPANY' | 'COMMERCIAL'
export type LoanStatus = 'ACTIVE' | 'PAID_OFF' | 'OVERDUE' | 'PENDING'

export interface LoanPublic {
  id: number
  loan_type: LoanType
  loan_amount: string
  remaining_amount: string
  loan_term_months: number
  interest_rate: string
  monthly_payment: string
  start_date: string
  end_date: string
  status: LoanStatus
  created_at: string
  updated_at: string
}

export type InvoiceStatus = 'SENT' | 'PAID' | 'UNPAID' | 'CANCELLED'

export interface InvoicePublic {
  id: number
  counterparty: string
  amount: string
  issued_at: string
  status: InvoiceStatus
  invoice_url: string | null
  created_at: string
  updated_at: string
}

export type ServiceStatus = 'AVAILABLE' | 'UNAVAILABLE'

export interface BankServicePublic {
  id: number
  service_name: string
  service_type: string
  description: string | null
  contract_type: string
  status: ServiceStatus
  created_at: string
  updated_at: string
}

export type UserServiceStatus = 'ACTIVE' | 'CANCELLED' | 'EXPIRED'

export interface UserServicePublic {
  id: number
  service_id: number
  service_name: string
  service_type: string
  contract_type: string
  subscribed_at: string
  expires_at: string | null
  status: UserServiceStatus
  created_at: string
  updated_at: string
}

export interface SystemSettingPublic {
  id: number
  currency: string
  timezone: string
  notify_crypto: boolean
  notify_merchant: boolean
  notify_recommendation: boolean
  created_at: string
  updated_at: string
}

export interface SystemSettingUpdate {
  currency?: string | null
  timezone?: string | null
  notify_crypto?: boolean | null
  notify_merchant?: boolean | null
  notify_recommendation?: boolean | null
}

export interface SecuritySettingPublic {
  id: number
  two_factor_enabled: boolean
  last_password_change: string
  login_attempts: number
  lock_until: string | null
  created_at: string
  updated_at: string
}

export interface SecuritySettingUpdate {
  two_factor_enabled?: boolean | null
}

export interface ValidationError {
  loc: (string | number)[]
  msg: string
  type: string
}

export interface HTTPValidationError {
  detail: ValidationError[]
}
