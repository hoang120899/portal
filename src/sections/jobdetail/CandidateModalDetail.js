import { useEffect, useState } from 'react'

import { LoadingButton } from '@mui/lab'
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

import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import Assignee from '@/components/Assignee'
import Iconify from '@/components/Iconify'
import PreviewPdf from '@/components/PreviewPdf'
import {
  FormProvider,
  RHFBasicSelect,
  RHFDateTimePicker,
  RHFTextField,
} from '@/components/hook-form'
import useLocales from '@/hooks/useLocales'
import useRole from '@/hooks/useRole'
import { useDispatch, useSelector } from '@/redux/store'
import { DETAIL_FIELD } from '@/sections/jobdetail/config'

import {
  convertDriverToBase64,
  useGetAdminCandidateDetailQuery,
} from './jobDetailSlice'

CandidateModalDetail.propTypes = {
  disabled: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  detailCandidate: PropTypes.object,
  assignListUser: PropTypes.array,
  laneSelected: PropTypes.array,
  handleUpdateCandidate: PropTypes.func,
  smDown: PropTypes.bool,
}

export default function CandidateModalDetail({
  isOpen = false,
  onClose,
  disabled = false,
  detailCandidate,
  assignListUser,
  laneSelected,
  handleUpdateCandidate,
  smDown,
}) {
  const defaultValues = {
    [DETAIL_FIELD.NAME]: '',
    [DETAIL_FIELD.JOB_NAME]: '',
    [DETAIL_FIELD.LOCATION]: '',
    [DETAIL_FIELD.CLIENT_ID]: '',
    [DETAIL_FIELD.EMAIl]: '',
    [DETAIL_FIELD.PHONE]: '',
    [DETAIL_FIELD.APPROACH_DATE]: '',
    [DETAIL_FIELD.LINK_CV]: '',
    [DETAIL_FIELD.POSITION]: '',
    [DETAIL_FIELD.NOTE_APPROACH]: '',
    [DETAIL_FIELD.LANE]: '',
  }

  const { translate } = useLocales()

  const candidateSchema = Yup.object().shape({
    [DETAIL_FIELD.POSITION]: Yup.string().required(
      translate('pages.jobs.positionMessage')
    ),
    [DETAIL_FIELD.LANE]: Yup.string().required(
      translate('pages.jobs.laneMessage')
    ),
    [DETAIL_FIELD.APPROACH_DATE]: Yup.string().required(
      translate('pages.jobs.approachDateMessage')
    ),
    [DETAIL_FIELD.NOTE_APPROACH]: Yup.string().required(
      translate('pages.jobs.noteApproachTitle')
    ),
  })
  const methods = useForm({
    resolver: yupResolver(candidateSchema),
    defaultValues: defaultValues,
  })
  const { currentRole } = useRole()
  const {
    setValue,
    formState: { isSubmitting },
    handleSubmit,
  } = methods
  const { idCandidateJob } = detailCandidate
  const { data: candidateData } = useGetAdminCandidateDetailQuery({
    id: idCandidateJob,
    isEdit: true,
    currentRole,
  })
  const { card } = candidateData?.data || {}
  const {
    Candidate,
    Job,
    approachDate,
    cv,
    position,
    noteApproach,
    Users,
    Lane,
  } = card || {}

  const base64 = useSelector((state) => state.jobs.candidateJob.base64)
  const isLoadingBase = useSelector(
    (state) => state.jobs.candidateJob.isLoading
  )
  const dispatch = useDispatch()
  const [listAssign, setListAssign] = useState([])
  const [isOpenCV, setIsOpenCV] = useState(false)

  const onCloseCV = () => {
    setIsOpenCV(false)
  }

  const onSubmit = async (data) => {
    data = {
      ...data,
      listAssign,
      from: 'card_trello_modal',
      id: idCandidateJob,
    }
    await handleUpdateCandidate(data)
  }
  const onToggleAssignee = (checked, userId) => {
    if (checked) {
      setListAssign(listAssign.filter((item) => item.id !== userId))
    } else {
      const user = assignListUser.find((item) => item.id === userId)
      setListAssign([...listAssign, user])
    }
  }
  useEffect(() => {
    if (!cv) return
    dispatch(convertDriverToBase64({ linkDrive: cv }))
  }, [cv, dispatch])

  useEffect(() => {
    setValue(DETAIL_FIELD.NAME, Candidate?.name || '')
    setValue(DETAIL_FIELD.JOB_NAME, Job?.title || '')
    setValue(DETAIL_FIELD.LOCATION, Job?.Location?.name || '')
    setValue(DETAIL_FIELD.CLIENT_ID, Job?.Client?.name || '')
    setValue(DETAIL_FIELD.EMAIl, Candidate?.email || '')
    setValue(DETAIL_FIELD.PHONE, Candidate?.phone || '')
    setValue(DETAIL_FIELD.APPROACH_DATE, approachDate || '')
    setValue(DETAIL_FIELD.LINK_CV, cv || '')
    setValue(DETAIL_FIELD.POSITION, position || '')
    setValue(DETAIL_FIELD.NOTE_APPROACH, Lane?.nameColumn || '')
    setValue(DETAIL_FIELD.LANE, Lane?.id || '')
    setListAssign(Users)
  }, [
    setValue,
    Candidate,
    Job,
    approachDate,
    cv,
    position,
    noteApproach,
    Lane,
    Users,
  ])
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
          {Candidate?.name}
          {' - '}
          {Job?.title}
        </Typography>
        <Divider />
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} sx={{ px: 2, pb: 2 }}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <Typography>{translate('pages.jobs.name')}</Typography>
                <RHFTextField
                  disabled={disabled}
                  name={DETAIL_FIELD.NAME}
                  placeholder='Name'
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <Typography>{translate('pages.jobs.jobName')}</Typography>
                <RHFTextField
                  disabled={disabled}
                  name={DETAIL_FIELD.JOB_NAME}
                  placeholder='Job Name'
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <Typography>{translate('pages.jobs.location')}</Typography>
                <RHFTextField
                  disabled={disabled}
                  name={DETAIL_FIELD.LOCATION}
                  placeholder='Location'
                />
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <Typography>{translate('pages.jobs.clientName')}:</Typography>
                <RHFTextField
                  disabled={disabled}
                  name={DETAIL_FIELD.CLIENT_ID}
                  placeholder='Client Name'
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack>
                <Typography>{translate('pages.jobs.email')}</Typography>
                <RHFTextField
                  disabled={disabled}
                  name={DETAIL_FIELD.EMAIl}
                  placeholder='Email'
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack>
                <Typography>{translate('pages.jobs.lane')}</Typography>
                <RHFBasicSelect
                  name={DETAIL_FIELD.LANE}
                  label=''
                  options={laneSelected}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <Typography>{translate('pages.jobs.phone')}</Typography>
                <RHFTextField
                  disabled={disabled}
                  name={DETAIL_FIELD.PHONE}
                  placeholder='Phone'
                />
              </Stack>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <Typography>{translate('pages.jobs.approachDate')}</Typography>
                <RHFDateTimePicker name={DETAIL_FIELD.APPROACH_DATE} />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <Typography>{translate('pages.jobs.linkCv')}</Typography>
                <Grid sx={{ display: 'flex' }}>
                  <RHFTextField
                    disabled={disabled}
                    name={DETAIL_FIELD.LINK_CV}
                    placeholder='Enter link or import cv'
                  />
                  {base64 ? (
                    <Link
                      download={`${Candidate?.name ? Candidate?.name : ''}.pdf`}
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
                <Typography>{translate('pages.jobs.position')}:</Typography>
                <RHFTextField
                  name={DETAIL_FIELD.POSITION}
                  placeholder='Position'
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <Typography>{translate('pages.jobs.noteApproach')}</Typography>
                <RHFTextField
                  name={DETAIL_FIELD.NOTE_APPROACH}
                  multiline
                  rows={3}
                />
              </Stack>
            </Grid>
          </Grid>
          <Grid item xs={12} mt={3} mb={1}>
            <DialogActions
              sx={{
                justifyContent: 'space-between',
                flexDirection: smDown ? 'column' : 'row',
                marginBottom: '1rem',
              }}
            >
              <Box
                sx={
                  smDown
                    ? {
                        marginRight: 'auto !important',
                      }
                    : {}
                }
              >
                <Assignee
                  onToggleAssignee={onToggleAssignee}
                  assignee={listAssign}
                  hasAddAssignee
                  listContacts={assignListUser}
                />
              </Box>
              <Stack
                direction='row'
                spacing={2}
                sx={
                  smDown
                    ? { marginLeft: 'auto !important', marginTop: '16px' }
                    : {}
                }
              >
                {cv && (
                  <LoadingButton
                    variant='contained'
                    loading={isLoadingBase}
                    onClick={() => setIsOpenCV(true)}
                  >
                    {translate('pages.jobs.rawCv')}
                  </LoadingButton>
                )}
                <LoadingButton
                  type='submit'
                  variant='contained'
                  loading={isSubmitting}
                >
                  {translate('common.save')}
                </LoadingButton>
                <Button variant='outlined' color='inherit' onClick={onClose}>
                  {translate('common.cancel')}
                </Button>
              </Stack>
            </DialogActions>
          </Grid>
        </FormProvider>
      </Stack>
      <PreviewPdf isOpen={isOpenCV} onClose={onCloseCV} base64={base64} />
    </Drawer>
  )
}
