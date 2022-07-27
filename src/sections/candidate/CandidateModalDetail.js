import { useEffect } from 'react'

import {
  Box,
  Button,
  DialogActions,
  Divider,
  Drawer,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material'

import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import Iconify from '@/components/Iconify'
import {
  FormProvider,
  RHFAutocomplete,
  RHFDateTimePicker,
  RHFTextField,
} from '@/components/hook-form'
import useRole from '@/hooks/useRole'

import {
  convertDriverToBase64,
  useGetAdminCandidateDetailQuery,
} from './candidateSlice'
import { DETAIL_FIELD } from './config'

CandidateModalDetail.propTypes = {
  disabled: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  detailCandidate: PropTypes.object,
}

export default function CandidateModalDetail({
  isOpen = false,
  onClose,
  disabled = false,
  detailCandidate,
}) {
  const methods = useForm({
    defaultValues: {},
  })
  const { currentRole } = useRole()

  const { setValue, watch } = methods
  const { id } = detailCandidate
  const jobCandidate = watch(DETAIL_FIELD.JOB_NAME)
  const { data, isFetching } = useGetAdminCandidateDetailQuery({
    candidateId: id,
    currentRole,
  })

  const { name, email, jobs, phone, date } = data?.data?.data || {}
  const listJobs = jobs?.map(
    ({ label, value, location, cv, candidateJob, candidateJobId }) => ({
      label,
      value,
      location,
      cv,
      candidateJob,
      id: candidateJobId,
    })
  )
  let base64 = useSelector((state) => state.candidates.base64)
  const dispatch = useDispatch()
  useEffect(() => {
    if (watch(DETAIL_FIELD.LINK_CV)) {
      const data = {
        linkDrive: watch(DETAIL_FIELD.LINK_CV),
      }
      dispatch(convertDriverToBase64(data))
    }
  }, [watch, base64, dispatch])
  useEffect(() => {
    setValue(DETAIL_FIELD.NAME, name)
    setValue(DETAIL_FIELD.EMAIl, email)
    setValue(DETAIL_FIELD.APPROACH_DATE, date)
    setValue(DETAIL_FIELD.PHONE, phone)
    setValue(DETAIL_FIELD.JOB_NAME, listJobs?.[0])
  }, [setValue, name, email, phone, date, listJobs])
  useEffect(() => {
    if (jobCandidate) {
      const job = jobs?.find((item) => item.candidateJobId === jobCandidate?.id)
      setValue(DETAIL_FIELD.LOCATION, job?.location || '')
      setValue(DETAIL_FIELD.CLIENT_ID, job?.value || '')
      setValue(DETAIL_FIELD.LINK_CV, job?.cv || '')
      setValue(DETAIL_FIELD.POSITION, job?.candidateJob.position || '')
      setValue(DETAIL_FIELD.NOT_APPROACH, job?.candidateJob.noteApproach || '')
    }
  }, [jobCandidate, jobs, setValue])
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      anchor='right'
      PaperProps={{ sx: { width: { xs: 1, sm: 480, md: 640 } } }}
    >
      <Stack spacing={2}>
        <Typography
          variant='subtitle1'
          sx={{ fontWeight: 'bold', px: 2, mt: 2, fontSize: 18 }}
        >
          {name}{' '}
        </Typography>
        <Divider />
        <FormProvider methods={methods}>
          <Grid container spacing={2} sx={{ px: 2, pb: 2 }}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <Typography>Name</Typography>
                <RHFTextField
                  disabled={disabled}
                  name={DETAIL_FIELD.NAME}
                  placeholder='Name'
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <Typography>Job Name</Typography>
                <RHFAutocomplete
                  name={DETAIL_FIELD.JOB_NAME}
                  label={'Job Name'}
                  AutocompleteProps={{
                    size: 'small',
                    loading: isFetching,
                    renderOption: (props, option) => (
                      <Box key={option.key} component='li' {...props}>
                        {option.label}
                      </Box>
                    ),
                    onChange: (field) => (event, newValue) => {
                      field.onChange(newValue)
                    },
                    value: '',
                  }}
                  options={listJobs}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <Typography>Location</Typography>
                <RHFTextField
                  disabled={disabled}
                  name={DETAIL_FIELD.LOCATION}
                  placeholder='Location'
                />
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <Typography>Client Name:</Typography>
                <RHFTextField
                  disabled={disabled}
                  name={DETAIL_FIELD.CLIENT_ID}
                  placeholder='Client Name'
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack>
                <Typography>Email</Typography>
                <RHFTextField
                  disabled={disabled}
                  name={DETAIL_FIELD.EMAIl}
                  placeholder='Email'
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <Typography>Phone</Typography>
                <RHFTextField
                  disabled={disabled}
                  name={DETAIL_FIELD.PHONE}
                  placeholder='Phone'
                />
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <Typography>Approach Date</Typography>
                <RHFDateTimePicker
                  disabled={disabled}
                  name={DETAIL_FIELD.APPROACH_DATE}
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <Typography>Link CV</Typography>
                <Grid sx={{ display: 'flex' }}>
                  <RHFTextField
                    disabled={disabled}
                    name={DETAIL_FIELD.LINK_CV}
                    placeholder='Enter link or import cv'
                  />
                  {base64 ? (
                    <Link
                      download={`${name ? name : ''}.pdf`}
                      href={`data:application/pdf;base64,${base64}`}
                    >
                      <Button>
                        <Iconify
                          icon={'fa:cloud-download'}
                          width={32}
                          height={32}
                        />
                      </Button>
                    </Link>
                  ) : (
                    <Button>
                      <Iconify
                        icon={'fa:cloud-download'}
                        width={32}
                        height={32}
                      />
                    </Button>
                  )}
                </Grid>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <Typography>Position:</Typography>
                <RHFTextField
                  disabled={disabled}
                  name={DETAIL_FIELD.POSITION}
                  placeholder='Position'
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <Typography>Note Approach</Typography>
                <RHFTextField
                  disabled={disabled}
                  name={DETAIL_FIELD.NOT_APPROACH}
                  multiline
                  rows={3}
                />
              </Stack>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={3}>
            <DialogActions>
              <Button variant='outlined' color='inherit' onClick={onClose}>
                Cancel
              </Button>
            </DialogActions>
          </Grid>
        </FormProvider>
      </Stack>
    </Drawer>
  )
}
