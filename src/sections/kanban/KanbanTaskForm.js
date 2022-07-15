import React, { useEffect, useMemo, useState } from 'react'

// @mui
import { Box, Button, Grid, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'

import { yupResolver } from '@hookform/resolvers/yup'
// @date-fns
import { format } from 'date-fns'
// @prop-types
import PropTypes from 'prop-types'
// @react-hooks-form
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

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
import useLocales from '@/hooks/useLocales'
import {
  // useAddAssigneeMutation,
  // useAddCardMutation,
  // useGetUserQuery,
  // useRemoveAssigneeMutation,
  useSearchEmailQuery,
  useSearchPhoneQuery, // useUpdateCardMutation,
  // useUpdateLaneMutation,
} from '@/sections/kanban/kanbanSlice'

import KanbanFileUpload from './KanbanFileUpload'

const CheckboxRootStyle = styled('div')(() => ({
  '& .MuiFormGroup-root': {
    flexDirection: 'row',
  },
}))

KanbanTaskForm.propTypes = {
  hasAddPermission: PropTypes.bool,
  isAddTaskNoColumn: PropTypes.bool,
  laneId: PropTypes.string,
  card: PropTypes.object,
  columnOptions: PropTypes.array,
  activeJobOptions: PropTypes.array,
  onClose: PropTypes.func,
  onCloseUpdate: PropTypes.func,
  setOpenHistory: PropTypes.func,
}

function KanbanTaskForm({
  card,
  hasAddPermission,
  isAddTaskNoColumn,
  laneId,
  columnOptions,
  activeJobOptions,
  onClose,
  onCloseUpdate,
  setOpenHistory,
}) {
  const AddTaskSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    laneId:
      isAddTaskNoColumn && Yup.string().required('Column name is required'),
    idJob: Yup.string().required('Name job is required'),
    email: card
      ? Yup.string().required('Email is required')
      : Yup.object()
          .shape({
            value: Yup.string(),
          })
          .nullable()
          .required('Email is required'),
    phone: card
      ? Yup.string().required('Email is required')
      : Yup.object()
          .shape({
            value: Yup.string(),
          })
          .nullable()
          .required('Phone is required'),
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
  const { translate } = useLocales()
  const { handleSubmit, watch, reset, setValue } = methods
  const watchSocial = watch('social')
  const watchIdJob = watch('idJob')

  const [keyPhoneSearch, setKeyPhoneSearch] = useState('')
  const phoneSearch = useDebounce(keyPhoneSearch, 500)
  const [keyEmailSearch, setKeyEmailSearch] = useState('')
  const emailSearch = useDebounce(keyEmailSearch, 500)
  const { data: phoneData, isFetching: isPhoneFetching } = useSearchPhoneQuery({
    phone: phoneSearch,
  })
  const { data: emailData, isFetching: isEmailFetching } = useSearchEmailQuery({
    email: emailSearch,
  })
  // const { data: contactData } = useGetUserQuery()
  // const [addCard, { isLoading: isAdding }] = useAddCardMutation()
  // const [updateCard, { isLoading: isUpdating }] = useUpdateCardMutation()
  // const [updateLane] = useUpdateLaneMutation()
  // const [addAssignee] = useAddAssigneeMutation()
  // const [removeAssignee] = useRemoveAssigneeMutation()

  const phoneOptions = useMemo(() => {
    if (phoneData && phoneData.data.candidate.length > 0) {
      const candidates = phoneData.data.candidate
      return candidates.map((candidate) => ({
        label: candidate.phone,
        value: candidate.id,
        name: candidate.name,
        email: candidate.email,
      }))
    } else return []
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
    } else return []
  }, [emailData])

  useEffect(() => {
    if (card) {
      const {
        Candidate,
        laneId,
        Job,
        approachDate,
        expectedDate,
        position,
        cv,
        refineCv = '',
        noteApproach,
        // Users,
      } = card
      //   setUsers(Users)
      setValue('name', Candidate?.name || '')
      setValue('laneId', laneId)
      setValue('idJob', Job.id)
      setValue('nameJob', Job.title)
      setValue('email', Candidate.email)
      setValue('location', Job.Location?.name || '')
      setValue('clientName', Job.Client?.name || '')
      setValue('social', ['facebook', 'linkedin', 'skype'])
      setValue(
        'facebook',
        Candidate.facebook
          ? `https://www.facebook.com/${Candidate.facebook}`
          : ''
      )
      setValue('linkedin', Candidate.linkedin || '')
      setValue('skype', Candidate.skype || '')
      setValue('phone', Candidate.phone)
      setValue('approachDate', format(new Date(approachDate), 'yyyy-MM-dd'))
      setValue('expectedDate', expectedDate || new Date())
      setValue('position', position || '')
      setValue('linkCv', cv || '')
      setValue('refineCv', refineCv || '')
      setValue('noteApproach', noteApproach)
    }
  }, [card, setValue])

  useEffect(() => {
    if (!card && watchIdJob) {
      const job = activeJobOptions.find((job) => job.value === watchIdJob)
      setValue('location', job?.location)
      setValue('clientName', job?.clientName)
      setValue('nameJob', job?.label)
    }
  }, [card, watchIdJob, activeJobOptions, setValue])

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

  const hanldeAddTask = async (data) => {
    const reqData = { ...data }
    reqData.approachDate = format(new Date(reqData.approachDate), 'yyyy-MM-dd')
    if (!reqData.laneId) {
      reqData.laneId = laneId
    }
    if (!card) {
      delete reqData.refineCv
    }
    reqData.email = data.email.label
    reqData.phone = data.phone.label
    delete reqData.social

    // try {
    //   if (card) {
    //     if (reqData.laneId) {
    //       await updateLane({ cardId: card.id, laneId: reqData.laneId })
    //       delete reqData.laneId
    //     }
    //     await updateCard({ reqData, cardId: card.id }).unwrap()
    //     enqueueSnackbar('Update card successfully!')
    //     handleCloseUpdateTaskReset()
    //   } else {
    //     await addCard(reqData).unwrap()
    //     enqueueSnackbar('Create card successfully!')
    //     handleCloseAddTaskReset()
    //   }
    //   setKeyEmailSearch('')
    //   setKeyPhoneSearch('')
    // } catch (error) {
    //   if (error.data) {
    //     enqueueSnackbar(
    //       error?.data[0].toUpperCase() + error?.data.slice(1) + '!',
    //       {
    //         variant: 'error',
    //       }
    //     )
    //   } else {
    //     enqueueSnackbar('Something went wrong! Please try again', {
    //       variant: 'error',
    //     })
    //   }
    // }
  }

  return (
    <FormProvider onSubmit={handleSubmit(hanldeAddTask)} methods={methods}>
      <Box mt={2}>
        <RHFTextField
          label={'Name'}
          name='name'
          type='text'
          disabled={!hasAddPermission}
        />
      </Box>

      {isAddTaskNoColumn && (
        <Box mt={2}>
          <RHFBasicSelect
            label={'Column Name'}
            name='laneId'
            options={columnOptions}
            disabled={!hasAddPermission}
          />
        </Box>
      )}

      <Box mt={2}>
        <RHFBasicSelect
          label={'Name Job'}
          name='idJob'
          options={activeJobOptions}
          disabled={!hasAddPermission}
        />
      </Box>

      <Box mt={2}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <RHFTextField
              label={'Location'}
              name='location'
              type='text'
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField
              label={'Client Name'}
              name='clientName'
              type='text'
              disabled
            />
          </Grid>
        </Grid>
      </Box>

      <Box mt={2}>
        {card ? (
          <RHFTextField
            label='Email'
            name='email'
            disabled={!hasAddPermission}
          />
        ) : (
          <RHFAutocomplete
            AutocompleteProps={{
              size: 'small',
              loading: isEmailFetching,
              renderOption: (props, option) => (
                <Box key={option.key} component='li' {...props}>
                  {option.label}
                </Box>
              ),
              onChange: (field) => (event, newValue) => {
                field.onChange(newValue)
                if (newValue) {
                  setValue('name', newValue.name)
                  setKeyEmailSearch(newValue.label)
                  setKeyPhoneSearch(newValue.phone)
                  const phoneValue = {
                    ...newValue,
                    label: newValue.phone,
                    email: newValue.label,
                  }
                  delete phoneValue.phone
                  setValue('phone', phoneValue)
                }
              },
              onInputChange: (e, newInputValue, reason) => {
                if (reason === 'reset') return
                setKeyEmailSearch(newInputValue)
              },
              inputValue: keyEmailSearch,
            }}
            label='Email'
            name='email'
            options={emailOptions}
            disabled={!hasAddPermission}
          />
        )}
      </Box>

      <Box mt={2}>
        {!card && (
          <CheckboxRootStyle>
            <RHFMultiCheckbox name='social' options={[]} />
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
            {card ? (
              <RHFTextField
                label={'Phone'}
                name='phone'
                fullWidth
                disabled={!hasAddPermission}
              />
            ) : (
              <RHFAutocomplete
                AutocompleteProps={{
                  size: 'small',
                  loading: isPhoneFetching,
                  renderOption: (props, option) => (
                    <Box key={option.key} component='li' {...props}>
                      {option.label}
                    </Box>
                  ),
                  onChange: (field) => (event, newValue) => {
                    field.onChange(newValue)
                    if (newValue) {
                      setValue('name', newValue.name)
                      setKeyPhoneSearch(newValue.label)
                      setKeyEmailSearch(newValue.email)
                      const emailValue = {
                        ...newValue,
                        label: newValue.email,
                        phone: newValue.label,
                      }
                      delete emailValue.email
                      setValue('email', emailValue)
                    }
                  },
                  onInputChange: (e, newInputValue, reason) => {
                    if (reason === 'reset') return
                    setKeyPhoneSearch(newInputValue)
                  },
                  inputValue: keyPhoneSearch,
                }}
                label='Phone'
                name='phone'
                options={phoneOptions}
                disabled={!hasAddPermission}
              />
            )}
          </Grid>
          <Grid item xs={6}>
            <RHFDatePicker
              label={'Approach Date'}
              name='approachDate'
              disabled={!hasAddPermission}
            />
          </Grid>
        </Grid>
      </Box>

      {card && (
        <Box mt={2}>
          <RHFDateTimePicker
            label={'Expected Date'}
            name='expectedDate'
            disabled={!hasAddPermission}
          />
        </Box>
      )}

      <Box mt={2}>
        <RHFTextField
          label={'Position'}
          name='position'
          disabled={!hasAddPermission}
        />
      </Box>

      <Box mt={2}>
        <KanbanFileUpload
          label={'Link CV'}
          nameTextField='linkCv'
          name={watch('name')}
          nameJob={watch('nameJob')}
          idJob={watchIdJob}
          hasAddPermission={hasAddPermission}
          setValue={setValue}
        />
      </Box>
      {card && (
        <Box mt={2}>
          <KanbanFileUpload
            label={'Link Refine CV'}
            nameTextField='refineCv'
            name={watch('name')}
            nameJob={watch('nameJob')}
            idJob={watchIdJob}
            hasAddPermission={hasAddPermission}
            setValue={setValue}
          />
        </Box>
      )}

      <Box mt={2}>
        <RHFTextField
          label={'Approach Point'}
          name='noteApproach'
          multiline
          rows={3}
        />
      </Box>
      <Stack
        mt={2}
        direction='row'
        justifyContent={card ? 'space-between' : 'right'}
      >
        {card && (
          <Assignee
            // onToggleAssignee={onToggleAssignee}
            // assignee={users}
            hasAddAssignee={hasAddPermission}
            // listContacts={contactData?.data?.list}
          />
        )}
        <Stack direction='row'>
          {card && (
            <Button type='button' variant='contained'>
              {translate('Create Interview')}
            </Button>
          )}
          {hasAddPermission && (
            <Button
              type='submit'
              variant='contained'
              sx={{ marginLeft: '8px' }}
            >
              {card ? translate('Update') : translate('Save')}
            </Button>
          )}
          <Button
            type='button'
            sx={{ marginLeft: '8px' }}
            onClick={() => {
              card ? handleCloseUpdateTaskReset() : handleCloseAddTaskReset()
            }}
          >
            {translate('Cancel')}
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  )
}

export default React.memo(KanbanTaskForm)
