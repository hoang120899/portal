// @mui
import { Button, IconButton, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import PropTypes from 'prop-types'

// components
import Iconify from '@/components/Iconify'
import useLocales from '@/hooks/useLocales'
// hooks
import useResponsive from '@/hooks/useResponsive'
// utils
import { fDate } from '@/utils/formatTime'

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(2.5),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}))

CalendarToolbar.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onToday: PropTypes.func,
  onNextDate: PropTypes.func,
  onPrevDate: PropTypes.func,
}

export default function CalendarToolbar({
  date,
  onToday,
  onNextDate,
  onPrevDate,
}) {
  const isDesktop = useResponsive('up', 'sm')
  const { translate } = useLocales()

  return (
    <RootStyle>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='center'
        flex={1}
        spacing={2}
      >
        <IconButton onClick={onPrevDate}>
          <Iconify icon='eva:arrow-ios-back-fill' width={20} height={20} />
        </IconButton>

        <Typography variant='h5'>{fDate(date)}</Typography>

        <IconButton onClick={onNextDate}>
          <Iconify icon='eva:arrow-ios-forward-fill' width={20} height={20} />
        </IconButton>
      </Stack>

      {isDesktop && (
        <Button
          size='small'
          color='error'
          variant='contained'
          onClick={onToday}
        >
          {translate('pages.dashboard.interviewSchedule.today')}
        </Button>
      )}
    </RootStyle>
  )
}
