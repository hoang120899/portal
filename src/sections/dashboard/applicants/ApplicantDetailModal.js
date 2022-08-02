import { Box, Button, Dialog, Divider, Stack, Typography } from '@mui/material'

import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

import Iconify from '@/components/Iconify'
import Scrollbar from '@/components/Scrollbar'
import {
  FormProvider,
  RHFDatePicker,
  RHFTextField,
} from '@/components/hook-form'
import useLocales from '@/hooks/useLocales'

ApplicantDetailModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  row: PropTypes.object,
}

export default function ApplicantDetailModal({ isOpen, onClose, row }) {
  const {
    Candidate = {},
    Job = {},
    approachDate = '',
    cv: linkCV = '',
    position = '',
    noteApproach = '',
  } = row
  const { email = '', name: candidateName = '', phone = '' } = Candidate
  const { title: jobTitle = '', Location = {}, Client = {} } = Job
  const { name: locationName = '' } = Location
  const { name: clientName = '' } = Client

  const { translate } = useLocales()

  const methods = useForm({
    defaultValues: {
      candidateName,
      jobTitle,
      locationName,
      clientName,
      email,
      phone,
      approachDate,
      linkCV,
      position,
      noteApproach,
    },
  })

  return (
    <Dialog fullWidth maxWidth='md' open={isOpen} onClose={onClose}>
      <Stack spacing={2} sx={{ p: 2.5 }}>
        <Typography
          variant='h6'
          sx={{ display: 'flex', justifyContent: 'flex-start' }}
        >
          {candidateName}
        </Typography>
        <Divider />
        <Box>
          <FormProvider methods={methods}>
            <Scrollbar
              sx={{
                maxHeight: {
                  xs: '400px',
                  md: '450px',
                  lg: '650px',
                },
              }}
            >
              <Stack direction='column'>
                <Box sx={{ width: '100%', mb: 2, mt: 1 }}>
                  <Typography>
                    {translate('Name')}
                    <span>*</span>
                  </Typography>
                  <RHFTextField name='candidateName' disabled />
                </Box>

                <Box sx={{ width: '100%', mb: 2 }}>
                  <Typography>
                    {translate('Name job')}
                    <span>*</span>
                  </Typography>
                  <RHFTextField name='jobTitle' disabled />
                </Box>

                <Box sx={{ width: '100%', mb: 2 }}>
                  <Stack spacing={2} direction='row'>
                    <Box sx={{ width: '100%', mb: 1 }}>
                      <Typography>
                        {translate('Location')}
                        <span>*</span>
                      </Typography>
                      <RHFTextField name='locationName' disabled />
                    </Box>
                    <Box sx={{ width: '100%', mb: 1 }}>
                      <Typography>
                        {translate('Client Name')}
                        <span>*</span>
                      </Typography>
                      <RHFTextField name='clientName' disabled />
                    </Box>
                  </Stack>
                </Box>

                <Box sx={{ width: '100%', mb: 2 }}>
                  <Typography>
                    {translate('Email')}
                    <span>*</span>
                  </Typography>
                  <RHFTextField name='email' disabled />
                </Box>

                <Box sx={{ width: '100%', mb: 2 }}>
                  <Stack spacing={2} direction='row'>
                    <Box sx={{ width: '100%', mb: 1 }}>
                      <Typography>
                        {translate('Phone')}
                        <span>*</span>
                      </Typography>
                      <RHFTextField name='phone' disabled />
                    </Box>
                    <Box sx={{ width: '100%', mb: 1 }}>
                      <Typography>
                        {translate('Approach Date')}
                        <span>*</span>
                      </Typography>
                      <RHFDatePicker
                        name='approachDate'
                        DatePickerProps={{ disabled: true }}
                      />
                    </Box>
                  </Stack>
                </Box>

                <Box sx={{ width: '100%', mb: 2 }}>
                  <Stack spacing={2} direction='row'>
                    <Box sx={{ width: '100%', mb: 2 }}>
                      <Typography>
                        {translate('Link CV')}
                        <span>*</span>
                      </Typography>
                      <RHFTextField name='linkCV' disabled />
                    </Box>
                    <Box sx={{ width: '100%', mb: 1 }}>
                      <Button component='div' disabled>
                        <Iconify
                          icon={'ant-design:upload-outlined'}
                          width={32}
                          height={32}
                        />
                      </Button>
                    </Box>
                  </Stack>
                </Box>

                <Box sx={{ width: '100%', mb: 2 }}>
                  <Typography>
                    {translate('Position')}
                    <span>*</span>
                  </Typography>
                  <RHFTextField name='position' disabled />
                </Box>

                <Box sx={{ width: '100%', mb: 2 }}>
                  <Typography>
                    {translate('Note Approach')}
                    <span>*</span>
                  </Typography>
                  <RHFTextField
                    name='noteApproach'
                    multiline
                    rows={5}
                    disabled
                  />
                </Box>
              </Stack>
              {/* <Grid container rowSpacing={1} sx={{ overflow: 'hidden' }}>
                <Grid item xs={12} alignSelf='center'>
                  <Typography>
                    {translate('Name')}
                    <span>*</span>
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <RHFTextField name='candidateName' disabled />
                </Grid>

                <Grid item xs={12} alignSelf='center'>
                  <Typography>
                    {translate('Name job')}
                    <span>*</span>
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <RHFTextField name='jobTitle' disabled />
                </Grid>

                <Grid item xs={12}>
                  <Grid container columnSpacing={3}>
                    <Grid item xs={6} alignSelf='center'>
                      <Typography>
                        {translate('Location')}
                        <span>*</span>
                      </Typography>
                    </Grid>

                    <Grid item xs={6} alignSelf='center'>
                      <Typography>
                        {translate('Client Name')}
                        <span>*</span>
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <RHFTextField name='locationName' disabled />
                    </Grid>

                    <Grid item xs={6}>
                      <RHFTextField name='clientName' disabled />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} alignSelf='center'>
                  <Typography>
                    {translate('Email')}
                    <span>*</span>
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <RHFTextField name='email' disabled />
                </Grid>

                <Grid item xs={12}>
                  <Grid container columnSpacing={3}>
                    <Grid item xs={6} alignSelf='center'>
                      <Typography>
                        {translate('Phone')}
                        <span>*</span>
                      </Typography>
                    </Grid>

                    <Grid item xs={6} alignSelf='center'>
                      <Typography>
                        {translate('Approach Date')}
                        <span>*</span>
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <RHFTextField name='phone' disabled />
                    </Grid>

                    <Grid item xs={6}>
                      <RHFDatePicker
                        name='approachDate'
                        DatePickerProps={{ disabled: true }}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} alignSelf='center'>
                  <Typography>
                    {translate('Link CV')}
                    <span>*</span>
                  </Typography>
                </Grid>

                <Grid item xs={11}>
                  <RHFTextField name='linkCV' disabled />
                </Grid>

                <Grid item xs={1}>
                  <Button component='div' disabled>
                    <Iconify
                      icon={'ant-design:upload-outlined'}
                      width={32}
                      height={32}
                    />
                  </Button>
                </Grid>

                <Grid item xs={12} alignSelf='center'>
                  <Typography>
                    {translate('Position')}
                    <span>*</span>
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <RHFTextField name='position' disabled />
                </Grid>

                <Grid item xs={12} alignSelf='center'>
                  <Typography>
                    {translate('Note Approach')}
                    <span>*</span>
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <RHFTextField
                    name='noteApproach'
                    multiline
                    rows={5}
                    disabled
                  />
                </Grid>
              </Grid> */}
            </Scrollbar>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                onClick={onClose}
                variant='outlined'
                sx={{
                  color: 'inherit',
                  borderColor: 'grey.400',
                  '&:hover': {
                    borderColor: 'grey.400',
                    bgcolor: 'background.neutral',
                  },
                }}
              >
                {translate('Cancel')}
              </Button>
            </Box>
          </FormProvider>
        </Box>
      </Stack>
    </Dialog>
  )
}
