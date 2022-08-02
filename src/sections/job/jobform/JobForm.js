import { useEffect, useMemo, useRef, useState } from 'react'

// @mui
import { LoadingButton } from '@mui/lab'
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Stack,
  TextareaAutosize,
  Typography,
  useTheme,
} from '@mui/material'

import { yupResolver } from '@hookform/resolvers/yup'
import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'
// form
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

// components
import {
  FormProvider,
  RHFAutocomplete,
  RHFBasicSelect,
  RHFEditor,
  RHFSwitch,
  RHFTextField,
} from '@/components/hook-form'
import { useDebounce } from '@/hooks/useDebounce'
import useIsMountedRef from '@/hooks/useIsMountedRef'
import useLocales from '@/hooks/useLocales'
import {
  useCreateJobMutation,
  useGetListClientQuery,
  useGetListLocationQuery,
  useGetListTagsQuery,
  useSearchSkillMutation,
} from '@/sections/job/jobSlice'
import palette from '@/theme/palette'

import {
  JOB_ACTIVE_STATUS,
  JOB_EDITOR_DEFAULT_TEXT,
  JOB_FORM_STICKY_BAR_COLOR,
  JOB_STATUS_OPTIONS,
  JOB_TYPE_OPTIONS,
} from '../config'
import NewSkill from './NewSkill'

JobForm.propTypes = {
  onClose: PropTypes.func,
  isEdit: PropTypes.bool,
  job: PropTypes.object,
  onEditSubmit: PropTypes.func,
  isScrolled: PropTypes.bool,
}

