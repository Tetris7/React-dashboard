import { useEffect, useState } from 'react'

const STORAGE_KEY = 'mini-blog-dashboard:theme'

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return stored
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return { theme, toggleTheme }
}
