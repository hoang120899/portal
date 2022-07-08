import { useMemo, useState } from 'react'
// @mui
import { useEffect } from 'react'

import {
  Box,
  Button,
  Drawer,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import { yupResolver } from '@hookform/resolvers/yup'
// @date-fns
import { format } from 'date-fns'
// @prop-types
import PropTypes from 'prop-types'
// @react-hooks-form
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { board } from '@/_mock'
import Assignee from '@/components/Assignee'
// components
import Iconify from '@/components/Iconify'
import {
  FormProvider,
  RHFAutocomplete,
  RHFBasicSelect,
  RHFDatePicker,
  RHFDateTimePicker,
  RHFMultiCheckbox,
  RHFTextField,
} from '@/components/hook-form'
import { useDebounce } from '@/hooks/useDebounce'
// import { API_ADD_CARD } from '@/routes/api'
import {
  useGetActiveJobsQuery,
  useSearchEmailQuery, // useSearchPhoneQuery,
} from '@/sections/kanban/kanbanSlice'

import KanbanFileUpload from './KanbanFileUpload'
import KanbanTaskCommentInput from './KanbanTaskCommentInput'
import KanbanTaskCommentList from './KanbanTaskCommentList'
import KanbanUpdateHistory from './KanbanUpdateHistory'

KanbanTaskAdd.propTypes = {
  open: PropTypes.bool,
  isAddTaskNoColumn: PropTypes.bool,
  hasAddPermission: PropTypes.bool,
  cardId: PropTypes.string,
  laneId: PropTypes.string,
  columns: PropTypes.object,
  onClose: PropTypes.func,
  onCloseUpdate: PropTypes.func,
}

const CheckboxRootStyle = styled('div')(() => ({
  '& .MuiFormGroup-root': {
    flexDirection: 'row',
  },
}))

export default function KanbanTaskAdd({
  open,
  isAddTaskNoColumn,
  hasAddPermission,
  cardId,
  laneId,
  columns,
  onClose,
  onCloseUpdate,
}) {
  const { assignee } = board.cards['9d98ce30-3c51-4de3-8537-7a4b663ee3af'] // mock user

  const AddTaskSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    laneId:
      isAddTaskNoColumn && Yup.string().required('Column name is required'),
    idJob: Yup.string().required('Name job is required'),
    email: Yup.object()
      .shape({
        value: Yup.string(),
      })
      .nullable()
      .required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    noteApproach: Yup.string().required('Approach point is required'),
  })

  const defaultValues = {
    name: '',
    laneId: '',
    idJob: '',
    nameJob: '',
    location: '',
    clientName: '',
    email: '',
    social: [],
    facebook: '',
    linkedin: '',
    skype: '',
    phone: '',
    approachDate: format(new Date(), 'yyyy-MM-dd'),
    position: '',
    linkCv: '',
    refineCv: '',
    noteApproach: '',
  }
  const methods = useForm({
    resolver: yupResolver(AddTaskSchema),
    defaultValues,
  })
  const { handleSubmit, reset, watch, setValue } = methods

  const watchSocial = watch('social')
  const watchIdJob = watch('idJob')
  const watchEmail = watch('email')

  const [openHistory, setOpenHistory] = useState(false)
  // const [keyPhoneSearch, setKeyPhoneSearch] = useState('')
  const [keyEmailSearch, setKeyEmailSearch] = useState('')
  // const phoneSearch = useDebounce(keyPhoneSearch, 500)
  const emailSearch = useDebounce(keyEmailSearch, 500)

  const { data: jobData } = useGetActiveJobsQuery()
  // const { data: phoneData } = useSearchPhoneQuery({
  //   phone: phoneSearch,
  // })
  const { data: emailData } = useSearchEmailQuery({
    email: emailSearch,
  })

  // const phoneOptions = useMemo(() => {
  //   if (phoneData && phoneData.data.candidate.length > 0) {
  //     const candidates = phoneData.data.candidate
  //     return candidates.map((candidate) => ({
  //       label: candidate.phone,
  //       value: candidate.id,
  //       name: candidate.name,
  //       email: candidate.email,
  //     }))
  //   }
  // }, [phoneData])

  const emailOptions = useMemo(() => {
    if (emailData && emailData.data.candidate.length > 0) {
      const candidates = emailData.data.candidate
      return candidates.map((candidate) => ({
        label: candidate.email,
        value: candidate.id,
        name: candidate.name,
        phone: candidate.phone,
      }))
    }
  }, [emailData])

  const columnOptions = useMemo(() => {
    if (columns) {
      return columns.data.list.map((column) => ({
        label: column.nameColumn,
        value: column.id,
      }))
    }
  }, [columns])

  const jobOptions = useMemo(() => {
    if (jobData) {
      const activeJobs = jobData.data.arrJob
      const formatActiveJobs = activeJobs.map((job) => ({
        label: job.title,
        value: job.id,
        location: job.Location ? job.Location.name : '',
        clientName: job.Client ? job.Client.name : '',
      }))
      return formatActiveJobs
    }
  }, [jobData])

  useEffect(() => {
    if (!watchEmail) return
    setValue('name', watchEmail.name)
    setValue('phone', watchEmail.phone)
  }, [watchEmail, setValue])

  useEffect(() => {
    if (cardId) {
      setValue('social', ['facebook', 'linkedin', 'skype'])
    }
  }, [cardId, setValue])

  useEffect(() => {
    if (watchIdJob) {
      const job = jobOptions.find((job) => job.value === watchIdJob)
      setValue('location', job?.location)
      setValue('clientName', job?.clientName)
      setValue('nameJob', job?.label)
    }
  }, [watchIdJob, jobOptions, setValue])

  const handleCloseAddTaskReset = () => {
    onClose()
    setOpenHistory(false)
    reset()
  }

  const handleCloseUpdateTaskReset = () => {
    onCloseUpdate()
    setOpenHistory(false)
    reset()
  }

  const handleOpenHistory = () => {
    setOpenHistory((prev) => !prev)
  }

  const hanldeAddTask = async (data) => {
    const reqData = { ...data }
    reqData.approachDate = format(new Date(reqData.approachDate), 'yyyy-MM-dd')
    if (!reqData.laneId) {
      reqData.laneId = laneId
    }
    delete reqData.social

    try {
      // send api create card
      // await _postApi(API_ADD_CARD, reqData)
    } catch (error) {
      // Todo: handle error
    }
    reset()
  }

  return (
    <Drawer
      open={open}
      onClose={() => {
        cardId ? handleCloseUpdateTaskReset() : handleCloseAddTaskReset()
      }}
      anchor='right'
      PaperProps={{ sx: { width: { xs: 1, sm: 640 } } }}
    >
      <Box p={3}>
        <Box component='header'>
          <Typography variant='h5'>
            {cardId ? 'Update Card' : 'Add Card'}
          </Typography>
        </Box>
        <Box>
          <FormProvider
            onSubmit={handleSubmit(hanldeAddTask)}
            methods={methods}
          >
            <Box mt={2}>
              <RHFTextField
                label='Name'
                name='name'
                type='text'
                disabled={!hasAddPermission}
              />
            </Box>

            {isAddTaskNoColumn && (
              <Box mt={2}>
                <RHFBasicSelect
                  label='Column Name'
                  name='laneId'
                  options={columnOptions}
                  disabled={!hasAddPermission}
                />
              </Box>
            )}

            <Box mt={2}>
              <RHFBasicSelect
                label='Name Job'
                name='idJob'
                options={jobOptions}
                disabled={!hasAddPermission}
              />
            </Box>

            <Box mt={2}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <RHFTextField
                    label='Location'
                    name='location'
                    type='text'
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <RHFTextField
                    label='Client Name'
                    name='clientName'
                    type='text'
                    disabled
                  />
                </Grid>
              </Grid>
            </Box>

            <Box mt={2}>
              <RHFAutocomplete
                AutocompleteProps={{
                  size: 'small',
                  renderOption: (props, option) => (
                    <Box key={option.key} component='li' {...props}>
                      {option.label}
                    </Box>
                  ),
                }}
                label='Email'
                name='email'
                options={emailOptions}
                onChange={(e) => setKeyEmailSearch(e.target.value)}
                disabled={!hasAddPermission}
              />
            </Box>

            <Box mt={2}>
              {!cardId && (
                <CheckboxRootStyle>
                  <RHFMultiCheckbox
                    name='social'
                    options={[
                      { label: 'Facebook', value: 'facebook' },
                      { label: 'Linkedin', value: 'linkedin' },
                      { label: 'Skype', value: 'skype' },
                    ]}
                  />
                </CheckboxRootStyle>
              )}
              {watchSocial.includes('facebook') && (
                <Box mt={2}>
                  <RHFTextField
                    label='Facebook'
                    name='facebook'
                    InputProps={{
                      startAdornment: (
                        <Iconify
                          icon='ant-design:facebook-filled'
                          sx={{ width: 24, height: 24 }}
                        />
                      ),
                    }}
                    disabled={!hasAddPermission}
                  />
                </Box>
              )}

              {watchSocial.includes('linkedin') && (
                <Box mt={2}>
                  <RHFTextField
                    label='Linkedin'
                    name='linkedin'
                    InputProps={{
                      startAdornment: (
                        <Iconify
                          icon='ant-design:linkedin-filled'
                          sx={{ width: 24, height: 24 }}
                        />
                      ),
                    }}
                    disabled={!hasAddPermission}
                  />
                </Box>
              )}

              {watchSocial.includes('skype') && (
                <Box mt={2}>
                  <RHFTextField
                    label='Skype'
                    name='skype'
                    InputProps={{
                      startAdornment: (
                        <Iconify
                          icon='ant-design:skype-filled'
                          sx={{ width: 24, height: 24 }}
                        />
                      ),
                    }}
                    disabled={!hasAddPermission}
                  />
                </Box>
              )}
            </Box>

            <Box mt={2}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  {/* <RHFAutocomplete
                    AutocompleteProps={{
                      size: 'small',
                      renderOption: (props, option) => (
                        <Box key={option.key} component='li' {...props}>
                          {option.label}
                        </Box>
                      ),
                    }}
                    label='Phone'
                    name='phone'
                    options={phoneOptions}
                    onChange={(e) => setKeyPhoneSearch(e.target.value)}
                    disabled={!hasAddPermission}
                  /> */}
                  <RHFTextField
                    label='Phone'
                    name='phone'
                    fullWidth
                    disabled={!hasAddPermission}
                  />
                </Grid>
                <Grid item xs={6}>
                  <RHFDatePicker
                    label='Approach Date'
                    name='approachDate'
                    disabled={!hasAddPermission}
                  />
                </Grid>
              </Grid>
            </Box>

            {cardId && (
              <Box mt={2}>
                <RHFDateTimePicker
                  label='Expected Date'
                  name='expectedDate'
                  disabled={!hasAddPermission}
                />
              </Box>
            )}

            <Box mt={2}>
              <RHFTextField
                label='Position'
                name='position'
                disabled={!hasAddPermission}
              />
            </Box>

            <Box
              sx={{ marginTop: '16px', display: 'flex', alignItems: 'center' }}
            >
              <KanbanFileUpload
                label='Link CV'
                nameTextField='linkCv'
                name={watch('name')}
                nameJob={watch('nameJob')}
                idJob={watchIdJob}
                hasAddPermission={hasAddPermission}
                setValue={setValue}
              />
            </Box>
            {cardId && (
              <Box
                sx={{
                  marginTop: '16px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <RHFTextField
                  type='text'
                  label='Link Refine CV'
                  name='refineCv'
                  disabled
                />
                <input id='file-upload' type='file' hidden />
                <label>
                  <Button component='div'>
                    <TextField
                      type='file'
                      sx={{ display: 'none' }}
                      onChange={() => {}}
                      disabled={!hasAddPermission}
                    />
                    <Iconify
                      icon={'ant-design:upload-outlined'}
                      width={32}
                      height={32}
                    />
                  </Button>
                </label>
              </Box>
            )}

            <Box mt={2}>
              <RHFTextField
                label='Approach Point'
                name='noteApproach'
                multiline
                rows={3}
              />
            </Box>

            <Box
              mt={2}
              sx={{
                display: 'flex',
                justifyContent: cardId ? 'space-between' : 'right',
              }}
            >
              {cardId && (
                <Assignee
                  assignee={assignee}
                  hasAddAssignee={hasAddPermission}
                />
              )}
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {cardId && (
                  <Button type='button' variant='contained'>
                    Create Interview
                  </Button>
                )}
                {hasAddPermission && (
                  <Button
                    type='submit'
                    variant='contained'
                    sx={{ marginLeft: '8px' }}
                  >
                    {cardId ? 'Update' : 'Save'}
                  </Button>
                )}
                <Button
                  type='button'
                  sx={{ marginLeft: '8px' }}
                  onClick={() => {
                    cardId
                      ? handleCloseUpdateTaskReset()
                      : handleCloseAddTaskReset()
                  }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </FormProvider>
          {/* TODO: UI History */}
          {cardId && (
            <Box sx={{ marginTop: '24px' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Stack direction='row'>
                  <Iconify
                    icon='dashicons:calendar-alt'
                    width={20}
                    height={20}
                  />
                  <Typography variant='span' sx={{ ml: 1 }}>
                    History
                  </Typography>
                </Stack>
                <Button
                  type='button'
                  variant='outlined'
                  onClick={handleOpenHistory}
                >
                  {openHistory ? 'Hide' : 'Show'}
                </Button>
              </Box>
            </Box>
          )}
          {openHistory && (
            <Box mt={2}>
              <KanbanUpdateHistory title='News Update' cardId={cardId} />
            </Box>
          )}
          {/* TODO: UI Comment */}
          {cardId && (
            <Box mt={3}>
              <Stack direction='row' mb={2}>
                <Iconify
                  icon='ant-design:comment-outlined'
                  width={20}
                  height={20}
                />
                <Typography variant='span' sx={{ ml: 1 }}>
                  Comment
                </Typography>
              </Stack>

              <KanbanTaskCommentInput />
              <Box mt={2}>
                <KanbanTaskCommentList title='List Comment' cardId={cardId} />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Drawer>
  )
}
