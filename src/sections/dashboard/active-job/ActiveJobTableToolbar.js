// @mui
import { Button, Stack } from '@mui/material'

import { useForm } from 'react-hook-form'

// components
import { FormProvider, RHFDatePicker } from '@/components/hook-form'

const INPUT_WIDTH = 250
const SEARCH_BUTTON_WIDTH = 150

export default function ActiveJobTableToolbar() {
  const defaultValues = {
    startDate: null,
    endDate: null,
  }
  const methods = useForm({
    defaultValues,
  })
  return (
    <FormProvider methods={methods}>
      <Stack
        spacing={2}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ py: 2.5, px: 3 }}
      >
        <RHFDatePicker
          name='startDate'
          sx={{
            maxWidth: { md: INPUT_WIDTH },
          }}
        />
        <RHFDatePicker
          name='endDate'
          sx={{
            maxWidth: { md: INPUT_WIDTH },
          }}
        />
        <Button
          type='submit'
          variant='contained'
          sx={{
            width: { md: SEARCH_BUTTON_WIDTH },
          }}
        >
          Search
        </Button>
      </Stack>
    </FormProvider>
  )
}
