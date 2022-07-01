// @mui
import { Box, Button } from '@mui/material'

// components
import { RHFDatePicker } from '@/components/hook-form'

export default function WeeklyTaskTableToolbar() {
  return (
    <Box
      sx={{
        py: 2.5,
        px: 3,
        display: 'grid',
        gridTemplateColumns: {
          md: 'repeat(2, 160px) 110px',
          sm: 'repeat(2, 1fr)',
        },
        gap: 1,
      }}
    >
      <RHFDatePicker name='startDate' />
      <RHFDatePicker name='endDate' />
      <Button type='submit' variant='contained'>
        Apply
      </Button>
    </Box>
  )
}
