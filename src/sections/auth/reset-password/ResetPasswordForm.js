// next
import { useRouter } from 'next/router'

// @mui
import { LoadingButton } from '@mui/lab'
import { Stack } from '@mui/material'

// form
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

// components
import { FormProvider, RHFTextField } from '@/components/hook-form'
// routes
import { PATH_AUTH } from '@/routes/paths'

export default function ResetPasswordForm() {
  const { push } = useRouter()

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
  })

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: 'demo@minimals.cc' },
  })
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      sessionStorage.setItem('email-recovery', data.email)

      push(PATH_AUTH.newPassword)
    } catch (error) {
      // TODO
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name='email' label='Email address' />

        <LoadingButton
          fullWidth
          size='large'
          type='submit'
          variant='contained'
          loading={isSubmitting}
        >
          Send Request
        </LoadingButton>
      </Stack>
    </FormProvider>
  )
}
