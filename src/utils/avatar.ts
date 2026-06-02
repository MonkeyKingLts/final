export function buildInitialsAvatar(name: string): string {
  const initials = (name?.trim() || 'U')
    .split(/\s+/)
    .map((part) => part[0] ?? '')
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150"><rect fill="#396AFF" width="150" height="150"/><text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" fill="#ffffff" font-size="52" font-family="system-ui,sans-serif" font-weight="600">${initials}</text></svg>`

  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

export function resolveAvatarUrl(
  url: string | null | undefined,
  displayName: string,
): string {
  const trimmed = url?.trim()

  if (!trimmed) {
    return buildInitialsAvatar(displayName)
  }

  if (trimmed.startsWith('data:')) {
    return trimmed
  }

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed
  }

  if (trimmed.startsWith('/')) {
    return `/api${trimmed}`
  }

  return `/api/${trimmed}`
}
