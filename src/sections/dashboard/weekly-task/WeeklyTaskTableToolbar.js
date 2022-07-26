// @mui
import { Box, Button } from '@mui/material'

// components
import { RHFDatePicker } from '@/components/hook-form'
import useLocales from '@/hooks/useLocales'

export default function WeeklyTaskTableToolbar() {
  const { translate } = useLocales()
  return (
    <Box
      sx={{
        py: 2.5,
        px: 3,
        display: 'grid',
        gridTemplateColumns: {
          xl: 'repeat(3, 1fr)',
          lg: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
          sm: 'repeat(1, 1fr)',
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
