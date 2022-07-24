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

import { yupResolver } from '@hookform/resolvers/yup'
import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'
import { useFieldArray, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import Iconify from '@/components/Iconify'
import Scrollbar from '@/components/Scrollbar'
import { IconButtonAnimate } from '@/components/animate'
import {
  FormProvider,
  RHFBasicSelect,
  RHFDatePicker,
  RHFTextField,
} from '@/components/hook-form'
import useLocales from '@/hooks/useLocales'
import useRole from '@/hooks/useRole'
import {
  fDate,
  fDateCalendar,
  fDateEndOfWeek,
  fDateStartOfWeek,
} from '@/utils/formatTime'

import { HANDLE_TYPE } from './config'
import {
  useCreateWeeklyTaskMutation,
  useGetTaskUserListQuery,
  useUpdateWeeklyTaskMutation,
} from './weeklyTaskSlice'

WeeklyTaskModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  task: PropTypes.object,
  handleType: PropTypes.string,
  setIsReloading: PropTypes.func,
  isReloading: PropTypes.bool,
}

const styleAsterisk = {
  color: '#F64E60',
}

export default function WeeklyTaskModal({
  isOpen,
  onClose,
  handleType,
  task = {},
  setIsReloading = {},
  isReloading = false,
}) {
  const { startDate, endDate } = task
  const { currentRole } = useRole()
  const [contentTask, setContentTask] = useState([])
  const { enqueueSnackbar } = useSnackbar()
  const { translate } = useLocales()
  const isEditScreen = HANDLE_TYPE.EDIT === handleType

  const { data = {} } = useGetTaskUserListQuery({
    currentRole,
  })
  const { list: listUsers = [] } = data?.data || {}

  const [updateWeeklyTask] = useUpdateWeeklyTaskMutation()
  const [createWeeklyTask] = useCreateWeeklyTaskMutation()

  const listUserOptions = useMemo(() => {
    if (!listUsers || !listUsers.length) return []
    return listUsers.map(({ name, id }) => ({ value: id, label: name }))
  }, [listUsers])

  const startDateFormat = useMemo(() => {
    if (!startDate) return fDateStartOfWeek(new Date())
    const newDate = startDate.split('/')
    if (Number(newDate[0]) <= 12) return fDate(startDate)
    return fDateCalendar(startDate)
  }, [startDate])

  const endDateFormat = useMemo(() => {
    if (!endDate) return fDateEndOfWeek(new Date())
    const newDate = endDate.split('/')
    if (Number(newDate[0]) <= 12) return fDate(endDate)
    return fDateCalendar(endDate)
  }, [endDate])

  const WeeklyTaskFormSchema = Yup.object().shape({
    userId: Yup.string().required('Name is required'),
    content: Yup.array().of(
      Yup.object().shape({
        content: Yup.string().required('').typeError(''),
        percent: Yup.number().positive().required('').typeError(''),
        target: Yup.number().positive().required('').typeError(''),
      })
    ),
  })

  const methods = useForm({
    resolver: yupResolver(WeeklyTaskFormSchema),
    defaultValues: {
      ...task,
      startDate: startDateFormat,
      endDate: endDateFormat,
    },
  })
  const { handleSubmit, reset, control, watch } = methods
  const { remove } = useFieldArray({
    control,
    name: 'content',
  })

  const calcTotal = (arr, type) => {
    if (type === 'percent') {
      const reducer = (accumulator, currentValue) =>
        accumulator + Number(currentValue.percent)
      return arr.reduce(reducer, 0)
    } else {
      const reducer = (accumulator, currentValue) =>
        accumulator + Number(currentValue.target)
      return arr.reduce(reducer, 0)
    }
  }

  // console.log(calcTotal(getValues('content'), 'target'))
  // console.log(getValues('content'))

  const onSubmit = async (data) => {
    try {
      if (task?.id) {
        delete data.id
        delete data.user
        const payload = {
          id: String(task?.id),
          body: data,
        }
        setContentTask(data?.content)
        await updateWeeklyTask(payload)
        enqueueSnackbar(translate('Update task success!'))
        onClose()
        setIsReloading(!isReloading)
      } else {
        const payload = {
          body: data,
        }
        setContentTask(data?.content)
        await createWeeklyTask(payload)
        enqueueSnackbar(translate('Create task success!'))
        onClose()
        setIsReloading(!isReloading)
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }

  const handleAddContentTask = () => {
    setContentTask([...contentTask, { content: '', percent: '', target: '' }])
  }

  const handleRemoveContentTask = (index) => {
    let newContentTask = [...contentTask]
    if (newContentTask.length > 1) {
      newContentTask.splice(index, 1)
      setContentTask([...newContentTask])
      remove(index)
      reset({
        ...task,
        content: [...newContentTask],
      })
    } else {
      return
    }
  }

  useEffect(() => {
    isEditScreen ? setContentTask(task?.content) : setContentTask([{}])
  }, [task, isEditScreen])

  return (
    <Dialog fullWidth maxWidth='sm' open={isOpen} onClose={onClose}>
      <Stack spacing={2} sx={{ p: 2.5 }}>
        <Typography
          variant='h6'
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          {translate(`${isEditScreen ? 'Edit Task' : 'Create New Task'}`)}
        </Typography>
        <Divider />
        <Box>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={{ sm: 3, xs: 1.5 }}>
              <Grid item sm={3} xs={12} alignSelf='center'>
                <Typography>
                  Deadline<span style={styleAsterisk}>*</span>
                </Typography>
              </Grid>

              <Grid item sm={9} xs={12}>
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

              <Grid item sm={3} xs={12} alignSelf='center'>
                <Typography>
                  Name<span style={styleAsterisk}>*</span>
                </Typography>
              </Grid>

              <Grid item sm={9} xs={12}>
                <RHFBasicSelect
                  label={'Name'}
                  name='userId'
                  options={listUserOptions}
                />
              </Grid>

              <Grid item sm={3} xs={12}>
                <Stack direction='row' columnGap={2} alignItems='center'>
                  <Typography>
                    Task<span style={styleAsterisk}>*</span>
                  </Typography>
                  <IconButtonAnimate onClick={handleAddContentTask}>
                    <Iconify
                      icon={'akar-icons:circle-plus'}
                      width={20}
                      height={20}
                    />
                  </IconButtonAnimate>
                </Stack>
              </Grid>

              <Grid item sm={9} xs={12}>
                <Scrollbar sx={{ maxHeight: { sm: '200px', xs: '100px' } }}>
                  <Grid container spacing={2}>
                    <Grid item xs={5}>
                      <Typography>Task content</Typography>
                    </Grid>

                    <Grid item xs={3}>
                      <Typography>Achievement</Typography>
                    </Grid>

                    <Grid item xs={2}>
                      <Typography>Target</Typography>
                    </Grid>

                    <Grid item xs={2}>
                      <Typography />
                    </Grid>

                    {contentTask.map((_, index) => (
                      <React.Fragment key={index}>
                        <Grid item xs={5}>
                          <RHFTextField name={`content.${index}.content`} />
                        </Grid>

                        <Grid item xs={3}>
                          <RHFTextField
                            name={`content.${index}.percent`}
                            type='number'
                          />
                        </Grid>

                        <Grid item xs={2}>
                          <RHFTextField
                            name={`content.${index}.target`}
                            type='number'
                          />
                        </Grid>

                        <Grid item xs={2}>
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
                </Scrollbar>
              </Grid>
            </Grid>

            {watch('content') && (
              <Box sx={{ mt: 1.5 }}>
                <Typography>{`Total target: ${
                  calcTotal(watch('content'), 'target') || 0
                }% `}</Typography>
                <Typography>{`Total achievement: ${
                  calcTotal(watch('content'), 'percent') || 0
                }% `}</Typography>
              </Box>
            )}

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button type='submit' variant='contained' sx={{ mr: 1 }}>
                {translate(`${isEditScreen ? 'Update' : 'Save'}`)}
              </Button>
              <Button
                onClick={onClose}
                sx={{
                  bgcolor: 'background.neutral',
                }}
              >
                {translate('Cancel')}
              </Button>
            </Box>
          </FormProvider>
        </Box>
      </Stack>
    </Dialog>
  )
}
