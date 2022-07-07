import { useMemo } from 'react'
// @mui
import { useEffect } from 'react'

import { Box, Button, Drawer, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { yupResolver } from '@hookform/resolvers/yup'
// @date-fns
import { format } from 'date-fns'
// @prop-types
import PropTypes from 'prop-types'
// @react-hooks-form
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

// components
import Iconify from '@/components/Iconify'
import {
  FormProvider,
  RHFBasicSelect,
  RHFDatePicker,
  RHFMultiCheckbox,
  RHFTextField,
  RHFUploadSingleFile,
} from '@/components/hook-form'
// import { API_ADD_CARD } from '@/routes/api'
import { useGetActiveJobsQuery } from '@/sections/kanban/kanbanSlice'

// import { _postApi } from '@/utils/axios'

KanbanTaskAdd.propTypes = {
  open: PropTypes.bool,
  isAddTaskNoColumn: PropTypes.bool,
  laneId: PropTypes.string,
  columns: PropTypes.object,
  onCloseAddTask: PropTypes.func,
}

const CheckboxRootStyle = styled('div')(() => ({
  '& .MuiFormGroup-root': {
    flexDirection: 'row',
  },
}))

export default function KanbanTaskAdd({
  open,
  isAddTaskNoColumn,
  laneId,
  columns,
  onCloseAddTask,
}) {
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
    noteApproach: '',
  }
  const methods = useForm({
    resolver: yupResolver(AddTaskSchema),
    defaultValues,
  })
  const { handleSubmit, reset, watch, setValue } = methods
  const { data: jobData } = useGetActiveJobsQuery()

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

  const watchSocial = watch('social')
  const watchIdJob = watch('idJob')

  useEffect(() => {
    if (watchIdJob) {
      const job = jobOptions.find((job) => job.value === watchIdJob)
      setValue('location', job?.location)
      setValue('clientName', job?.clientName)
      setValue('nameJob', job?.label)
    }
  }, [watchIdJob, jobOptions, setValue])

  const handleCloseAddTaskReset = () => {
    onCloseAddTask()
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
      onClose={handleCloseAddTaskReset}
      anchor='right'
      PaperProps={{ sx: { width: { xs: 1, sm: 640 } } }}
    >
      <Box sx={{ padding: '20px' }}>
        <Box component='header'>
          <Typography variant='h5'>Add Card</Typography>
        </Box>
        <Box>
          <FormProvider
            onSubmit={handleSubmit(hanldeAddTask)}
            methods={methods}
          >
            <Box sx={{ marginTop: '16px' }}>
              <RHFTextField label='Name' name='name' type='text' />
            </Box>

            {isAddTaskNoColumn && (
              <Box sx={{ marginTop: '16px' }}>
                <RHFBasicSelect
                  label='Column name'
                  name='laneId'
                  options={columnOptions}
                />
              </Box>
            )}

            <Box sx={{ marginTop: '16px' }}>
              <RHFBasicSelect
                label='Name job'
                name='idJob'
                options={jobOptions}
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
              <RHFTextField label='Email' name='email' type='text' />
            </Box>

            <Box sx={{ marginTop: '16px' }}>
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
                  />
                </Box>
              )}
            </Box>

            <Box sx={{ marginTop: '16px' }}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <RHFTextField label='Phone' name='phone' type='text' />
                </Grid>
                <Grid item xs={6}>
                  <RHFDatePicker label='Approach Date' name='approachDate' />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ marginTop: '16px' }}>
              <RHFTextField label='Position' name='position' />
            </Box>

            <Box sx={{ marginTop: '16px' }}>
              <RHFUploadSingleFile name='uploadCV' />
            </Box>

            <Box sx={{ marginTop: '16px' }}>
              <RHFTextField
                label='Approach Point'
                name='noteApproach'
                multiline
                rows={3}
              />
            </Box>
            <Box sx={{ marginTop: '16px', textAlign: 'right' }}>
              <Button type='submit' variant='contained'>
                Save
              </Button>
              <Button
                type='button'
                sx={{ marginLeft: '8px' }}
                onClick={handleCloseAddTaskReset}
              >
                Cancel
              </Button>
            </Box>
          </FormProvider>
        </Box>
      </Box>
    </Drawer>
  )
}
