import { useCallback } from 'react'

// @mui
import { Box, Card, Grid, Typography } from '@mui/material'

import { yupResolver } from '@hookform/resolvers/yup'
import { useSnackbar } from 'notistack'
// form
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

// components
import {
  FormProvider,
  RHFTextField,
  RHFUploadAvatar,
} from '@/components/hook-form'
import { MAX_SIZE_FILEIMAGE } from '@/config'
// hooks
import useAuth from '@/hooks/useAuth'
import { useDispatch } from '@/redux/store'
// utils
import { fData } from '@/utils/formatNumber'

import { fetchUploadAPI } from './uploadAvatarSlice'
import JobList from './profile'

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar()

  const { user } = useAuth()

  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required('Name is required'),
  })

  const defaultValues = {
    displayName: user?.displayName || '',
    email: user?.email || '',
    team: user?.team || '',
    role: user?.role || '',
    photoURL: user?.photoURL || '',
    phoneNumber: user?.phoneNumber || '',
    address: user?.address || '',
    state: user?.state || '',
    city: user?.city || '',
    zipCode: user?.zipCode || '',
    about: user?.about || '',
    isPublic: user?.isPublic || false,
  }
  const dispatch = useDispatch()
  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  })

  const { setValue, handleSubmit } = methods

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      enqueueSnackbar('Update success!')
    } catch (error) {
      // TODO
    }
  }
  const handleDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file && file.size < MAX_SIZE_FILEIMAGE) {
        const formData = new FormData()
        formData.append('linkAvatar', file)

        const response = await dispatch(fetchUploadAPI(formData))
        if (response.payload.code === 200) {
          enqueueSnackbar('Update Avatar Success!')
        } else {
          enqueueSnackbar('Update Avatar Error!')
        }
        setValue(
          'photoURL',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      } else {
        enqueueSnackbar('The photo you entered is over the allowed size!')
      }
    },
    [setValue, enqueueSnackbar, dispatch]
  )

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }} height={350}>
            <RHFUploadAvatar
              name='photoURL'
              accept='image/*'
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant='caption'
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={8} height={350}>
          <Card sx={{ py: 15, marginTop: 0, px: 3, textAlign: 'center' }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 5,
                columnGap: 2,
                gridTemplateColumns: {
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                },
              }}
            >
              <RHFTextField name='displayName' label='Name' disabled='true' />
              <RHFTextField
                name='email'
                label='Email Address'
                disabled='true'
              />

              <RHFTextField name='role' label='Role' disabled='true' />
              <RHFTextField name='team' label='Team' disabled='true' />
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Grid item xs={10} sx={{ mx: 0, marginTop: 5 }}>
        <JobList />
      </Grid>
    </FormProvider>
  )
}
