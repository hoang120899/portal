import PropTypes from 'prop-types'

// guards
import AuthGuard from '@/guards/AuthGuard'
// components
import DashboardLayout from '@/layouts/dashboard'

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default function Layout({ children }) {
  return (
    <AuthGuard>
      <DashboardLayout> {children} </DashboardLayout>
    </AuthGuard>
  )
}
