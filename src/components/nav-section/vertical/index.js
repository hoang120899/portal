// @mui
import { Box, List } from '@mui/material'

import PropTypes from 'prop-types'

// hook
import useRole from '@/hooks/useRole'

//
import { NavListRoot } from './NavList'

NavSectionVertical.propTypes = {
  isCollapse: PropTypes.bool,
  navConfig: PropTypes.array,
}

export default function NavSectionVertical({
  navConfig,
  isCollapse = false,
  ...other
}) {
  const { checkAccessPermission } = useRole()
  return (
    <Box {...other}>
      {navConfig.map((group, groupIndex) => (
        <List
          key={`${group.subheader}-${groupIndex}`}
          disablePadding
          sx={{ px: 2 }}
        >
          {group.items.map((list) => {
            const hasAccessPermission = checkAccessPermission(list?.roles)
            if (!hasAccessPermission) return null
            return (
              <NavListRoot
                key={list.title + list.path}
                list={list}
                isCollapse={isCollapse}
              />
            )
          })}
        </List>
      ))}
    </Box>
  )
}
