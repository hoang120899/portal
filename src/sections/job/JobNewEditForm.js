import { useEffect, useMemo } from 'react'

// next
import { useRouter } from 'next/router'

// @mui
import { LoadingButton } from '@mui/lab'
import { Box, Card, Stack } from '@mui/material'

import { yupResolver } from '@hookform/resolvers/yup'
import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'
// form
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

// components
import { FormProvider, RHFTextField } from '@/components/hook-form'
// routes
import { PATH_DASHBOARD } from '@/routes/paths'

JobNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
}

export default function JobNewEditForm({ isEdit = false, currentUser }) {
  const { push } = useRouter()

  const { enqueueSnackbar } = useSnackbar()

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    company: Yup.string().required('Company is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    role: Yup.string().required('Role Number is required'),
  })

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      address: currentUser?.address || '',
      state: currentUser?.state || '',
      city: currentUser?.city || '',
      zipCode: currentUser?.zipCode || '',
      company: currentUser?.company || '',
      role: currentUser?.role || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  )

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues)
    }
    if (!isEdit) {
      reset(defaultValues)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser])

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      reset()
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!')
      push(PATH_DASHBOARD.jobs.root)
    } catch (error) {
      // TODO
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'grid',
            columnGap: 2,
            rowGap: 3,
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
          }}
        >
          <RHFTextField name='name' label='Full Name' />
          <RHFTextField name='email' label='Email Address' />
          <RHFTextField name='phoneNumber' label='Phone Number' />
          <RHFTextField name='state' label='State/Region' />
          <RHFTextField name='city' label='City' />
          <RHFTextField name='address' label='Address' />
          <RHFTextField name='zipCode' label='Zip/Code' />
          <RHFTextField name='company' label='Company' />
          <RHFTextField name='role' label='Role' />
        </Box>

        <Stack alignItems='flex-end' sx={{ mt: 3 }}>
          <LoadingButton
            type='submit'
            variant='contained'
            loading={isSubmitting}
          >
            {!isEdit ? 'Create Job' : 'Save Changes'}
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  )
}
