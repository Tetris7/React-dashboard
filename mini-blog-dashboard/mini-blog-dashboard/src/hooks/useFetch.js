import { useCallback, useEffect, useState } from 'react'

/**
 * Runs an async fetcher function, tracking loading/error/data state.
 * Re-runs whenever `deps` changes. Exposes `retry` for manual re-fetching
 * after a failure (used by the ErrorMessage "Retry" button).
 */
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading') // 'loading' | 'success' | 'error'
  const [error, setError] = useState(null)
  const [attempt, setAttempt] = useState(0)

  const run = useCallback(() => {
    let cancelled = false
    setStatus('loading')
    setError(null)

    fetcher()
      .then((result) => {
        if (cancelled) return
        setData(result)
        setStatus('success')
      })
      .catch((err) => {
        if (cancelled) return
        setError(err)
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const cleanup = run()
    return cleanup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt])

  const retry = useCallback(() => setAttempt((a) => a + 1), [])

  return { data, status, error, retry }
}
