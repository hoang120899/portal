import { Box, Button, Dialog, Divider, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

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

const AsteriskStyle = styled('span')(({ theme }) => ({
  color: theme.palette.error.main,
  fontWeight: 700,
}))

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
                  xs: `${0.5 * screen.height}px`,
                  lg: `600px`,
                },
              }}
            >
              <Stack direction='column'>
                <Box sx={{ mb: 2, mt: 1 }}>
                  <Typography>
                    {translate('pages.dashboard.applicants.name')}
                    <AsteriskStyle> *</AsteriskStyle>
                  </Typography>
                  <RHFTextField name='candidateName' disabled />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography>
                    {translate('pages.dashboard.applicants.nameJob')}
                    <AsteriskStyle> *</AsteriskStyle>
                  </Typography>
                  <RHFTextField name='jobTitle' disabled />
                </Box>

                <Stack
                  spacing={{ xs: 1, sm: 2 }}
                  direction={{ xs: 'column', sm: 'row' }}
                  sx={{ width: '100%', mb: 2 }}
                >
                  <Box sx={{ width: '100%', mb: 1 }}>
                    <Typography>
                      {translate('pages.dashboard.applicants.location')}
                      <AsteriskStyle> *</AsteriskStyle>
                    </Typography>
                    <RHFTextField name='locationName' disabled />
                  </Box>

                  <Box sx={{ width: '100%', mb: 1 }}>
                    <Typography>
                      {translate('pages.dashboard.applicants.clientName')}
                    </Typography>
                    <RHFTextField name='clientName' disabled />
                  </Box>
                </Stack>

                <Box sx={{ mb: 2 }}>
                  <Typography>
                    {translate('pages.dashboard.applicants.email')}
                    <AsteriskStyle> *</AsteriskStyle>
                  </Typography>
                  <RHFTextField name='email' disabled />
                </Box>

                <Stack
                  spacing={{ xs: 1, sm: 2 }}
                  direction={{ xs: 'column', sm: 'row' }}
                  sx={{ width: '100%', mb: 2 }}
                >
                  <Box sx={{ width: '100%', mb: 1 }}>
                    <Typography>
                      {translate('pages.dashboard.applicants.phone')}
                      <AsteriskStyle> *</AsteriskStyle>
                    </Typography>
                    <RHFTextField name='phone' disabled />
                  </Box>

                  <Box sx={{ width: '100%', mb: 1 }}>
                    <Typography>
                      {translate('pages.dashboard.applicants.approachDate')}
                      <AsteriskStyle> *</AsteriskStyle>
                    </Typography>
                    <RHFDatePicker
                      name='approachDate'
                      DatePickerProps={{ disabled: true }}
                    />
                  </Box>
                </Stack>

                <Stack spacing={2} direction='row' sx={{ width: '100%' }}>
                  <Box sx={{ width: '95%', mb: 2 }}>
                    <Typography>
                      {translate('pages.dashboard.applicants.linkCv')}
                    </Typography>
                    <RHFTextField name='linkCV' disabled />
                  </Box>

                  <Box
                    sx={{
                      ml: '0 !important',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Button component='div' disabled>
                      <Iconify
                        icon='ant-design:download-outlined'
                        width={36}
                        height={36}
                      />
                    </Button>
                  </Box>
                </Stack>

                <Box sx={{ width: '100%', mb: 2 }}>
                  <Typography>
                    {translate('pages.dashboard.applicants.position')}
                  </Typography>
                  <RHFTextField name='position' disabled />
                </Box>

                <Box sx={{ width: '100%', mb: 2 }}>
                  <Typography>
                    {translate('pages.dashboard.applicants.noteApproach')}
                  </Typography>
                  <RHFTextField
                    name='noteApproach'
                    multiline
                    rows={5}
                    disabled
                  />
                </Box>
              </Stack>
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
                {translate('pages.dashboard.applicants.cancel')}
              </Button>
            </Box>
          </FormProvider>
        </Box>
      </Stack>
    </Dialog>
  )
}
