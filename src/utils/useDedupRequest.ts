import { useRef, useEffect, useCallback } from 'react'

type RequestFn<T> = () => Promise<T>
type AbortController = { abort: () => void }

/**
 * Hook to deduplicate simultaneous identical requests
 * Prevents race conditions and duplicate API calls
 * 
 * @example
 * const fetchUsers = useDedupRequest(async () => {
 *   return await api.getUsers()
 * })
 * 
 * // Multiple calls in quick succession will result in only one request
 * fetchUsers() // Makes request
 * fetchUsers() // Returns same promise
 * fetchUsers() // Returns same promise
 */
export function useDedupRequest<T>(requestFn: RequestFn<T>) {
  const pendingRef = useRef<Promise<T> | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const dedupedRequest = useCallback(async (): Promise<T> => {
    // If request is already pending, return the same promise
    if (pendingRef.current) {
      return pendingRef.current
    }

    // Start new request
    const promise = requestFn()
    pendingRef.current = promise

    try {
      const result = await promise
      return result
    } finally {
      // Clear pending request
      pendingRef.current = null
    }
  }, [requestFn])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  return dedupedRequest
}

/**
 * Hook to debounce requests
 * Useful for search and other high-frequency operations
 * 
 * @example
 * const debouncedSearch = useDebouncedRequest(
 *   async (query) => await api.search(query),
 *   500
 * )
 * 
 * // Search won't be called immediately, but after 500ms of inactivity
 * debouncedSearch('test')
 * debouncedSearch('test query')
 * // Only the last one will execute after 500ms
 */
export function useDebouncedRequest<T extends unknown[], R>(
  requestFn: (...args: T) => Promise<R>,
  delayMs: number = 300,
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pendingRef = useRef<Promise<R> | null>(null)

  const debouncedRequest = useCallback(
    (...args: T): Promise<R> => {
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      return new Promise((resolve, reject) => {
        timeoutRef.current = setTimeout(async () => {
          try {
            // If same request is already pending, return it
            if (pendingRef.current) {
              const result = await pendingRef.current
              resolve(result)
              return
            }

            // Make new request
            const promise = requestFn(...args)
            pendingRef.current = promise
            const result = await promise
            resolve(result)
          } catch (err) {
            reject(err)
          } finally {
            pendingRef.current = null
          }
        }, delayMs)
      })
    },
    [requestFn, delayMs],
  )

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return debouncedRequest
}
