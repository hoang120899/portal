// @mui
import React, { forwardRef } from 'react'

import { Box, Button } from '@mui/material'

// components
import { RHFDatePicker } from '@/components/hook-form'
import useLocales from '@/hooks/useLocales'

function WeeklyTaskTableToolbar(props, ref) {
  const { translate } = useLocales()
  return (
    <Box
      ref={ref}
      sx={{
        py: 2.5,
        px: 3,
        display: 'grid',
        gridTemplateColumns: '4fr 4fr 3fr',
        gap: 1,
      }}
    >
      <RHFDatePicker name='startDate' />
      <RHFDatePicker name='endDate' />
      <Button type='submit' variant='contained'>
        {translate('pages.dashboard.weeklyTask.apply')}
      </Button>
    </Box>
  )
}

export default forwardRef(WeeklyTaskTableToolbar)
