// @mui
import { Avatar, Box, Skeleton, Stack, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'

import PropTypes from 'prop-types'

import Scrollbar from '@/components/Scrollbar'
import { DOMAIN_SERVER_API } from '@/config'

const RootStyle = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  justifyContent: 'flex-end',
}))

WeeklyTaskDetails.propTypes = {
  list: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  handleGetDetailWeeklyTask: PropTypes.func,
  height: PropTypes.number,
}

export default function WeeklyTaskDetails({
  list = [],
  isLoading,
  handleGetDetailWeeklyTask = {},
  height = 0,
}) {
  const theme = useTheme()
  return (
    <Scrollbar sx={{ maxHeight: { sm: `${height}px`, xs: 600 } }}>
      <Stack spacing={3} sx={{ p: 3 }}>
        {list.map((item, index) => {
          if (isLoading) {
            return (
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-around'
                key={index}
              >
                <Skeleton animation='wave' sx={{ height: 48, width: '15%' }} />
                <Skeleton animation='wave' sx={{ height: 48, width: '35%' }} />
                <Skeleton animation='wave' sx={{ height: 48, width: '35%' }} />
              </Stack>
            )
          }
          return (
            <Stack direction='row' alignItems='center' key={index}>
              <Avatar
                src={`${DOMAIN_SERVER_API}/${item?.user?.linkAvatar}`}
                sx={{ width: 48, height: 48 }}
              />

              <Box sx={{ flexGrow: 1, ml: 2, mr: 1, minWidth: 100 }}>
                <Typography
                  variant='subtitle2'
                  sx={{
                    mb: 0.5,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    '&:hover': {
                      color: `${theme.palette.primary.main}`,
                    },
                  }}
                  noWrap
                  onClick={() => handleGetDetailWeeklyTask(item)}
                >
                  {item?.user?.name}
                </Typography>

                <Typography
                  variant='body2'
                  sx={{ color: 'text.secondary' }}
                  noWrap
                >
                  {item?.user?.nameTeam}
                </Typography>
              </Box>

              <RootStyle>
                <Typography variant='subtitle2' sx={{ mb: 0.5 }} noWrap>
                  {item?.startDate} - {item?.endDate}
                </Typography>

                <Typography
                  variant='body2'
                  sx={{ color: 'text.secondary' }}
                  noWrap
                >
                  {item?.content
                    .reduce((acc, cur) => acc + cur.content + ', ', '')
                    .slice(0, -2)}
                </Typography>
              </RootStyle>
            </Stack>
          )
        })}
      </Stack>
    </Scrollbar>
  )
}
