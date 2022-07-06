import { useEffect, useState } from 'react'

import debounce from 'lodash.debounce'

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const exeDebounce = debounce(() => {
      setDebouncedValue(value)
    }, delay)
    exeDebounce()
    return () => {
      exeDebounce.cancel()
    }
  }, [value, delay])

  return debouncedValue
}
