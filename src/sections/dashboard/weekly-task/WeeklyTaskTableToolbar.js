// @mui
import React from 'react'

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
        gridTemplateColumns: {
          sm: 'repeat(3, 1fr)',
          xs: 'repeat(1, 1fr)',
        },
        gap: 1,
      }}
    >
      <RHFDatePicker name='startDate' />
      <RHFDatePicker name='endDate' />
      <Button type='submit' variant='contained'>
        {translate('Apply')}
      </Button>
    </Box>
  )
}

const forwardRefToolbar = React.forwardRef(WeeklyTaskTableToolbar)

export default forwardRefToolbar
