import React, { memo } from 'react'

import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextareaAutosize,
  Typography,
} from '@mui/material'

import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

import { FormProvider, RHFTextField } from '@/components/hook-form'
import useLocales from '@/hooks/useLocales'

JobDetailNote.propTypes = {
  job: PropTypes.object,
}

function JobDetailNote({ job }) {
  const { note, keyword, descJob, interviewProcess, extraBenefit } = job || {}
  const { translate } = useLocales()

  const methods = useForm({
    defaultValues: {
      note,
      keyword,
      descJob,
      interviewProcess,
      extraBenefit,
    },
  })

  if (!note && !keyword && !descJob && !interviewProcess && !extraBenefit)
    return null

  return (
    <Card
      sx={{ height: 'fit-content', marginTop: (theme) => theme.spacing(2) }}
    >
      <CardHeader
        title={translate('pages.jobs.noteFromLeader')}
        sx={{ textAlign: 'center' }}
      />
      <CardContent>
        <FormProvider methods={methods}>
          <Stack spacing={2}>
            <NoteItem name='note' title={translate('pages.jobs.note')} />
            <NoteItem name='keyword' title={translate('pages.jobs.keyword')} />
            <NoteItem name='descJob' title={translate('pages.jobs.descJob')} />
            <NoteItem
              name='interviewProcess'
              title={translate('pages.jobs.interviewProcess')}
            />
            <NoteItem
              name='extraBenefit'
              title={translate('pages.jobs.extraBenefit')}
            />
          </Stack>
        </FormProvider>
      </CardContent>
    </Card>
  )
}

const NoteItem = ({ name = '', title }) => (
  <Stack spacing={1}>
    <Typography variant='subtitle2'>{title}</Typography>
    <RHFTextField
      name={name}
      multiline
      disabled
      InputProps={{
        inputComponent: TextareaAutosize,
        inputProps: {
          minRows: 3,
        },
      }}
    />
  </Stack>
)

NoteItem.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
}

export default memo(JobDetailNote)
