import { useState } from 'react'

// @mui
import { LoadingButton } from '@mui/lab'
import { Alert, IconButton, InputAdornment, Stack } from '@mui/material'

// form
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

// components
import Iconify from '@/components/Iconify'
import { FormProvider, RHFCheckbox, RHFTextField } from '@/components/hook-form'
// hooks
import useAuth from '@/hooks/useAuth'
import useIsMountedRef from '@/hooks/useIsMountedRef'

export default function LoginForm() {
  const { login } = useAuth()

  const isMountedRef = useIsMountedRef()

  const [showPassword, setShowPassword] = useState(false)

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  })

  const defaultValues = {
    email: 'demo@minimals.cc',
    password: 'demo1234',
    remember: true,
  }

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  })

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password)
    } catch (error) {
      reset()

      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message })
      }
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity='error'>{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField name='email' label='Email address' />

        <RHFTextField
          name='password'
          label='Password'
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge='end'
                >
                  <Iconify
                    icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{ my: 2 }}
      >
        <RHFCheckbox name='remember' label='Remember me' />
      </Stack>

      <LoadingButton
        fullWidth
        size='large'
        type='submit'
        variant='contained'
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </FormProvider>
  )
}
