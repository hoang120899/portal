import { useEffect, useRef, useState } from 'react'

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

import CopyClipboard from '@/components/CopyClipboard'
import Iconify from '@/components/Iconify'
import PreviewPdf from '@/components/PreviewPdf'
import {
  FormProvider,
  RHFBasicSelect,
  RHFDateTimePicker,
  RHFTextField,
} from '@/components/hook-form'
import { DATE_YEAR_MONTH_DAY_FORMAT } from '@/config'
import useLocales from '@/hooks/useLocales'
import { useDispatch, useSelector } from '@/redux/store'
import { fDate, fDateCalendar } from '@/utils/formatTime'

import {
  convertDriverToBase64,
  getAdminCandidateDetail,
} from './candidateSlice'
import { DETAIL_FIELD, URL_DOWNLOAD_CV } from './config'

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
  const copyLinkCVRef = useRef()
  const { translate } = useLocales()

  const defaultValues = {
    [DETAIL_FIELD.NAME]: '',
    [DETAIL_FIELD.JOB_NAME]: '',
    [DETAIL_FIELD.LOCATION]: '',
    [DETAIL_FIELD.CLIENT_ID]: '',
    [DETAIL_FIELD.PHONE]: '',
    [DETAIL_FIELD.APPROACH_DATE]: '',
    [DETAIL_FIELD.LINK_CV]: '',
    [DETAIL_FIELD.POSITION]: '',
    [DETAIL_FIELD.NOT_APPROACH]: '',
  }

  const methods = useForm({
    defaultValues: defaultValues,
  })
  const { setValue, watch } = methods

  const { id } = detailCandidate

  const { base64, candidateDetail, isLoadingPDF } = useSelector(
    (state) => state.candidates
  )
  const dispatch = useDispatch()

  const {
    name = '',
    email = '',
    jobs = [],
    phone = '',
    date = '',
  } = candidateDetail

  const [copyLinkCVText, setCopyLinkCVText] = useState('')
  const [isOpenPDF, setIsOpenPDF] = useState(false)

  const cvJob = watch(DETAIL_FIELD.LINK_CV)
  const [jobDefault] = jobs

  const {
    label = '',
    cv = '',
    value = '',
    location = '',
    candidateJob = {},
  } = jobDefault || {}

  const { position = '', noteApproach = '' } = candidateJob || {}

  const jobArray = (jobs || []).map(({ label }) => ({
    label,
    value: label,
  }))
  useEffect(() => {
    if (!id) return

    dispatch(
      getAdminCandidateDetail({
        candidateId: id,
      })
    )
  }, [dispatch, id])

  useEffect(() => {
    if (!cvJob) return

    setCopyLinkCVText(copyLinkCVRef.current?.value)
    dispatch(convertDriverToBase64({ linkDrive: cvJob }))
  }, [cvJob, dispatch])

  useEffect(() => {
    setValue(DETAIL_FIELD.NAME, name)
    setValue(DETAIL_FIELD.EMAIl, email)
    setValue(
      DETAIL_FIELD.APPROACH_DATE,
      fDate(fDateCalendar(date), DATE_YEAR_MONTH_DAY_FORMAT)
    )
    setValue(DETAIL_FIELD.PHONE, phone)
    setValue(DETAIL_FIELD.JOB_NAME, label)
    setValue(DETAIL_FIELD.LINK_CV, cv)
    setValue(DETAIL_FIELD.CLIENT_ID, value)
    setValue(DETAIL_FIELD.LOCATION, location)
    setValue(DETAIL_FIELD.POSITION, position || '')
    setValue(DETAIL_FIELD.NOT_APPROACH, noteApproach || '')
  }, [
    id,
    setValue,
    name,
    email,
    phone,
    date,
    label,
    cv,
    value,
    location,
    position,
    noteApproach,
  ])

  const handleOpenPDF = () => {
    setIsOpenPDF(true)
  }

  const handleChangeSelectJobs = (event) => {
    const valueSelect = event.target.value
    const jobItem = (jobs || []).find((item) => item.label === valueSelect)
    if (!jobItem) return

    const {
      label = '',
      value = '',
      cv = '',
      location = '',
      candidateJob = {},
    } = jobItem
    const { position = '', noteApproach = '' } = candidateJob

    setValue(DETAIL_FIELD.JOB_NAME, label)
    setValue(DETAIL_FIELD.CLIENT_ID, value)
    setValue(DETAIL_FIELD.LOCATION, location)
    setValue(DETAIL_FIELD.POSITION, position)
    setValue(DETAIL_FIELD.LINK_CV, cv)
    setValue(DETAIL_FIELD.NOT_APPROACH, noteApproach)
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
          {name}
        </Typography>

        <Divider />

        <FormProvider methods={methods}>
          <Grid container spacing={2} sx={{ px: 2, pb: 2 }}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <Typography> {translate('pages.candidates.name')}</Typography>
                <RHFTextField
                  name={DETAIL_FIELD.NAME}
                  disabled={disabled}
                  placeholder='Name'
                />
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={1}>
                <Typography>{translate('pages.candidates.jobName')}</Typography>
                <RHFBasicSelect
                  name={DETAIL_FIELD.JOB_NAME}
                  label={'Job Name'}
                  options={jobArray}
                  onChange={handleChangeSelectJobs}
                />
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <Typography>
                  {translate('pages.candidates.location')}
                </Typography>
                <RHFTextField
                  name={DETAIL_FIELD.LOCATION}
                  disabled={disabled}
                  placeholder={translate('pages.candidates.location')}
                />
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <Typography>{translate('pages.candidates.client')}</Typography>
                <RHFTextField
                  name={DETAIL_FIELD.CLIENT_ID}
                  disabled={disabled}
                  placeholder={translate('pages.candidates.client')}
                />
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack>
                <Typography>{translate('pages.candidates.email')}</Typography>
                <RHFTextField
                  name={DETAIL_FIELD.EMAIl}
                  disabled={disabled}
                  placeholder={translate('pages.candidates.email')}
                />
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <Typography>{translate('pages.candidates.phone')}</Typography>
                <RHFTextField
                  name={DETAIL_FIELD.PHONE}
                  disabled={disabled}
                  placeholder={translate('pages.candidates.phone')}
                />
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <Typography>
                  {translate('pages.candidates.approachDate')}
                </Typography>
                <RHFDateTimePicker
                  name={DETAIL_FIELD.APPROACH_DATE}
                  disabled={disabled}
                />
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={1}>
                <Typography>{translate('pages.candidates.linkCV')}</Typography>
                <Grid sx={{ display: 'flex' }}>
                  <RHFTextField
                    inputRef={copyLinkCVRef}
                    name={DETAIL_FIELD.LINK_CV}
                    disabled={disabled}
                    placeholder={translate('pages.candidates.linkCV')}
                  />

                  {base64 && (
                    <Link
                      download={`${name ? name : ''}.pdf`}
                      href={`${URL_DOWNLOAD_CV},${base64}`}
                    >
                      <Button>
                        <Iconify
                          icon={'fa:cloud-download'}
                          width={32}
                          height={32}
                        />
                      </Button>
                    </Link>
                  )}

                  {cvJob && (
                    <CopyClipboard
                      value={copyLinkCVText}
                      placement='top-start'
                      arrow
                    >
                      <Button>
                        <Iconify
                          icon={'fluent:copy-16-regular'}
                          width={32}
                          height={32}
                        />
                      </Button>
                    </CopyClipboard>
                  )}
                </Grid>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={1}>
                <Typography>
                  {translate('pages.candidates.position')}
                </Typography>
                <RHFTextField
                  name={DETAIL_FIELD.POSITION}
                  disabled={disabled}
                  placeholder={translate('pages.candidates.position')}
                />
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack spacing={0}>
                <Typography>
                  {translate('pages.candidates.notApproach')}
                </Typography>
                <RHFTextField
                  name={DETAIL_FIELD.NOT_APPROACH}
                  disabled={disabled}
                  multiline
                  rows={3}
                />
              </Stack>
            </Grid>
          </Grid>

          <Grid item xs={12} mt={3}>
            <DialogActions>
              {cvJob && (
                <LoadingButton
                  variant='contained'
                  loading={isLoadingPDF}
                  onClick={handleOpenPDF}
                >
                  {translate('pages.candidates.rawCV')}
                </LoadingButton>
              )}

              <Button variant='outlined' color='inherit' onClick={onClose}>
                {translate('pages.candidates.cancel')}
              </Button>
            </DialogActions>
          </Grid>
        </FormProvider>

        {base64 && (
          <PreviewPdf
            isOpen={isOpenPDF}
            onClose={() => setIsOpenPDF(false)}
            base64={base64}
          />
        )}
      </Stack>
    </Drawer>
  )
}
