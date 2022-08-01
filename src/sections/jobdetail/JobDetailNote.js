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

JobDetailNote.propTypes = {
  job: PropTypes.object,
}

function JobDetailNote({ job }) {
  const { note, keyword, descJob, interviewProcess, extraBenefit } = job || {}
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
    <Card sx={{ height: 'fit-content', marginTop: '1rem' }}>
      <CardHeader title='Note from leader' sx={{ textAlign: 'center' }} />
      <CardContent>
        <FormProvider methods={methods}>
          <Stack spacing={2}>
            <NoteItem name='note' title='Note' />
            <NoteItem name='keyword' title='Key word' />
            <NoteItem name='descJob' title='Desc job' />
            <NoteItem name='interviewProcess' title='Interview process' />
            <NoteItem name='extraBenefit' title='Extra benefit' />
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
