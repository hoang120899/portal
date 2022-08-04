// @mui
import { LoadingButton } from '@mui/lab'
import { Card, Stack } from '@mui/material'

// form
import { yupResolver } from '@hookform/resolvers/yup'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

// components
import { FormProvider, RHFTextField } from '@/components/hook-form'

export default function AccountChangePassword() {
  const { enqueueSnackbar } = useSnackbar()

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('New Password is required'),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref('newPassword'), null],
      'Passwords must match'
    ),
  })

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  }

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      reset()
      enqueueSnackbar('Update success!')
    } catch (error) {
      // TODO
    }
  }

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems='flex-end'>
          <RHFTextField
            name='oldPassword'
            type='password'
            label='Old Password'
          />

          <RHFTextField
            name='newPassword'
            type='password'
            label='New Password'
          />

          <RHFTextField
            name='confirmNewPassword'
            type='password'
            label='Confirm New Password'
          />

          <LoadingButton
            type='submit'
            variant='contained'
            loading={isSubmitting}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  )
}
