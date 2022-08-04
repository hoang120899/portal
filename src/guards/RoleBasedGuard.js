import PropTypes from 'prop-types'

// components
import PermissionDenied from '@/components/PermissionDenied'
// hooks
import useRole from '@/hooks/useRole'

RoleBasedGuard.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string), // Example ['Admin', 'Leader']
  children: PropTypes.node.isRequired,
}

export default function RoleBasedGuard({ roles, children }) {
  const { checkAccessPermission } = useRole()

  return <>{checkAccessPermission(roles) ? children : <PermissionDenied />}</>
}
