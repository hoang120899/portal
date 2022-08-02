import { useCallback } from 'react'
import { useEffect } from 'react'

import { useRouter } from 'next/router'

// @mui
import {
  Avatar,
  Box,
  Card,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from '@mui/material'

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
import { DOMAIN_SERVER_API, MAX_SIZE_FILEIMAGE } from '@/config'
// hooks
import useAuth from '@/hooks/useAuth'
import { useDispatch } from '@/redux/store'
// utils
import { fData } from '@/utils/formatNumber'

import { useGetUserProfileQuery } from './jobSlice'
import JobList from './list'
import { fetchUploadAPI } from './uploadAvatarSlice'

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const { user } = useAuth()
  const { data, isLoading, isFetching } = useGetUserProfileQuery({
    userId: router?.query?.id,
  })
  const { user: newUser = {} } = data?.data || {}
  const { name: userName, email, Role, Team, linkAvatar } = newUser || {}

  const isNewUserProfile = router.query.id !== user.userId

  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required('Name is required'),
  })

  useEffect(() => {
    setValue('displayName', userName || '')
    setValue('email', email || '')
    setValue('role', Role?.name || '')
    setValue('team', Team?.name || '')
    setValue('photoURL', `${DOMAIN_SERVER_API}/${linkAvatar}` || '')
  }, [setValue, userName, email, Role, Team, linkAvatar])

  const dispatch = useDispatch()
  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
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
        <Grid
          item
          xs={12}
          md={4}
          sx={{ maxHeight: { sm: '300px', xs: '420px' } }}
        >
          <Card
            sx={{
              py: 10,
              px: 3,
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            height={350}
          >
            {isNewUserProfile ? (
              <Avatar
                src={`${DOMAIN_SERVER_API}/${linkAvatar}`}
                sx={{ width: '120px', height: '120px' }}
              />
            ) : (
              <RHFUploadAvatar
                name='photoURL'
                accept='image/*'
                maxSize={3145728}
                onDrop={handleDrop}
                disabled={isNewUserProfile}
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
            )}
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          sx={{ maxHeight: { sm: '300px', xs: '420px' } }}
        >
          <Card
            sx={{
              py: 15,
              marginTop: 0,
              px: 3,
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {isLoading || isFetching ? (
              <Box sx={{ width: '100%' }}>
                <CircularProgress />
              </Box>
            ) : (
              <Box
                sx={{
                  width: '100%',
                  display: 'grid',
                  rowGap: 3,
                  columnGap: 2,
                  gridTemplateColumns: {
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                  },
                }}
              >
                <Stack alignItems={'flex-start'}>
                  <Typography
                    variant='body2'
                    sx={{ pl: 1, color: 'text.secondary' }}
                  >
                    Name
                  </Typography>
                  <RHFTextField name='displayName' disabled />
                </Stack>

                <Stack alignItems={'flex-start'}>
                  <Typography
                    variant='body2'
                    sx={{ pl: 1, color: 'text.secondary' }}
                  >
                    Email Address
                  </Typography>
                  <RHFTextField name='email' disabled />
                </Stack>

                <Stack alignItems={'flex-start'}>
                  <Typography
                    variant='body2'
                    sx={{ pl: 1, color: 'text.secondary' }}
                  >
                    Role
                  </Typography>

                  <RHFTextField name='role' disabled />
                </Stack>

                <Stack alignItems={'flex-start'}>
                  <Typography
                    variant='body2'
                    sx={{ pl: 1, color: 'text.secondary' }}
                  >
                    Team
                  </Typography>

                  <RHFTextField name='team' disabled />
                </Stack>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
      <Grid item xs={10} sx={{ mx: 0, marginTop: 5 }}>
        <JobList />
      </Grid>
    </FormProvider>
  )
}
