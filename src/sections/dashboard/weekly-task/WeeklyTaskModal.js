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
import { useTheme } from '@mui/material/styles'

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
  RHFAutocomplete,
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
  const theme = useTheme()
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
    return fDateCalendar(startDate)
  }, [startDate])

  const endDateFormat = useMemo(() => {
    if (!endDate) return fDateEndOfWeek(new Date())
    return fDateCalendar(endDate)
  }, [endDate])

  const WeeklyTaskFormSchema = Yup.object().shape({
    userId: Yup.string().required('Name is required').typeError(''),
    content: Yup.array().of(
      Yup.object().shape({
        content: Yup.string().required('').typeError(''),
        percent: Yup.number().positive().required('').typeError(''),
        target: Yup.number().positive().required('').typeError(''),
      })
    ),
  })

  const defaultValuesEdit = {
    ...task,
    startDate: startDateFormat,
    endDate: endDateFormat,
  }

  const defaultValuesAdd = {
    ...task,
    content: [{ content: '', percent: '', target: '' }],
    userId: '',
    startDate: startDateFormat,
    endDate: endDateFormat,
  }

  const methods = useForm({
    resolver: yupResolver(WeeklyTaskFormSchema),
    defaultValues: isEditScreen ? defaultValuesEdit : defaultValuesAdd,
  })
  const { handleSubmit, reset, control, watch, setValue } = methods
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

  const onSubmit = async (data) => {
    try {
      if (isEditScreen) {
        data.startDate = fDateCalendar(fDate(data.startDate))
        data.endDate = fDateCalendar(fDate(data.endDate))
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
        data.startDate = fDateCalendar(fDate(data.startDate))
        data.endDate = fDateCalendar(fDate(data.endDate))
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
        startDate: fDateCalendar(startDate),
        endDate: fDateCalendar(endDate),
        content: [...newContentTask],
      })
    } else {
      return
    }
  }

  useEffect(() => {
    isEditScreen
      ? setContentTask(task?.content)
      : setContentTask([{ content: '', percent: '', target: '' }])
  }, [task, isEditScreen])

  return (
    <Dialog fullWidth maxWidth='sm' open={isOpen} onClose={onClose}>
      <Stack spacing={2} sx={{ p: 2.5 }}>
        <Typography
          variant='h6'
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          {translate(
            `${
              isEditScreen
                ? `${translate('pages.dashboard.weeklyTask.editTask')}`
                : `${translate('pages.dashboard.weeklyTask.createNewTask')}`
            }`
          )}
        </Typography>
        <Divider />
        <Box>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Scrollbar sx={{ maxHeight: '380px' }}>
              <Grid container spacing={{ sm: 3, xs: 1.5 }}>
                <Grid item sm={3} xs={12} alignSelf='center'>
                  <Typography>
                    {translate('pages.dashboard.weeklyTask.deadline')}
                    <span style={styleAsterisk}>*</span>
                  </Typography>
                </Grid>

                <Grid item sm={9} xs={12}>
                  <Stack direction='row' columnGap={5}>
                    <Stack spacing={0.5}>
                      <Typography>
                        {translate('pages.dashboard.weeklyTask.from')}
                      </Typography>
                      <RHFDatePicker name='startDate' />
                    </Stack>

                    <Stack spacing={0.5}>
                      <Typography>
                        {translate('pages.dashboard.weeklyTask.to')}
                      </Typography>
                      <RHFDatePicker name='endDate' />
                    </Stack>
                  </Stack>
                </Grid>

                <Grid item sm={3} xs={12} alignSelf='center'>
                  <Typography>
                    {translate('pages.dashboard.weeklyTask.name')}
                    <span style={styleAsterisk}>*</span>
                  </Typography>
                </Grid>

                <Grid item sm={9} xs={12}>
                  <RHFAutocomplete
                    AutocompleteProps={{
                      size: 'small',
                      defaultValue: task?.user?.name,
                      renderOption: (props, option) => (
                        <Box component='li' {...props} key={option.value}>
                          {option.label}
                        </Box>
                      ),
                      onChange: (field) => (event, newValue) => {
                        field.onChange(newValue)
                        if (newValue) {
                          setValue('userId', newValue.value)
                        }
                      },
                    }}
                    label={translate('pages.dashboard.weeklyTask.name')}
                    name='userId'
                    options={listUserOptions}
                  />
                </Grid>

                <Grid item sm={3} xs={12}>
                  <Stack direction='row' columnGap={2} alignItems='center'>
                    <Typography>
                      {translate('Task')}
                      <span style={styleAsterisk}>*</span>
                    </Typography>
                    <IconButtonAnimate onClick={handleAddContentTask}>
                      <Iconify
                        icon='akar-icons:circle-plus'
                        width={20}
                        height={20}
                      />
                    </IconButtonAnimate>
                  </Stack>
                </Grid>

                <Grid item sm={9} xs={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={4.5}>
                      <Typography>
                        {translate('pages.dashboard.weeklyTask.taskContent')}
                      </Typography>
                    </Grid>

                    <Grid item xs={3}>
                      <Typography>
                        {translate('pages.dashboard.weeklyTask.achievement')}
                      </Typography>
                    </Grid>

                    <Grid item xs={2.5}>
                      <Typography>
                        {translate('pages.dashboard.weeklyTask.target')}
                      </Typography>
                    </Grid>

                    <Grid item xs={2}>
                      <Typography />
                    </Grid>

                    {contentTask.map((_, index) => (
                      <React.Fragment key={index}>
                        <Grid item xs={4.5}>
                          <RHFTextField name={`content.${index}.content`} />
                        </Grid>

                        <Grid item xs={3}>
                          <RHFTextField
                            name={`content.${index}.percent`}
                            type='number'
                          />
                        </Grid>

                        <Grid item xs={2.5}>
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
                </Grid>
              </Grid>
            </Scrollbar>

            {watch('content') && (
              <Box sx={{ mt: 1.5 }}>
                <Typography>{`${translate(
                  'pages.dashboard.weeklyTask.totalTarget'
                )}: ${
                  calcTotal(watch('content'), 'target') || 0
                }% `}</Typography>
                <Typography>{`${translate(
                  'pages.dashboard.weeklyTask.totalAchievement'
                )}: ${
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
                variant='outlined'
                sx={{
                  color: 'inherit',
                  borderColor: `${theme.palette.grey[400]}`,
                  '&:hover': {
                    borderColor: `${theme.palette.grey[400]}`,
                    bgcolor: 'background.neutral',
                  },
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
