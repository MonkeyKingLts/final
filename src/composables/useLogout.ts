import { useRouter } from 'vue-router'
import { clearAuth } from '../utils/auth'

export function useLogout() {
  const router = useRouter()

  function logout(): void {
    clearAuth()
    router.push({ name: 'login' })
  }

  return { logout }
}
