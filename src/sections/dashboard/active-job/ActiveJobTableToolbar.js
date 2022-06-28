// @mui
import { Box, Button } from '@mui/material'

// components
import { RHFDatePicker } from '@/components/hook-form'

export default function ActiveJobTableToolbar() {
  return (
    <Box
      sx={{
        py: 2.5,
        px: 3,
        display: 'grid',
        gridTemplateColumns: {
          md: 'repeat(2, 300px) 150px',
          sm: 'repeat(2, 1fr)',
        },
        gap: 2,
      }}
    >
      <RHFDatePicker name='startDate' />
      <RHFDatePicker name='endDate' />
      <Button type='submit' variant='contained'>
        Search
      </Button>
    </Box>
  )
}
