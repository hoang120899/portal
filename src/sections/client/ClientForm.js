import { LoadingButton } from '@mui/lab'
import { Button, DialogActions, Grid, Stack, Typography } from '@mui/material'

import { yupResolver } from '@hookform/resolvers/yup'
import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { FormProvider, RHFEditor, RHFTextField } from '@/components/hook-form'
import useLocales from '@/hooks/useLocales'

import { DEFAULT_CLIENT_DATA, FORM_FIELD } from './list/config'

ClientForm.propTypes = {
  client: PropTypes.object,
  disabled: PropTypes.bool,
  canEdit: PropTypes.bool,
  onClose: PropTypes.func,
  createClient: PropTypes.func,
  updateClient: PropTypes.func,
}

export default function ClientForm({
  client,
  disabled = false,
  canEdit = false,
  onClose,
  createClient,
  updateClient,
}) {
  const { translate } = useLocales()
  const { enqueueSnackbar } = useSnackbar()

  const { id: clientId } = client || {}

  const ClientFormSchema = Yup.object().shape({
    name: Yup.string().max(5000).required('Name is required'),
    about: Yup.string().max(5000).required('About is required'),
  })

  const methods = useForm({
    resolver: yupResolver(ClientFormSchema),
    defaultValues: Object.keys(FORM_FIELD).reduce((acc, cur) => {
      const field = FORM_FIELD[cur]
      return {
        ...acc,
        [field]: client[field] || DEFAULT_CLIENT_DATA[field],
      }
    }, {}),
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (data) => {
    try {
      if (clientId) {
        await updateClient({ clientId, data }).unwrap()
        enqueueSnackbar(translate('Update client success!'))
      } else {
        await createClient(data).unwrap()
        enqueueSnackbar(translate('Create client success!'))
      }
      reset()
      onClose()
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} px={3} py={3}>
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <Typography>{translate('Name')}</Typography>
            <RHFTextField disabled={disabled} name='name' />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack spacing={1}>
            <Typography>{translate('Website')}</Typography>
            <RHFTextField disabled={disabled} name='website' />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2} direction='row' alignItems='center'>
            <Typography>{translate('Color')}</Typography>
            <RHFTextField
              disabled={disabled}
              name='background'
              type='color'
              sx={{ maxWidth: 100 }}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography>{translate('About')}</Typography>
            <RHFEditor readOnly={disabled} name='about' />
          </Stack>
        </Grid>
        <Grid item xs={12} mt={3}>
          <DialogActions>
            {canEdit && (
              <LoadingButton
                type='submit'
                variant='contained'
                loading={isSubmitting}
              >
                {translate('Save')}
              </LoadingButton>
            )}
            <Button variant='outlined' color='inherit' onClick={onClose}>
              {translate('Cancel')}
            </Button>
          </DialogActions>
        </Grid>
      </Grid>
    </FormProvider>
  )
}
