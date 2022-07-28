import { useEffect, useState } from 'react'

import { LoadingButton } from '@mui/lab'
import {
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
import PreviewPdf from '@/components/PreviewPdf'
import {
  FormProvider,
  RHFBasicSelect,
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
  const { data } = useGetAdminCandidateDetailQuery({
    candidateId: id,
    currentRole,
  })
  const [isOpenPDF, setIsOpenPDF] = useState(false)
  const { name, email, jobs, phone, date } = data?.data?.data || {}
  const listJobs = jobs?.map(({ label, candidateJobId }) => ({
    label,
    value: candidateJobId,
  }))
  const cv = watch(DETAIL_FIELD.LINK_CV)
  const { base64, isLoadingPDF } = useSelector((state) => state.candidates)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!cv) return
    dispatch(convertDriverToBase64({ linkDrive: cv }))
  }, [cv, dispatch])
  useEffect(() => {
    setValue(DETAIL_FIELD.NAME, name || '')
    setValue(DETAIL_FIELD.EMAIl, email || '')
    setValue(DETAIL_FIELD.APPROACH_DATE, date)
    setValue(DETAIL_FIELD.PHONE, phone || '')
    setValue(DETAIL_FIELD.LINK_CV, jobs?.[0]?.cv)
    setValue(DETAIL_FIELD.CLIENT_ID, jobs?.[0]?.value)
    setValue(DETAIL_FIELD.LOCATION, jobs?.[0]?.location)
    setValue(DETAIL_FIELD.POSITION, jobs?.[0]?.candidateJob?.position)
    setValue(DETAIL_FIELD.NOT_APPROACH, jobs?.[0]?.candidateJob?.noteApproach)
  }, [setValue, name, email, cv, phone, date, jobs])
  useEffect(() => {
    setValue(DETAIL_FIELD.JOB_NAME, jobs?.[0]?.candidateJobId || '')
  }, [jobs, setValue])

  const handleOpenPDF = () => {
    setIsOpenPDF(true)
  }
  const handleChangeSelectJobs = (event) => {
    const value = event.target.value
    const job = jobs?.find((item) => item.candidateJobId === value)
    if (job) {
      setValue(DETAIL_FIELD.JOB_NAME, job?.candidateJobId || '')
      setValue(DETAIL_FIELD.CLIENT_ID, job?.value || '')
      setValue(DETAIL_FIELD.LOCATION, job?.location || '')
      setValue(DETAIL_FIELD.POSITION, job?.candidateJob?.position || '')
      setValue(DETAIL_FIELD.LINK_CV, job?.cv || '')
      setValue(DETAIL_FIELD.NOT_APPROACH, job?.candidateJob?.noteApproach || '')
    }
  }
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
                <RHFBasicSelect
                  name={DETAIL_FIELD.JOB_NAME}
                  label={'Job Name'}
                  options={listJobs}
                  onChange={handleChangeSelectJobs}
                  defaultValue={listJobs?.[0]?.value}
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
            {cv && base64 ? (
              <DialogActions>
                <LoadingButton
                  variant='contained'
                  loading={isLoadingPDF}
                  onClick={() => {
                    handleOpenPDF()
                  }}
                >
                  Raw CV
                </LoadingButton>
                <Button variant='outlined' color='inherit' onClick={onClose}>
                  Cancel
                </Button>
              </DialogActions>
            ) : (
              <DialogActions>
                <Button variant='outlined' color='inherit' onClick={onClose}>
                  Cancel
                </Button>
              </DialogActions>
            )}
          </Grid>
        </FormProvider>
        {base64 && cv ? (
          <PreviewPdf
            isOpen={isOpenPDF}
            onClose={() => setIsOpenPDF(false)}
            base64={base64}
          />
        ) : (
          ''
        )}
      </Stack>
    </Drawer>
  )
}
