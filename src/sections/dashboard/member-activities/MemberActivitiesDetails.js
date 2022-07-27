// @mui
import { useRouter } from 'next/router'

import { Avatar, Box, Skeleton, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { compareDesc, parseISO } from 'date-fns'
import PropTypes from 'prop-types'

import Scrollbar from '@/components/Scrollbar'
import useLocales from '@/hooks/useLocales'
import { PATH_DASHBOARD } from '@/routes/paths'
import { fDateCalendar } from '@/utils/formatTime'

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

  const sortLastLogin = () => {
    const newList = list.filter((item) => item.lastLogin)
    const listNull = list.filter((item) => !item.lastLogin)
    newList.sort((first, second) =>
      compareDesc(
        parseISO(fDateCalendar(first.lastLogin).toISOString()),
        parseISO(fDateCalendar(second.lastLogin).toISOString())
      )
    )
    return [...newList, ...listNull]
  }

  list = [...sortLastLogin()]

  const handleForwardToProfile = (id) => {
    router.push(PATH_DASHBOARD.profile.view(id))
  }

  return (
    <Scrollbar sx={{ height: { xs: '600px', sm: `${height}px` } }}>
      <Stack spacing={3} sx={{ p: 3 }}>
        {isLoading ? (
          <>
            <Skeleton animation='wave' sx={{ height: 36, width: '100%' }} />
            <Skeleton animation='wave' sx={{ height: 36, width: '100%' }} />
            <Skeleton animation='wave' sx={{ height: 36, width: '100%' }} />
            <Skeleton animation='wave' sx={{ height: 36, width: '100%' }} />
            <Skeleton animation='wave' sx={{ height: 36, width: '100%' }} />
          </>
        ) : (
          list.map(({ linkAvatar, name, lastLogin, id }, index) => (
            <Stack direction='row' alignItems='center' key={id || index}>
              <Avatar
                src={`${process.env.NEXT_PUBLIC_HOST_API_KEY}/${linkAvatar}`}
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
                  onClick={() => handleForwardToProfile(id)}
                  noWrap
                >
                  {name}
                </Typography>

                <Typography
                  variant='body2'
                  sx={{ mb: 0.5, color: 'text.secondary' }}
                >
                  {translate(lastLogin ? `Last login: ${lastLogin}` : '')}
                </Typography>
              </Box>
            </Stack>
          ))
        )}
      </Stack>
    </Scrollbar>
  )
}
