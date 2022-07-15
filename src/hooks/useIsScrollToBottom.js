import { useEffect, useState } from 'react'

// hooks
import useIsMountedRef from '@/hooks/useIsMountedRef'

export default function useIsScrollToBottom(scrollRef = null) {
  const isMountedRef = useIsMountedRef()
  const [isScrollToBottom, setIsScrollToBottom] = useState(false)

  useEffect(() => {
    const isMounted = isMountedRef.current
    const scrollElement = scrollRef.current

    const scrollHandler = (event) => {
      const { scrollHeight, scrollTop, clientHeight } = event.target
      const isBottomReached =
        scrollHeight - Math.round(scrollTop) === clientHeight
      setIsScrollToBottom(isBottomReached)
    }

    scrollElement?.addEventListener('scroll', scrollHandler)

    return () => {
      if (!isMounted) {
        scrollElement?.addEventListener('scroll', scrollHandler)
      }
    }
  }, [isMountedRef, scrollRef])

  return {
    isScrollToBottom,
  }
}
