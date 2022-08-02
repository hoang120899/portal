// @mui
import { Box, Button } from '@mui/material'

// components
import { RHFDatePicker } from '@/components/hook-form'
import useLocales from '@/hooks/useLocales'

import { FORM_FIELDS } from './config'

export default function PerformanceTableToolbar() {
  const { translate } = useLocales()

  return (
    <Box
      sx={{
        py: 2.5,
        px: 3,
        display: 'grid',
        gridTemplateColumns: '4fr 4fr 3fr',
        gap: 1,
      }}
    >
      <RHFDatePicker name={FORM_FIELDS.START_DATE} />
      <RHFDatePicker name={FORM_FIELDS.END_DATE} />
      <Button type='submit' variant='contained'>
        {translate('pages.dashboard.performance.apply')}
      </Button>
    </Box>
  )
}
