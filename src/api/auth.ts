import { apiClient } from './client'
import type { Token, UserProfileUpdate, UserPublic, UserRegister } from './types'

export async function loginForAccessToken(
  username: string,
  password: string,
): Promise<Token> {
  const body = new URLSearchParams({ username, password })
  const { data } = await apiClient.post<Token>('/token', body, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  return data
}

export async function registerUser(payload: UserRegister): Promise<UserPublic> {
  const { data } = await apiClient.post<UserPublic>('/register', payload)
  return data
}

export async function getCurrentUser(): Promise<UserPublic> {
  const { data } = await apiClient.get<UserPublic>('/users/me')
  return data
}

export async function updateMyProfile(
  payload: UserProfileUpdate,
): Promise<UserPublic> {
  const { data } = await apiClient.patch<UserPublic>(
    '/users/me/profile',
    payload,
  )
  return data
}
