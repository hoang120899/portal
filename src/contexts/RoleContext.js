import { createContext, useCallback } from 'react'

import PropTypes from 'prop-types'

// hooks
import useAuth from '@/hooks/useAuth'

const RoleContext = createContext()

const RoleProvider = ({ children }) => {
  const { user } = useAuth()
  const currentRole = user?.role // Admin;

  const checkAccessPermission = useCallback(
    (roles = []) => [].concat(roles).includes(currentRole),
    [currentRole]
  )

  return (
    <RoleContext.Provider value={{ checkAccessPermission }}>
      {children}
    </RoleContext.Provider>
  )
}

RoleProvider.propTypes = {
  children: PropTypes.node,
}

export { RoleContext, RoleProvider }
