import { useCallback, useMemo } from 'react'

// @mui
import { useRouter } from 'next/router'

import { Avatar, Box, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { compareDesc } from 'date-fns'
import PropTypes from 'prop-types'

import Scrollbar from '@/components/Scrollbar'
import { SkeletonTableDashboard } from '@/components/skeleton'
import { DOMAIN_SERVER_API } from '@/config'
import useLocales from '@/hooks/useLocales'
import { PATH_DASHBOARD } from '@/routes/paths'
import { fDateCalendar, fTimestamp } from '@/utils/formatTime'

MemberActivitiesDetails.propTypes = {
  list: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  height: PropTypes.number,
}

export default function MemberActivitiesDetails({
  list = [],
  isLoading,
  height = 0,
}) {
  const theme = useTheme()
  const { translate } = useLocales()
  const router = useRouter()

  const sortLastLogin = useMemo(() => {
    const newList = list.filter((item) => item.lastLogin)
    const listNull = list.filter((item) => !item.lastLogin)
    newList.sort((first, second) =>
      compareDesc(
        fTimestamp(fDateCalendar(first.lastLogin)),
        fTimestamp(fDateCalendar(second.lastLogin))
      )
    )
    return [...newList, ...listNull]
  }, [list])

  const handleForwardToProfile = useCallback(
    (id) => () => {
      router.push(PATH_DASHBOARD.profile.view(id))
    },
    [router]
  )

  const handleDisplayFormatLastLogin = useCallback(
    (lastLogin) => {
      if (!lastLogin) return

      return `${translate(
        'pages.dashboard.memberActivities.lastLogin'
      )}: ${lastLogin}`
    },
    [translate]
  )

  return (
    <Scrollbar sx={{ height: { xs: '600px', sm: `${height}px` } }}>
      <Stack spacing={3} sx={{ p: 3 }}>
        {isLoading ? (
          <SkeletonTableDashboard />
        ) : (
          sortLastLogin.map(({ linkAvatar, name, lastLogin, id }, index) => (
            <Stack direction='row' alignItems='center' key={id || index}>
              <Avatar
                src={`${DOMAIN_SERVER_API}/${linkAvatar}`}
                sx={{ width: 48, height: 48 }}
              />

              <Box sx={{ flexGrow: 1, ml: 2, minWidth: 100 }}>
                <Typography
                  variant='subtitle1'
                  sx={{
                    mb: 0.5,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                      color: `${theme.palette.primary.main}`,
                    },
                  }}
                  onClick={handleForwardToProfile(id)}
                  noWrap
                >
                  {name}
                </Typography>

                <Typography
                  variant='body2'
                  sx={{ mb: 0.5, color: 'text.secondary' }}
                >
                  {handleDisplayFormatLastLogin(lastLogin)}
                </Typography>
              </Box>
            </Stack>
          ))
        )}
      </Stack>
    </Scrollbar>
  )
}
