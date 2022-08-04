import { Box, Button, Chip, Grid, Stack, Typography } from '@mui/material'

import { RHFAutocomplete, RHFTextField } from '@/components/hook-form'
import useLocales from '@/hooks/useLocales'
import useRole from '@/hooks/useRole'
import {
  useGetAdminSearchListJobsQuery,
  useGetListSkillsQuery,
} from '@/redux/api/apiSlice'

import { SEARCH_FIELD } from './config'

export default function CandidateTableToolbar() {
  const { translate } = useLocales()
  const { currentRole } = useRole()
  const { data: listJobsRes } = useGetAdminSearchListJobsQuery({ currentRole })
  const { data: listSkillsRes } = useGetListSkillsQuery({ currentRole })

  const listJobs = (listJobsRes?.data?.listJob || []).map(
    ({ title = '', id }) => ({
      label: title,
      id,
    })
  )

  const listSkills = (listSkillsRes?.data?.skills || []).map(
    ({ name = '', id }) => ({
      label: name,
      id,
    })
  )

  return (
    <Grid container spacing={2} sx={{ px: 2, pb: 2 }}>
      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <Typography>{translate('pages.candidates.email')}:</Typography>
          <RHFTextField
            type='text'
            name={SEARCH_FIELD.EMAIL}
            placeholder={translate('pages.candidates.enterEmail')}
          />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <Typography>{translate('pages.candidates.phone')}:</Typography>
          <RHFTextField
            type='text'
            name={SEARCH_FIELD.PHONE}
            placeholder={translate('pages.candidates.enterPhone')}
          />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <Typography>{translate('pages.candidates.name')}:</Typography>
          <RHFTextField
            type='text'
            name={SEARCH_FIELD.NAME}
            placeholder={translate('pages.candidates.enterName')}
          />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <Typography>{translate('pages.candidates.text')}:</Typography>
          <RHFTextField
            type='text'
            name='text'
            placeholder={translate('pages.candidates.enterText')}
          />
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Stack spacing={1}>
          <Typography>{translate('pages.candidates.job')}:</Typography>
          <RHFAutocomplete
            name={SEARCH_FIELD.JOB_ID}
            options={listJobs}
            label={translate('pages.candidates.selectJob')}
            AutocompleteProps={{
              size: 'small',
              isOptionEqualToValue: (option, value) => option.id === value.id,
              renderOption: (props, option) => {
                // fix error duplicate key
                const newProps = {
                  ...props,
                  key: option.id,
                }
                return (
                  <Box key={newProps.key} component='li' {...newProps}>
                    {option.label}
                  </Box>
                )
              },
            }}
          />
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Stack spacing={1}>
          <Typography>{translate('pages.candidates.skill')}:</Typography>
          <RHFAutocomplete
            AutocompleteProps={{
              multiple: true,
              size: 'small',
              isOptionEqualToValue: (option, value) => option.id === value.id,
              renderOption: (props, option) => {
                // fix error duplicate key
                const newProps = {
                  ...props,
                  key: option.id,
                }
                return (
                  <Box key={newProps.key} component='li' {...newProps}>
                    {option.label}
                  </Box>
                )
              },
              renderTags: (value, getTagProps) =>
                value.map(({ label, id }, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={`${id}-${index}`}
                    size='small'
                    label={label}
                  />
                )),
            }}
            name={SEARCH_FIELD.SKILL}
            label={translate('pages.candidates.selectKill')}
            options={listSkills}
          />
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Stack direction='row' justifyContent='end'>
          <Button variant='contained' type='submit'>
            {translate('pages.candidates.search')}
          </Button>
        </Stack>
      </Grid>
    </Grid>
  )
}
