import axios from 'axios'

const REGISTER_ERROR_MESSAGES: Record<string, string> = {
  'Username already registered': '用户名已被注册，请换一个',
  'Email already registered': '邮箱已被注册，请换一个',
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (!axios.isAxiosError(error)) {
    return fallback
  }

  const status = error.response?.status
  const detail = error.response?.data?.detail

  if (status === 500) {
    return '服务器内部错误，请联系管理员或查看后端日志'
  }

  if (typeof detail === 'string') {
    return REGISTER_ERROR_MESSAGES[detail] ?? detail
  }

  if (Array.isArray(detail) && detail.length > 0) {
    const first = detail[0] as { msg?: string }
    if (first.msg) {
      return first.msg
    }
  }

  return fallback
}
