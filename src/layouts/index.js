import PropTypes from 'prop-types'

// guards
import AuthGuard from '@/guards/AuthGuard'
// components
import DashboardLayout from '@/layouts/dashboard'

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string), // Example ['Admin', 'Leader']
}

export default function Layout({ roles, children }) {
  return (
    <AuthGuard>
      <DashboardLayout roles={roles}> {children} </DashboardLayout>
    </AuthGuard>
  )
}
