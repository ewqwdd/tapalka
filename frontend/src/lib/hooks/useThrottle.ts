import { useRef, useCallback } from 'react'

function useThrottle(callback: (...args: any[]) => void, delay: number) {
  const lastCall = useRef<number>(0)

  const throttledFunction = useCallback(
    (...args: any[]) => {
      const now = Date.now()
      console.log(lastCall.current)
      if (now - lastCall.current >= delay) {
        lastCall.current = now
        callback(...args)
      }
    },
    [callback, delay]
  )

  return throttledFunction
}

export default useThrottle
