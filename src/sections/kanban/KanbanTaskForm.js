import React, { useEffect, useMemo, useState } from 'react'

import { LoadingButton } from '@mui/lab'
// @mui
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Link,
  Modal,
  Stack,
  TextareaAutosize,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'

import { yupResolver } from '@hookform/resolvers/yup'
// @date-fns
import { format } from 'date-fns'
import { useSnackbar } from 'notistack'
// @prop-types
import PropTypes from 'prop-types'
// @react-hooks-form
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'

// components
import Iconify from '@/components/Iconify'
import PreviewPdf from '@/components/PreviewPdf'
import {
  FormProvider,
  RHFAutocomplete,
  RHFDatePicker,
  RHFDateTimePicker,
  RHFMultiCheckbox,
  RHFTextField,
} from '@/components/hook-form'
import { DATE_YEAR_MONTH_DAY_FORMAT } from '@/config'
import { useDebounce } from '@/hooks/useDebounce'
import useIsMountedRef from '@/hooks/useIsMountedRef'
import useLocales from '@/hooks/useLocales'
import useResponsive from '@/hooks/useResponsive'
import { convertDriverToBase64 } from '@/sections/candidate/candidateSlice'
import { URL_DOWNLOAD_CV } from '@/sections/candidate/config'
import {
  getBoard,
  useAddCardMutation,
  useSearchEmailQuery,
  useSearchPhoneQuery,
  useUpdateCardMutation,
  useUpdateLaneMutation,
} from '@/sections/kanban/kanbanSlice'

import KanbanAssignee from './KanbanAssignee'
import KanbanFileUpload from './KanbanFileUpload'
import {
  FACEBOOK_URL,
  JOB_FORM_STICKY_BAR_COLOR,
  SOCIAL_LIST,
  SOCIAL_OPTIONS,
} from './config'

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
  activeJobOptions: PropTypes.array,
  onClose: PropTypes.func,
  onCloseUpdate: PropTypes.func,
  setOpenHistory: PropTypes.func,
  isScrolled: PropTypes.bool,
  isLight: PropTypes.bool,
  formRef: PropTypes.object,
}

