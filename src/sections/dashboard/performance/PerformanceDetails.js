// @mui
import { Avatar, Box, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import PropTypes from 'prop-types'

import Scrollbar from '@/components/Scrollbar'

const RootStyle = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'flex-end',
}))

PerformanceDetails.propTypes = {
  list: PropTypes.array.isRequired,
}

export default function PerformanceDetails({ list = [] }) {
  return (
    <Scrollbar sx={{ height: { xs: '510px !important', sm: 'auto' } }}>
      <Stack spacing={3} sx={{ p: 3 }}>
        {list.map(({ avatar, name, email }, index) => (
          <Stack direction='row' alignItems='center' key={index}>
            <Avatar src={avatar} sx={{ width: 48, height: 48 }} />

            <Box sx={{ flexGrow: 1, ml: 2, minWidth: 100 }}>
              <Typography variant='subtitle2' sx={{ mb: 0.5 }} noWrap>
                {name}
              </Typography>

              <Typography
                variant='body2'
                sx={{ color: 'text.secondary' }}
                noWrap
              >
                {email}
              </Typography>
            </Box>

            <RootStyle>
              <Typography variant='subtitle2' sx={{ mb: 0.5 }} noWrap>
                CV
              </Typography>

              <Typography
                variant='body2'
                sx={{ color: 'text.secondary' }}
                noWrap
              >
                {index}
              </Typography>
            </RootStyle>
          </Stack>
        ))}
      </Stack>
    </Scrollbar>
  )
}
