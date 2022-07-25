// @mui
import { useRouter } from 'next/router'

import { Avatar, Box, Skeleton, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import PropTypes from 'prop-types'

import Scrollbar from '@/components/Scrollbar'
import useLocales from '@/hooks/useLocales'
import { PATH_DASHBOARD } from '@/routes/paths'

MemberActivitiesDetails.propTypes = {
  list: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
}

export default function MemberActivitiesDetails({ list = [], isLoading }) {
  const theme = useTheme()
  const { translate } = useLocales()
  const router = useRouter()

  const handleForwardToProfile = (id) => {
    router.push(PATH_DASHBOARD.profile.view(id))
  }

  return (
    <Scrollbar sx={{ height: { xs: '510px !important', sm: 'auto' } }}>
      <Stack spacing={3} sx={{ p: 3 }}>
        {isLoading ? (
          <>
            <Skeleton animation='wave' sx={{ height: 48, width: '100%' }} />
            <Skeleton animation='wave' sx={{ height: 48, width: '100%' }} />
            <Skeleton animation='wave' sx={{ height: 48, width: '100%' }} />
            <Skeleton animation='wave' sx={{ height: 48, width: '100%' }} />
            <Skeleton animation='wave' sx={{ height: 48, width: '100%' }} />
            <Skeleton animation='wave' sx={{ height: 48, width: '100%' }} />
          </>
        ) : (
          list.map(({ linkAvatar, name, lastLogin, id }, index) => (
            <Stack direction='row' alignItems='center' key={id || index}>
              <Avatar src={linkAvatar} sx={{ width: 48, height: 48 }} />

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
