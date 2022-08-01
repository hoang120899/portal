import { Box, Button, Chip, Grid, Stack, Typography } from '@mui/material'

import { RHFAutocomplete, RHFTextField } from '@/components/hook-form'
import useLocales from '@/hooks/useLocales'
import useRole from '@/hooks/useRole'
import {
  useGetListJobsQuery,
  useGetListSkillsQuery,
} from '@/redux/api/apiSlice'

import { SEARCH_FIELD } from './config'

export default function CandidateTableToolbar() {
  const { translate } = useLocales()
  const { currentRole } = useRole()
  const { data: listJobsRes } = useGetListJobsQuery({ currentRole })
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
          <Typography>{translate('Email address')}:</Typography>
          <RHFTextField
            type='text'
            name={SEARCH_FIELD.EMAIL}
            placement={translate('Enter email')}
          />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <Typography>{translate('Phone')}:</Typography>
          <RHFTextField
            type='text'
            name={SEARCH_FIELD.PHONE}
            placement={translate('Enter phone')}
          />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <Typography>{translate('Name')}:</Typography>
          <RHFTextField
            type='text'
            name={SEARCH_FIELD.NAME}
            placement={translate('Enter name')}
          />
        </Stack>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <Typography>{translate('Text')}:</Typography>
          <RHFTextField
            type='text'
            name='text'
            placement={translate('Enter text')}
          />
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Stack spacing={1}>
          <Typography>{translate('Job')}:</Typography>
          <RHFAutocomplete
            name={SEARCH_FIELD.JOB_ID}
            options={listJobs}
            label={translate('Select job')}
            AutocompleteProps={{
              size: 'small',
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
          <Typography>{translate('Skill')}:</Typography>
          <RHFAutocomplete
            AutocompleteProps={{
              multiple: true,
              size: 'small',
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
            label={translate('Select skill')}
            options={listSkills}
          />
        </Stack>
      </Grid>

      <Grid item xs={12}>
        <Stack direction='row' justifyContent='end'>
          <Button variant='contained' type='submit'>
            {translate('Search')}
          </Button>
        </Stack>
      </Grid>
    </Grid>
  )
}
