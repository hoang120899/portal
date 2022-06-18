import PropTypes from 'prop-types'

// components
import DashboardLayout from './dashboard'

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default function Layout({ children }) {
  return <DashboardLayout> {children} </DashboardLayout>
}
