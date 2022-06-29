// @mui
import { Box, List, ListSubheader } from '@mui/material'
import { styled } from '@mui/material/styles'

import PropTypes from 'prop-types'

// hook
import useLocales from '@/hooks/useLocales'
import useRole from '@/hooks/useRole'

//
import { NavListRoot } from './NavList'

export const ListSubheaderStyle = styled((props) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.overline,
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  color: theme.palette.text.primary,
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}))

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
  const { translate } = useLocales()
  return (
    <Box {...other}>
      {navConfig.map((group, groupIndex) => (
        <List
          key={`${group.subheader}-${groupIndex}`}
          disablePadding
          sx={{ px: 2 }}
        >
          <ListSubheaderStyle
            sx={{
              ...(isCollapse && {
                opacity: 0,
              }),
            }}
          >
            {translate(group.subheader) || ''}
          </ListSubheaderStyle>

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
