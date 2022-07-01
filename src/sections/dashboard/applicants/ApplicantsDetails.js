// @mui
import { Box, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import PropTypes from 'prop-types'

const RootStyle = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'flex-end',
}))

WeeklyTaskDetails.propTypes = {
  list: PropTypes.array.isRequired,
}

export default function WeeklyTaskDetails({ list = [] }) {
  return (
    <Stack spacing={3} sx={{ p: 3 }}>
      {list.map(({ name, email }, index) => (
        <Stack direction='row' alignItems='center' key={index}>
          <Box sx={{ flexGrow: 1, ml: 2, minWidth: 100 }}>
            <Typography variant='subtitle2' sx={{ mb: 0.5 }} noWrap>
              {name}
            </Typography>

            <Typography variant='body2' sx={{ color: 'text.secondary' }} noWrap>
              {email}
            </Typography>
          </Box>

          <RootStyle>
            <Typography variant='subtitle2' sx={{ mb: 0.5 }} noWrap>
              CV
            </Typography>
          </RootStyle>
        </Stack>
      ))}
    </Stack>
  )
}
