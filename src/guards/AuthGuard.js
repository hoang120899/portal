import { useEffect, useState } from 'react'

// next
import { useRouter } from 'next/router'

import PropTypes from 'prop-types'

// components
import LoadingScreen from '@/components/LoadingScreen'
// hooks
import useAuth from '@/hooks/useAuth'
import Login from '@/pages/auth/login'

AuthGuard.propTypes = {
  children: PropTypes.node,
}

export default function AuthGuard({ children }) {
  const { isAuthenticated, isInitialized } = useAuth()

  const { pathname, push } = useRouter()

  const [requestedLocation, setRequestedLocation] = useState(null)

  useEffect(() => {
    if (requestedLocation && pathname !== requestedLocation) {
      push(requestedLocation)
    }
    if (isAuthenticated) {
      setRequestedLocation(null)
    }
  }, [isAuthenticated, pathname, push, requestedLocation])

  if (!isInitialized) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname)
    }
    return <Login />
  }

  return <>{children}</>
}
