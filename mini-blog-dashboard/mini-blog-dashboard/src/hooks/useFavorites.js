import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'mini-blog-dashboard:favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? new Set(JSON.parse(raw)) : new Set()
    } catch {
      return new Set()
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]))
  }, [favorites])

  const toggleFavorite = useCallback((postId) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(postId)) next.delete(postId)
      else next.add(postId)
      return next
    })
  }, [])

  const isFavorite = useCallback((postId) => favorites.has(postId), [favorites])

  return { favorites, toggleFavorite, isFavorite }
}
