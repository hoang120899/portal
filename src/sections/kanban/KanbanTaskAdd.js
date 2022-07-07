import { useMemo, useState } from 'react'
// @mui
import { useEffect } from 'react'

import {
  Avatar,
  Box,
  Button,
  Drawer,
  Grid,
  Stack,
  TextField,
  Tooltip,
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
  useSearchEmailQuery,
  useSearchPhoneQuery,
} from '@/sections/kanban/kanbanSlice'

import KanbanContactsDialog from './KanbanContactsDialog'

// import { _postApi } from '@/utils/axios'

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

const ButtonRootStyle = styled('div')(() => ({
  '& .MuiButton-root': {
    padding: '11px 0',
    borderRadius: '50%',
    minWidth: '44px',
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
    email: Yup.string()
      .email('Email must be a valid email address')
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
  const watchLinkCv = watch('linkCv')

  const [openContactDialog, setOpenContactDialog] = useState(false)
  const [keyPhoneSearch, setKeyPhoneSearch] = useState('')
  const [keyEmailSearch, setKeyEmailSearch] = useState('')
  const phoneSearch = useDebounce(keyPhoneSearch, 500)
  const emailSearch = useDebounce(keyEmailSearch, 500)

  const { data: jobData } = useGetActiveJobsQuery()
  const { data: phoneData } = useSearchPhoneQuery({
    phone: phoneSearch,
  })
  const { data: emailData } = useSearchEmailQuery({
    email: emailSearch,
  })

  const phoneOptions = useMemo(() => {
    if (phoneData && phoneData.data.candidate.length > 0) {
      const candidates = phoneData.data.candidate
      return candidates.map((candidate) => ({
        label: candidate.phone,
        value: candidate.id,
        name: candidate.name,
        email: candidate.email,
      }))
    }
  }, [phoneData])

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

  const handleOpenContactDialog = () => {
    setOpenContactDialog(true)
  }

  const handleCloseContactDialog = () => {
    setOpenContactDialog(false)
  }

  const handleCloseAddTaskReset = () => {
    onClose()
    reset()
  }

  const handleCloseUpdateTaskReset = () => {
    onCloseUpdate()
    reset()
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
      <Box sx={{ padding: '20px' }}>
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
            <Box sx={{ marginTop: '16px' }}>
              <RHFTextField
                label='Name'
                name='name'
                type='text'
                disabled={!hasAddPermission}
              />
            </Box>

            {isAddTaskNoColumn && (
              <Box sx={{ marginTop: '16px' }}>
                <RHFBasicSelect
                  label='Column Name'
                  name='laneId'
                  options={columnOptions}
                  disabled={!hasAddPermission}
                />
              </Box>
            )}

            <Box sx={{ marginTop: '16px' }}>
              <RHFBasicSelect
                label='Name Job'
                name='idJob'
                options={jobOptions}
                disabled={!hasAddPermission}
              />
            </Box>

            <Box sx={{ marginTop: '16px' }}>
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

            <Box sx={{ marginTop: '16px' }}>
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

            <Box sx={{ marginTop: '16px' }}>
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
                <Box sx={{ marginTop: '16px' }}>
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
                <Box sx={{ marginTop: '16px' }}>
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
                <Box sx={{ marginTop: '16px' }}>
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

            <Box sx={{ marginTop: '16px' }}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <RHFAutocomplete
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
              <Box sx={{ marginTop: '16px' }}>
                <RHFDateTimePicker
                  label='Expected Date'
                  name='expectedDate'
                  disabled={!hasAddPermission}
                />
              </Box>
            )}

            <Box sx={{ marginTop: '16px' }}>
              <RHFTextField
                label='Position'
                name='position'
                disabled={!hasAddPermission}
              />
            </Box>

            <Box
              sx={{ marginTop: '16px', display: 'flex', alignItems: 'center' }}
            >
              <RHFTextField
                type='text'
                label='Link CV'
                name='linkCv'
                value={watchLinkCv}
                disabled
              />
              <input id='file-upload' type='file' hidden />
              <label>
                <Button component='div'>
                  <TextField
                    type='file'
                    sx={{ display: 'none' }}
                    onChange={(e) => {
                      setValue('linkCv', e.target.value)
                    }}
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

            <Box sx={{ marginTop: '16px' }}>
              <RHFTextField
                label='Approach Point'
                name='noteApproach'
                multiline
                rows={3}
              />
            </Box>

            <Box
              sx={{
                marginTop: '16px',
                display: 'flex',
                justifyContent: cardId ? 'space-between' : 'right',
              }}
            >
              {cardId && (
                <Stack direction='row'>
                  {assignee.map((user) => (
                    <Avatar
                      key={user.id}
                      alt={user.name}
                      src={user.avatar}
                      sx={{ m: 0.5, width: 36, height: 36 }}
                    />
                  ))}
                  <Tooltip title='Add assignee'>
                    <ButtonRootStyle>
                      <Button
                        onClick={handleOpenContactDialog}
                        variant='outlined'
                        sx={{
                          ml: 0.5,
                        }}
                        disabled={!hasAddPermission}
                      >
                        <Iconify
                          icon={'eva:plus-fill'}
                          width={20}
                          height={20}
                        />
                      </Button>
                    </ButtonRootStyle>
                  </Tooltip>
                  <KanbanContactsDialog
                    open={openContactDialog}
                    onClose={handleCloseContactDialog}
                  />
                </Stack>
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
          {/* TODO: UI Comment */}
        </Box>
      </Box>
    </Drawer>
  )
}
