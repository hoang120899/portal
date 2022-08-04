import PropTypes from 'prop-types'

// guards
import AuthGuard from '@/guards/AuthGuard'
// components
import DashboardLayout from '@/layouts/dashboard'

import LogoOnlyLayout from './LogoOnlyLayout'

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['dashboard', 'logoOnly']),
  roles: PropTypes.arrayOf(PropTypes.string), // Example ['Admin', 'Leader']
}

export default function Layout({ variant = 'dashboard', roles, children }) {
  if (variant === 'logoOnly') {
    return <LogoOnlyLayout> {children} </LogoOnlyLayout>
  }
  return (
    <AuthGuard>
      <DashboardLayout roles={roles}> {children} </DashboardLayout>
    </AuthGuard>
  )
}
