import { useEffect } from 'react'

export function useObserver(ref: React.RefObject<Element>, callback: () => void, options?: IntersectionObserverInit) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback()
      }
    }, options)

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [ref, callback, options])
}
