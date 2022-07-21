import React, { useEffect, useMemo, useState } from 'react'

// mui
import {
  Box,
  Button,
  Dialog,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material'

import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

import Iconify from '@/components/Iconify'
import { IconButtonAnimate } from '@/components/animate'
import {
  FormProvider,
  RHFBasicSelect,
  RHFDatePicker,
  RHFTextField,
} from '@/components/hook-form'
import useRole from '@/hooks/useRole'
import {
  fDateCalendar,
  fDateEndOfWeek,
  fDateStartOfWeek,
} from '@/utils/formatTime'

import { useGetTaskUserListQuery } from './weeklyTaskSlice'

WeeklyTaskEditModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  task: PropTypes.object,
}

export default function WeeklyTaskEditModal({ isOpen, onClose, task = {} }) {
  const { startDate, endDate } = task
  const { currentRole } = useRole()
  const [contentTask, setContentTask] = useState([])

  const { data = {} } = useGetTaskUserListQuery({
    currentRole,
  })
  const { list: listUsers = [] } = data?.data || {}

  const listUserOptions = useMemo(() => {
    if (!listUsers || !listUsers.length) return []
    return listUsers.map(({ name }) => name)
  }, [listUsers])

  const startDateFormat = useMemo(() => {
    if (!startDate) return fDateStartOfWeek(new Date())

    return fDateCalendar(startDate)
  }, [startDate])

  const endDateFormat = useMemo(() => {
    if (!endDate) return fDateEndOfWeek(new Date())

    return fDateCalendar(endDate)
  }, [endDate])

  const methods = useForm({
    defaultValues: {
      ...task,
      startDate: startDateFormat,
      endDate: endDateFormat,
    },
  })
  const { handleSubmit } = methods

  const onSubmit = async () => {
    try {
      // console.log(data)
    } catch (error) {
      // TODO
    }
  }

  const handleAddContentTask = () => {
    setContentTask([...contentTask, {}])
  }

  const handleRemoveContentTask = (index) => {
    let newContentTask = [...contentTask]
    if (newContentTask.length > 1) {
      newContentTask.splice(index, 1)
      setContentTask(newContentTask)
    } else {
      return
    }
  }

  useEffect(() => {
    setContentTask(task?.content)
  }, [task])

  return (
    <Dialog fullWidth maxWidth='sm' open={isOpen} onClose={onClose}>
      <Stack spacing={2} sx={{ p: 2.5 }}>
        <Typography
          variant='h6'
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          Edit Task
        </Typography>
        <Divider />
        <Box>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={3} alignSelf='center'>
                <Typography>Deadline</Typography>
              </Grid>

              <Grid item xs={9}>
                <Stack direction='row' columnGap={5}>
                  <Stack spacing={0.5}>
                    <Typography>From</Typography>
                    <RHFDatePicker name='startDate' />
                  </Stack>

                  <Stack spacing={0.5}>
                    <Typography>To</Typography>
                    <RHFDatePicker name='endDate' />
                  </Stack>
                </Stack>
              </Grid>

              <Grid item xs={3} alignSelf='center'>
                <Typography>Name</Typography>
              </Grid>

              <Grid item xs={9}>
                <RHFBasicSelect
                  label={'Name'}
                  name='user.name'
                  options={listUserOptions}
                />
              </Grid>

              <Grid item xs={3}>
                <Stack direction='row' columnGap={2} alignItems='center'>
                  <Typography>Task</Typography>
                  <IconButtonAnimate onClick={handleAddContentTask}>
                    <Iconify
                      icon={'akar-icons:circle-plus'}
                      width={20}
                      height={20}
                    />
                  </IconButtonAnimate>
                </Stack>
              </Grid>

              <Grid item xs={9}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography>Task content</Typography>
                  </Grid>

                  <Grid item xs={3}>
                    <Typography>Achievement</Typography>
                  </Grid>

                  <Grid item xs={2}>
                    <Typography>Target</Typography>
                  </Grid>

                  <Grid item xs={1}>
                    <Typography />
                  </Grid>

                  {contentTask.map((_, index) => (
                    <React.Fragment key={index}>
                      <Grid item xs={6}>
                        <RHFTextField name={`content.${index}.content`} />
                      </Grid>

                      <Grid item xs={3}>
                        <RHFTextField name={`content.${index}.percent`} />
                      </Grid>

                      <Grid item xs={2}>
                        <RHFTextField name={`content.${index}.target`} />
                      </Grid>

                      <Grid item xs={1}>
                        <IconButtonAnimate
                          onClick={() => handleRemoveContentTask(index)}
                        >
                          <Iconify
                            icon={'clarity:trash-line'}
                            width={20}
                            height={20}
                          />
                        </IconButtonAnimate>
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
              </Grid>
            </Grid>

            <Box>
              <Button type='submit' variant='contained'>
                Save
              </Button>
            </Box>
          </FormProvider>
        </Box>
      </Stack>
    </Dialog>
  )
}
