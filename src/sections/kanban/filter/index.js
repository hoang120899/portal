import React from 'react'

// @mui
import { LoadingButton } from '@mui/lab'
import { Box, Stack } from '@mui/material'

import { useForm } from 'react-hook-form'

import {
  FormProvider,
  RHFBasicSelect,
  RHFDatePicker,
  RHFTextField,
} from '@/components/hook-form'

function Filter() {
  const defaultValues = {
    search: '',
    labelId: '',
    clientId: '',
    memberId: '',
    jobId: '',
    startDate: new Date(),
    endDate: new Date(),
  }

  const methods = useForm({
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (data) => {
    // eslint-disable-next-line no-console
    console.log('data', data)
  }
  const options = [
    {
      value: '1',
      label: 'Option 1',
    },
    {
      value: '2',
      label: 'Option 2',
    },
    {
      value: '3',
      label: 'Option 3',
    },
  ]
  return (
    <div>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Stack spacing={3} direction='row'>
            <RHFTextField name='search' label='Search' />
            <RHFBasicSelect
              label='Choose label'
              name='labelId'
              options={options}
            />
            <RHFBasicSelect
              label='Choose client'
              name='clientId'
              options={options}
            />
          </Stack>
          <Stack spacing={2} direction='row'>
            <RHFBasicSelect
              label='Choose member'
              name='memberId'
              options={options}
            />
            <RHFBasicSelect label='Choose job' name='jobId' options={options} />
            <RHFDatePicker name='startDate' />
            <RHFDatePicker name='endDate' />
          </Stack>
        </Stack>
        <Box sx={{ marginY: '20px' }}>
          <LoadingButton
            fullWidth
            size='large'
            type='submit'
            variant='contained'
            loading={isSubmitting}
          >
            Search
          </LoadingButton>
        </Box>
      </FormProvider>
    </div>
  )
}

export default Filter
