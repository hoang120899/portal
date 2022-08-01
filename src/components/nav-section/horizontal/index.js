import { memo, useMemo } from 'react'

// @mui
import { Stack } from '@mui/material'

import PropTypes from 'prop-types'

// hook
import useRole from '@/hooks/useRole'

//
import { NavListRoot } from './NavList'

const hideScrollbar = {
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}

NavSectionHorizontal.propTypes = {
  navConfig: PropTypes.array,
}

function NavSectionHorizontal({ navConfig }) {
  const { checkAccessPermission } = useRole()
  const navConfigBaseRole = useMemo(
    () =>
      navConfig.filter(({ items = [] }) =>
        items.some(({ roles = [] }) => checkAccessPermission(roles))
      ),
    [checkAccessPermission, navConfig]
  )

  return (
    <Stack
      direction='row'
      justifyContent='center'
      sx={{ bgcolor: 'background.neutral', borderRadius: 1, px: 0.5 }}
    >
      <Stack direction='row' sx={{ ...hideScrollbar, py: 1 }}>
        {navConfigBaseRole.map((group) => (
          <Stack key={group.subheader} direction='row' flexShrink={0}>
            {group.items.map((list) => (
              <NavListRoot key={list.title + list.path} list={list} />
            ))}
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}

export default memo(NavSectionHorizontal)
