// @mui
import { Avatar, Box, Skeleton, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import PropTypes from 'prop-types'

import Scrollbar from '@/components/Scrollbar'

const RootStyle = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  justifyContent: 'flex-end',
}))

WeeklyTaskDetails.propTypes = {
  list: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
}

export default function WeeklyTaskDetails({ list = [], isLoading }) {
  return (
    <Scrollbar sx={{ height: { xs: '384px !important' } }}>
      <Stack spacing={3} sx={{ p: 3 }}>
        {list.map(
          (
            {
              user: { linkAvatar, name, nameTeam },
              startDate,
              endDate,
              content,
            },
            index
          ) =>
            isLoading ? (
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
            ) : (
              <Stack direction='row' alignItems='center' key={index}>
                <Avatar src={linkAvatar} sx={{ width: 48, height: 48 }} />

                <Box sx={{ flexGrow: 1, ml: 2, minWidth: 100 }}>
                  <Typography variant='subtitle2' sx={{ mb: 0.5 }} noWrap>
                    {name}
                  </Typography>

                  <Typography
                    variant='body2'
                    sx={{ color: 'text.secondary' }}
                    noWrap
                  >
                    {nameTeam}
                  </Typography>
                </Box>

                <RootStyle>
                  <Typography variant='subtitle2' sx={{ mb: 0.5 }} noWrap>
                    {startDate} - {endDate}
                  </Typography>

                  <Typography
                    variant='body2'
                    sx={{ color: 'text.secondary' }}
                    noWrap
                  >
                    {content
                      .reduce((acc, cur) => acc + cur.content + ', ', '')
                      .slice(0, -2)}
                  </Typography>
                </RootStyle>
              </Stack>
            )
        )}
      </Stack>
    </Scrollbar>
  )
}
