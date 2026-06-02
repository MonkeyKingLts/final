const AUTH_KEY = 'auth_token'

export function getAccessToken(): string | null {
  return localStorage.getItem(AUTH_KEY) || sessionStorage.getItem(AUTH_KEY)
}

export function isAuthenticated(): boolean {
  return Boolean(getAccessToken())
}

export function setAuth(token: string, rememberMe: boolean): void {
  const storage = rememberMe ? localStorage : sessionStorage
  const other = rememberMe ? sessionStorage : localStorage

  storage.setItem(AUTH_KEY, token)
  other.removeItem(AUTH_KEY)
}

export function clearAuth(): void {
  localStorage.removeItem(AUTH_KEY)
  sessionStorage.removeItem(AUTH_KEY)
}