function KanbanTaskForm({
  card,
  hasAddPermission,
  isAddTaskNoColumn,
  laneId,
  activeJobOptions,
  onClose,
  onCloseUpdate,
  setOpenHistory,
  isScrolled,
  isLight,
  formRef,
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
    approachDate: format(new Date(), DATE_YEAR_MONTH_DAY_FORMAT),
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
  const { handleSubmit, watch, setValue } = methods
  const watchSocial = watch('social')
  const watchIdJob = watch('idJob')
  const { enqueueSnackbar } = useSnackbar()

  const isMobile = useResponsive('down', 'sm')
  const dispatch = useDispatch()
  const listColumnName = useSelector((state) => state.kanban.listColumnName)
  const columns = useSelector((state) => state.kanban.board.columns)
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
  const [updateLane] = useUpdateLaneMutation()
  const [addCard, { isLoading: isAdding }] = useAddCardMutation()
  const [updateCard, { isLoading: isUpdating }] = useUpdateCardMutation()

  const phoneOptions = useMemo(() => {
    const candidates = phoneData?.data?.candidate || []
    return candidates.map(
      ({ name, email, phone: label = '', id: value = '' }) => ({
        label,
        value,
        name,
        email,
      })
    )
  }, [phoneData])

  const emailOptions = useMemo(() => {
    const candidates = emailData?.data?.candidate || []
    return candidates.map(
      ({ name, phone, email: label = '', id: value = '' }) => ({
        label,
        value,
        name,
        phone,
      })
    )
  }, [emailData])

  const cardByColumns = useMemo(() => {
    const { laneId, id } = card || {}
    const { CandidateJobs } = columns?.[laneId] || []
    return CandidateJobs?.find((item) => item.id === id)
  }, [columns, card])

  useEffect(() => {
    if (!card) return

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
    } = card

    setValue('name', Candidate?.name || '')
    setValue('laneId', laneId)
    setValue('idJob', Job.id)
    setValue('nameJob', Job.title)
    setValue('email', Candidate.email)
    setValue('location', Job.Location?.name || '')
    setValue('clientName', Job.Client?.name || '')
    setValue('social', SOCIAL_LIST)
    setValue(
      'facebook',
      Candidate.facebook ? `${FACEBOOK_URL}${Candidate.facebook}` : ''
    )
    setValue('linkedin', Candidate.linkedin || '')
    setValue('skype', Candidate.skype || '')
    setValue('phone', Candidate.phone)
    setValue(
      'approachDate',
      format(new Date(approachDate), DATE_YEAR_MONTH_DAY_FORMAT)
    )
    if (expectedDate) {
      setValue('expectedDate', expectedDate)
    }
    setValue('position', position || '')
    setValue('linkCv', cv || '')
    setValue('refineCv', refineCv || '')
    setValue('noteApproach', noteApproach)
  }, [card, setValue])

  const [widthRef, setWidthRef] = useState(formRef?.current?.clientWidth)
  const isMountedRef = useIsMountedRef()

  useEffect(() => {
    const handleClientWidthRef = () => {
      if (!isMountedRef.current) return
      setWidthRef(formRef?.current?.clientWidth)
    }

    handleClientWidthRef()

    if (typeof window === 'undefined') return
    window.addEventListener('resize', handleClientWidthRef)

    return () => {
      if (typeof window === 'undefined') return
      window.removeEventListener('resize', handleClientWidthRef)
    }
  }, [formRef, isMountedRef])

  useEffect(() => {
    if (!card && watchIdJob) {
      const job = activeJobOptions.find((job) => job.value === watchIdJob)

      setValue('location', job?.location)
      setValue('clientName', job?.clientName)
      setValue('nameJob', job?.label)
    }
  }, [card, watchIdJob, activeJobOptions, setValue])

  const handleCloseAddTask = () => {
    onClose()
    setOpenHistory(false)
  }

  const handleCloseUpdateTask = () => {
    onCloseUpdate()
    setOpenHistory(false)
  }

  const { base64, isLoadingPDF } = useSelector((state) => state.candidates)

  const [isOpenPDF, setIsOpenPDF] = useState(false)

  const handleOpenPDF = () => {
    setIsOpenPDF(true)
  }

  useEffect(() => {
    const { cv, candidateId } = card || {}
    if (!cv || !candidateId) return

    dispatch(convertDriverToBase64({ linkDrive: cv, candidateId }))
  }, [dispatch, card])

  const handleSubmitForm = async (data) => {
    const {
      linkCv: cv,
      approachDate,
      email,
      phone,
      laneId: laneDataId,
    } = data || {}
    const { label: phoneLabel } = phone || {}
    const { label: emailLabel } = email || {}

    const reqData = {
      ...data,
      cv,
      approachDate: format(new Date(approachDate), DATE_YEAR_MONTH_DAY_FORMAT),
      laneId: laneDataId || laneId,
      phone: phoneLabel,
      email: emailLabel,
    }

    if (!card) {
      delete reqData.refineCv
    }

    delete reqData.social

    try {
      if (card) {
        if (reqData.laneId !== card.laneId) {
          await updateLane({ cardId: card.id, laneId: reqData.laneId })
        }
        delete reqData.laneId
        await updateCard({ reqData, cardId: card.id }).unwrap()
        enqueueSnackbar(translate('pages.board.updateCardSuccess'))
        handleCloseUpdateTask()
      } else {
        await addCard(reqData).unwrap()
        enqueueSnackbar(translate('pages.board.createCardSuccess'))
        handleCloseAddTask()
      }
      dispatch(getBoard())
    } catch (error) {
      if (error.data) {
        enqueueSnackbar(error.data, {
          variant: 'error',
        })
      } else {
        enqueueSnackbar(translate('pages.board.somethingWentWrong'), {
          variant: 'error',
        })
      }
    }
  }

  return (
    <>
      <Modal
        open={isAdding || isUpdating}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <CircularProgress size={60} />
      </Modal>

      <FormProvider onSubmit={handleSubmit(handleSubmitForm)} methods={methods}>
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            right: 0,
            height: '60px',
            width: `${widthRef}px`,
            background: isLight
              ? JOB_FORM_STICKY_BAR_COLOR.LIGHT.COLOR
              : JOB_FORM_STICKY_BAR_COLOR.DARK.COLOR,
            zIndex: 1,
            borderBottom: '1px solid #d8d8d8',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            '& button': {
              height: 'fit-content',
            },
            padding: '12px 24px',
            boxShadow: isScrolled
              ? `0 1px 8px 0px ${
                  isLight
                    ? JOB_FORM_STICKY_BAR_COLOR.LIGHT.SHADOW
                    : JOB_FORM_STICKY_BAR_COLOR.DARK.SHADOW
                }`
              : 'none',
          }}
        >
          <Box component='header'>
            <Typography variant='h5'>
              {card ? translate('Update Card') : translate('Add Card')}
            </Typography>
          </Box>

          <Stack direction='row' sx={{ flexShrink: 0, maxHeight: '48px' }}>
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
                card ? handleCloseUpdateTask() : handleCloseAddTask()
              }}
            >
              {translate('Cancel')}
            </Button>
          </Stack>
        </Box>

        <Box mt='76px'>
          <RHFTextField
            label={translate('pages.board.name')}
            name='name'
            type='text'
            disabled={!hasAddPermission}
          />
        </Box>

        {isAddTaskNoColumn && (
          <Box mt={2}>
            <RHFAutocomplete
              AutocompleteProps={{
                size: 'small',
                defaultValue: card?.Lane?.nameColumn,
                isOptionEqualToValue: (option, value) => {
                  if (typeof value === 'string') return option.label === value
                  return option.label === value.label
                },
                renderOption: (props, option) => (
                  <Box component='li' {...props} key={option.value}>
                    {option.label}
                  </Box>
                ),
                onChange: (field) => (event, newValue) => {
                  field.onChange(newValue)
                  if (!newValue) return

                  setValue('laneId', newValue.value)
                },
              }}
              label={translate('pages.board.columnName')}
              name='laneId'
              options={listColumnName}
              disabled={!hasAddPermission}
            />
          </Box>
        )}

        <Box mt={2}>
          <RHFAutocomplete
            AutocompleteProps={{
              size: 'small',
              defaultValue: card?.Job.title,
              isOptionEqualToValue: (option, value) => {
                if (typeof value === 'string') return option.label === value
                return option.label === value.label
              },
              renderOption: (props, option) => (
                <Box component='li' {...props} key={option.value}>
                  {option.label}
                </Box>
              ),
              onChange: (field) => (event, newValue) => {
                field.onChange(newValue)
                if (!newValue) return

                setValue('idJob', newValue.value)
              },
            }}
            label={translate('pages.board.nameJob')}
            name='idJob'
            options={activeJobOptions}
            disabled={!hasAddPermission}
          />
        </Box>

        <Box mt={2}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <RHFTextField
                label={translate('pages.board.location')}
                name='location'
                type='text'
                disabled
              />
            </Grid>

            <Grid item xs={6}>
              <RHFTextField
                label={translate('pages.board.nameClient')}
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
              label={translate('pages.board.email')}
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
              label={translate('pages.board.email')}
              name='email'
              options={emailOptions}
              disabled={!hasAddPermission}
            />
          )}
        </Box>

        <Box mt={2}>
          {!card && (
            <CheckboxRootStyle>
              <RHFMultiCheckbox name='social' options={SOCIAL_OPTIONS} />
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
                  label={translate('pages.board.phone')}
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
                  label={translate('pages.board.phone')}
                  name='phone'
                  options={phoneOptions}
                  disabled={!hasAddPermission}
                />
              )}
            </Grid>

            <Grid item xs={6}>
              <RHFDatePicker
                label={translate('pages.board.approachDate')}
                name='approachDate'
                disabled={!hasAddPermission}
              />
            </Grid>
          </Grid>
        </Box>

        {card && (
          <Box mt={2}>
            <RHFDateTimePicker
              label={translate('pages.board.expectedDate')}
              name='expectedDate'
              disabled={!hasAddPermission}
            />
          </Box>
        )}

        <Box mt={2}>
          <RHFTextField
            label={translate('pages.board.position')}
            name='position'
            disabled={!hasAddPermission}
          />
        </Box>

        <Box mt={2}>
          <KanbanFileUpload
            label={translate('pages.board.uploadCV')}
            nameTextField='linkCv'
            watch={watch}
            idJob={watchIdJob}
            hasAddPermission={hasAddPermission}
            setValue={setValue}
          />
        </Box>

        {card && (
          <Box mt={2}>
            <KanbanFileUpload
              label={translate('pages.board.uploadCVToLinkRefine')}
              nameTextField='refineCv'
              watch={watch}
              idJob={watchIdJob}
              hasAddPermission={hasAddPermission}
              setValue={setValue}
            />
          </Box>
        )}

        <Box mt={2}>
          <RHFTextField
            label={translate('pages.board.approachPoint')}
            name='noteApproach'
            multiline
            InputProps={{
              inputComponent: TextareaAutosize,
              inputProps: {
                minRows: 3,
              },
            }}
          />
        </Box>

        <Stack
          mt={2}
          spacing={isMobile ? 2 : 0}
          direction={isMobile ? 'column-reverse' : 'row'}
          justifyContent={cardByColumns || card ? 'space-between' : 'right'}
        >
          {cardByColumns && (
            <KanbanAssignee
              Users={cardByColumns?.Users}
              laneId={cardByColumns?.laneId}
              cardId={cardByColumns?.id}
              hasAddPermission={hasAddPermission}
            />
          )}

          {card && !cardByColumns && (
            <KanbanAssignee
              Users={card?.Users}
              laneId={card?.laneId}
              cardId={card?.id}
              cardNotInCol={true}
              hasAddPermission={hasAddPermission}
            />
          )}

          <Stack direction='row' spacing={1} sx={{ height: 'fit-content' }}>
            {card && (
              <Button
                type='button'
                variant='contained'
                size='large'
                sx={{
                  whiteSpace: 'nowrap',
                }}
              >
                {translate('pages.board.createInterview')}
              </Button>
            )}

            {card?.cv && (
              <>
                <Button
                  variant='contained'
                  type='button'
                  size='medium'
                  sx={{
                    '& a': { color: 'white' },
                    '& a:hover': { textDecoration: 'none' },
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Link
                    download={`${
                      card?.Candidate?.name ? card.Candidate.name : ''
                    }.pdf`}
                    href={`${URL_DOWNLOAD_CV},${base64}`}
                  >
                    {translate('pages.board.downloadCV')}
                  </Link>
                </Button>

                <LoadingButton
                  sx={{
                    '& a': { color: 'white' },
                    '& a:hover': { textDecoration: 'none' },
                    whiteSpace: 'nowrap',
                  }}
                  variant='contained'
                  size='small'
                  loading={isLoadingPDF}
                  onClick={handleOpenPDF}
                >
                  {translate('pages.candidates.rawCV')}
                </LoadingButton>
              </>
            )}
          </Stack>
        </Stack>
      </FormProvider>
      {base64 && (
        <PreviewPdf
          isOpen={isOpenPDF}
          onClose={() => setIsOpenPDF(false)}
          base64={base64}
        />
      )}
    </>
  )
}

export default React.memo(KanbanTaskForm)
