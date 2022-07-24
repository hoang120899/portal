// @mui
import { Box, Button, Stack } from '@mui/material'

// components
import { RHFDatePicker } from '@/components/hook-form'

export default function PerformanceTableToolbar() {
  return (
    <Stack
      direction='column'
      alignItems='center'
      sx={{
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          width: '100%',
          gridTemplateColumns: {
            md: 'repeat(2)',
            sm: 'repeat(2, 1fr)',
          },
        }}
      >
        <RHFDatePicker style={{ padding: 10 }} name='startDate' />
        <RHFDatePicker style={{ padding: 10 }} name='endDate' />
      </Box>
      <Button type='submit' variant='contained' sx={{ width: '95%' }}>
        Apply
      </Button>
    </Stack>
  )
}
