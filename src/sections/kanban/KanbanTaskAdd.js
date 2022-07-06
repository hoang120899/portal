// import { useState } from 'react'
// @mui
import { useEffect } from 'react'

import { Box, Button, Drawer, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

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

// hooks
// import useToggle from '@/hooks/useToggle'
// utils
// import uuidv4 from '@/utils/uuidv4'

KanbanTaskAdd.propTypes = {
  open: PropTypes.bool,
  isAddTaskNoColumn: PropTypes.bool,
  jobs: PropTypes.array,
  columnsOrder: PropTypes.array,
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
  jobs,
  columnsOrder,
  onCloseAddTask,
}) {
  const defaultValues = {
    name: '',
    laneId: '',
    idJob: '',
    location: '',
    clientName: '',
    email: '',
    social: [],
    facebook: '',
    linkedin: '',
    skype: '',
    phone: '',
    position: '',
    linkCv: '',
    noteApproach: '',
  }
  const methods = useForm({
    defaultValues,
  })
  const { handleSubmit, watch, setValue } = methods

  const watchSocial = watch('social')
  const watchIdJob = watch('idJob')

  useEffect(() => {
    if (watchIdJob) {
      const job = jobs.find((job) => job.value === watchIdJob)
      setValue('location', job?.location)
      setValue('clientName', job?.clientName)
    }
  }, [watchIdJob, jobs, setValue])

  const hanldeAddTask = () => {}

  return (
    <Drawer
      open={open}
      onClose={onCloseAddTask}
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
              <RHFTextField label='Name' name='name' type='text' required />
            </Box>

            {isAddTaskNoColumn && (
              <Box sx={{ marginTop: '16px' }}>
                <RHFBasicSelect
                  label='Column name'
                  name='laneId'
                  options={columnsOrder}
                />
              </Box>
            )}

            <Box sx={{ marginTop: '16px' }}>
              <RHFBasicSelect
                label='Name job'
                name='idJob'
                options={jobs}
                required
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
              <RHFTextField label='Email' name='email' type='text' required />
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
                  <RHFTextField
                    label='Phone'
                    name='phone'
                    type='text'
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <RHFDatePicker
                    label='Approach Date'
                    name='approachDate'
                    required
                  />
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
                required
              />
            </Box>
            <Box sx={{ marginTop: '16px', textAlign: 'right' }}>
              <Button type='submit' variant='contained'>
                Save
              </Button>
              <Button
                type='button'
                sx={{ marginLeft: '8px' }}
                onClick={onCloseAddTask}
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