function JobForm({ onClose, isEdit, job, onEditSubmit, isScrolled }) {
  const theme = useTheme()
  const { translate } = useLocales()

  const NewUserSchema = Yup.object().shape({
    title: Yup.string().required(translate('pages.jobs.titleMessage')),
    salary: Yup.string().required(translate('pages.jobs.salaryMessage')),
    locationId: Yup.string().required(translate('pages.jobs.locationMessage')),
    time: Yup.string().required(translate('pages.jobs.timeMessage')),
    type: Yup.string().required(translate('pages.jobs.typeMessage')),
    titlePage: Yup.string()
      .max(60)
      .required(translate('pages.jobs.titlePageMessage')),
    metaJob: Yup.string()
      .max(60)
      .required(translate('pages.jobs.meteJobMessage')),
    clientId: Yup.string().required(translate('pages.jobs.clientMessage')),
  })
  const defaultValues = useMemo(() => {
    const primaryMainColor = theme.palette.primary.main
    const defaultJobEditorConfig = JOB_EDITOR_DEFAULT_TEXT(primaryMainColor)
    const {
      externalRecruiter = false,
      title = '',
      salary = '',
      locationId = '',
      time = '',
      type = '',
      tags = [],
      titlePage = '',
      metaJob = '',
      keyword = '',
      note = '',
      descJob = '',
      description = '',
      interviewProcess = '',
      extraBenefit = '',
      jobStatus = JOB_ACTIVE_STATUS,
      client = {},
      arr_skill: skillNotRequired = [],
      arr_skill_required: skillRequired = [],
      aboutFetch = defaultJobEditorConfig.aboutFetch,
      responsibilities = defaultJobEditorConfig.responsibilities,
      requirement = defaultJobEditorConfig.requirement,
      niceToHave = defaultJobEditorConfig.niceToHave,
      benefit = defaultJobEditorConfig.benefit,
    } = job || {}
    const { id: clientId = '' } = client || {}

    return {
      externalRecruiter,
      title,
      salary,
      locationId,
      time,
      type,
      tags,
      titlePage,
      metaJob,
      keyword,
      note,
      descJob,
      description,
      interviewProcess,
      extraBenefit,
      jobStatus,
      clientId,
      skillNotRequired,
      skillRequired,
      aboutFetch,
      responsibilities,
      requirement,
      niceToHave,
      benefit,
    }
  }, [job, theme])

  const isLight = theme.palette.mode === 'light'

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const { enqueueSnackbar } = useSnackbar()
  const [keySkillSearch, setKeySkillSearch] = useState('')
  const [skillOptions, setSkillOptions] = useState([])
  const skillKeyword = useDebounce(keySkillSearch, 500)
  const [searchSkill] = useSearchSkillMutation()
  const [createJob] = useCreateJobMutation()

  const { data: locationData } = useGetListLocationQuery()
  const { data: clientData } = useGetListClientQuery()
  const { data: tagData } = useGetListTagsQuery()

  const locationOptions = useMemo(() => {
    if (!locationData) return []

    const { data: { location = [] } = {} } = locationData
    return location.map(({ id, name }) => ({
      value: id,
      label: name,
    }))
  }, [locationData])

  const clientOptions = useMemo(() => {
    if (!clientData) return []

    const { data: { clients = [] } = {} } = clientData
    return clients.map(({ id, name }) => ({
      value: id,
      label: name,
    }))
  }, [clientData])

  const tagOptions = useMemo(() => {
    if (!tagData) return []

    const { data: { tags = [] } = {} } = tagData
    return tags.map(({ id, title }) => ({
      value: id,
      label: title,
    }))
  }, [tagData])

  useEffect(() => {
    async function getSkill(data) {
      try {
        const response = await searchSkill(data).unwrap()
        const skillList = response.map(({ id, name }) => ({
          value: id,
          label: name,
        }))
        setSkillOptions(skillList)
      } catch (error) {
        enqueueSnackbar('Failed to get skill!', { variant: 'error' })
      }
    }
    if (skillKeyword) {
      getSkill({ skill: skillKeyword })
    }
  }, [skillKeyword, searchSkill, enqueueSnackbar])
  const [widthRef, setWidthRef] = useState(ref?.current?.clientWidth)
  const isMountedRef = useIsMountedRef()

  useEffect(() => {
    const handleClientWidthRef = () => {
      if (!isMountedRef.current) return
      setWidthRef(ref?.current?.clientWidth)
    }

    handleClientWidthRef()

    if (typeof window === 'undefined') return
    window.addEventListener('resize', handleClientWidthRef)
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleClientWidthRef)
      }
    }
  }, [isMountedRef])

  const onSubmit = async (data) => {
    const reqData = { ...data }
    const location = locationData.data.location.find(
      (item) => item.id === data.locationId
    )
    const content = `${location.descLocation}<p><span style="color: rgb(136, 136, 136);">${data.type}</span></p>`
    reqData.clientId = Number(data.clientId)
    reqData.content = content
    reqData.skill = [...data.skillRequired, ...data.skillNotRequired]
    delete reqData.skillRequired
    delete reqData.skillNotRequired
    if (isEdit) {
      await onEditSubmit(reqData)
      return
    }
    try {
      delete reqData.externalRecruiter
      delete reqData.tags
      delete reqData.description
      await createJob(reqData).unwrap()
      enqueueSnackbar('Create job success!')
      onClose()
      reset()
    } catch (error) {
      enqueueSnackbar('Fail to create!', { variant: 'error' })
    }
  }
  const ref = useRef(null)

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: `${widthRef}px`,
          background: isLight
            ? JOB_FORM_STICKY_BAR_COLOR.LIGHT.COLOR
            : JOB_FORM_STICKY_BAR_COLOR.DARK.COLOR,
          zIndex: 1,
          borderBottom: `1px solid ${
            isLight
              ? JOB_FORM_STICKY_BAR_COLOR.LIGHT.COLOR
              : JOB_FORM_STICKY_BAR_COLOR.DARK.COLOR
          }`,
          paddingRight: '24px',
          boxShadow: `0 1px ${isScrolled ? '8px' : '1px'} 0px ${
            isLight
              ? JOB_FORM_STICKY_BAR_COLOR.LIGHT.SHADOW
              : JOB_FORM_STICKY_BAR_COLOR.DARK.SHADOW
          }`,
          height: '60px',
        }}
      >
        <Box
          sx={{
            height: '56px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            '& button': {
              height: 'fit-content',
            },
          }}
        >
          <Typography
            component='h6'
            variant='h6'
            sx={{ padding: '16px 24px 16px' }}
          >
            {isEdit
              ? translate('pages.jobs.editJob')
              : translate('pages.jobs.addJob')}
          </Typography>
          <Stack direction='row' spacing={2}>
            <LoadingButton
              type='submit'
              variant='contained'
              loading={isSubmitting}
            >
              {isEdit ? 'Save' : 'Create'}
            </LoadingButton>
            <Button variant='outlined' color='inherit' onClick={onClose}>
              {translate('pages.jobs.cancel')}
            </Button>
          </Stack>
        </Box>
      </Box>
      <Box pl={3} pr={3} pb={3} marginTop='60px' ref={ref}>
        <Box>
          <Typography sx={{ fontWeight: 'bold' }} pt={2}>
            {translate('pages.jobs.jobInfo')}:
          </Typography>
          <Box pt={2}>
            <RHFTextField
              name='title'
              label={translate('pages.jobs.jobTitle')}
            />
          </Box>

          <Stack direction='row' pt={2} spacing={2}>
            <RHFTextField
              name='salary'
              label={translate('pages.jobs.salary')}
            />
            <RHFBasicSelect
              name='locationId'
              label={translate('pages.jobs.location')}
              options={locationOptions}
            />
          </Stack>

          <Stack direction='row' pt={2} spacing={2}>
            <RHFTextField name='time' label={translate('pages.jobs.time')} />
            <RHFBasicSelect
              name='type'
              label={translate('pages.jobs.chooseType')}
              options={JOB_TYPE_OPTIONS}
            />
          </Stack>

          <Stack direction='row' pt={2} spacing={2}>
            <RHFTextField
              name='titlePage'
              label={translate('pages.jobs.pageTitle')}
              helperText={translate('pages.jobs.jobTitleHelper')}
            />
            <RHFTextField
              name='metaJob'
              label='Desc Meta'
              helperText={translate('pages.jobs.jobTitleHelper')}
            />
          </Stack>
          {isEdit && (
            <>
              <Stack direction='row' pt={2} spacing={2} alignItems='center'>
                <Stack direction='row' width='100%' alignItems='center'>
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      color: palette.light.grey[600],
                      marginRight: '8px',
                    }}
                  >
                    {translate('pages.jobs.allowShare')}
                  </Typography>
                  <RHFSwitch
                    name='externalRecruiter'
                    onChange={(e) => e.target.checked}
                  />
                </Stack>
                <RHFAutocomplete
                  AutocompleteProps={{
                    multiple: true,
                    defaultValue: job?.tags,
                    size: 'small',
                    renderTags: (value, getTagProps) =>
                      value.map(({ label, id }, index) => (
                        <Chip
                          {...getTagProps({ index })}
                          key={`${id}-${index}`}
                          size='small'
                          label={label}
                          color='warning'
                          sx={{ color: 'white' }}
                        />
                      )),
                  }}
                  name='tags'
                  label={translate('pages.jobs.tags')}
                  options={tagOptions}
                />
              </Stack>
              <Stack
                pt={2}
                sx={{
                  '& .ql-toolbar.ql-snow': {
                    display: 'none',
                  },
                }}
              >
                <RHFEditor name='description' initialValue='Description' />
              </Stack>
            </>
          )}
        </Box>
        <Stack spacing={2} py={2}>
          <Typography sx={{ fontWeight: 'bold' }}>
            {translate('pages.jobs.noteFromLeader')}:
          </Typography>

          <RHFTextField
            name='keyword'
            label={translate('pages.jobs.keyword')}
            multiline
            InputProps={{
              inputComponent: TextareaAutosize,
              inputProps: {
                minRows: 2,
              },
            }}
          />

          <RHFTextField
            name='note'
            label={translate('pages.jobs.note')}
            multiline
            InputProps={{
              inputComponent: TextareaAutosize,
              inputProps: {
                minRows: 2,
              },
            }}
          />

          <RHFTextField
            name='descJob'
            label={translate('pages.jobs.descJob')}
            multiline
            InputProps={{
              inputComponent: TextareaAutosize,
              inputProps: {
                minRows: 2,
              },
            }}
          />

          <RHFTextField
            name='interviewProcess'
            label={translate('pages.jobs.interviewProcess')}
            multiline
            InputProps={{
              inputComponent: TextareaAutosize,
              inputProps: {
                minRows: 2,
              },
            }}
          />

          <RHFTextField
            name='extraBenefit'
            label={translate('pages.jobs.extraBenefit')}
            multiline
            InputProps={{
              inputComponent: TextareaAutosize,
              inputProps: {
                minRows: 2,
              },
            }}
          />

          <RHFBasicSelect
            name='jobStatus'
            label={translate('pages.jobs.status')}
            options={JOB_STATUS_OPTIONS}
          />
        </Stack>

        <Stack spacing={2} pb={3}>
          <Typography sx={{ fontWeight: 'bold' }}>
            {translate('pages.jobs.description')}:
          </Typography>

          <Grid container>
            <Grid item sm={3} xs={12} pb={2}>
              <Typography>{translate('pages.jobs.aboutFetch')}</Typography>
            </Grid>
            <Grid item xs={12} sm={9} pb={2}>
              <RHFEditor initialValue='' name='aboutFetch' />
            </Grid>

            <Grid item sm={3} xs={12} pb={2}>
              <Typography>{translate('pages.jobs.client')}</Typography>
            </Grid>

            <Grid item xs={12} sm={9} pb={2}>
              <RHFBasicSelect name='clientId' options={clientOptions} />
            </Grid>

            <Grid item sm={3} xs={12} pb={2}>
              <Typography>
                {translate('pages.jobs.responsibilities')}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={9} pb={2}>
              <RHFEditor initialValue='' name='responsibilities' />
            </Grid>

            <Grid item sm={3} xs={12} pb={2}>
              <Typography>{translate('pages.jobs.requirement')}</Typography>
            </Grid>

            <Grid item xs={12} sm={9} pb={2}>
              <RHFEditor name='requirement' />
            </Grid>

            <Grid item sm={3} xs={12} pb={2}>
              <Typography>{translate('pages.jobs.niceToHave')}</Typography>
            </Grid>

            <Grid item xs={12} sm={9} pb={2}>
              <RHFEditor initialValue='' name='niceToHave' />
            </Grid>

            <Grid item sm={3} xs={12} pb={2}>
              <Typography>{translate('pages.jobs.benefit')}</Typography>
            </Grid>

            <Grid item xs={12} sm={9} pb={2}>
              <RHFEditor initialValue='' name='benefit' />
            </Grid>

            <Grid item sm={3} xs={12} pb={2}>
              <Typography>{translate('pages.jobs.skillRequired')}</Typography>
            </Grid>

            <Grid item xs={12} sm={9} pb={2}>
              <RHFAutocomplete
                name='skillRequired'
                AutocompleteProps={{
                  multiple: true,
                  size: 'small',
                  renderOption: (props, option) => (
                    <Box component='li' {...props} key={option.value}>
                      {option.label}
                    </Box>
                  ),
                  renderTags: (value, getTagProps) =>
                    value.map(({ name, label, id }, index) => (
                      <Chip
                        {...getTagProps({ index })}
                        key={`${id}-${index}`}
                        size='small'
                        label={name || label}
                        color='warning'
                        sx={{ color: 'white' }}
                      />
                    )),
                  onChange: (field) => (event, newValue) => {
                    const newSkillValue = newValue.map((skill) => ({
                      isRequired: true,
                      id: skill.value,
                      label: skill.label,
                    }))
                    field.onChange(newSkillValue)
                  },
                  onInputChange: (e, newInputValue) => {
                    setKeySkillSearch(newInputValue)
                  },
                  defaultValue: job?.arr_skill_required,
                }}
                options={skillOptions}
              />
            </Grid>

            <Grid item sm={3} xs={12} pb={2}>
              <Typography>{translate('pages.jobs.skill')}</Typography>
            </Grid>

            <Grid item xs={12} sm={9} pb={2}>
              <RHFAutocomplete
                name='skillNotRequired'
                AutocompleteProps={{
                  multiple: true,
                  size: 'small',
                  renderOption: (props, option) => (
                    <Box component='li' {...props} key={option.value}>
                      {option.label}
                    </Box>
                  ),
                  renderTags: (value, getTagProps) =>
                    value.map(({ name, label, id }, index) => (
                      <Chip
                        {...getTagProps({ index })}
                        key={`${id}-${index}`}
                        size='small'
                        label={name || label}
                        color='warning'
                        sx={{ color: 'white' }}
                      />
                    )),
                  onChange: (field) => (event, newValue) => {
                    const newSkillValue = newValue.map((skill) => ({
                      isRequired: false,
                      id: skill.value,
                      label: skill.label,
                    }))
                    field.onChange(newSkillValue)
                  },
                  onInputChange: (e, newInputValue) => {
                    setKeySkillSearch(newInputValue)
                  },
                  defaultValue: job?.arr_skill,
                }}
                options={skillOptions}
              />
            </Grid>
          </Grid>
        </Stack>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3} />
          <Grid item xs={12} sm={9} pb={2}>
            <NewSkill />
          </Grid>
        </Grid>
      </Box>
    </FormProvider>
  )
}

export default JobForm
