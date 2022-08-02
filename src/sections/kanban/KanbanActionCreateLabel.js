import React, { useEffect, useMemo, useState } from 'react'

import { LoadingButton } from '@mui/lab'
import { Box, Stack } from '@mui/material'

import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { FormProvider, RHFBasicSelect } from '@/components/hook-form'
import useLocales from '@/hooks/useLocales'

import { useGetLabelQuery } from './kanbanSlice'
import { createLabel } from './kanbanSlice'

KanbanActionCreateLabel.propTypes = {
  cardId: PropTypes.string,
  laneId: PropTypes.string,
  labels: PropTypes.array,
  setOpenMenuActions: PropTypes.func,
}

function KanbanActionCreateLabel({
  cardId,
  laneId,
  labels,
  setOpenMenuActions,
}) {
  const { data: labelData } = useGetLabelQuery()
  const { translate } = useLocales()
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const [background, setBackground] = useState('')

  const labelOptions = useMemo(() => {
    if (labelData) {
      return labelData.data.list.filter(Boolean).map((label) => ({
        value: label.title,
        label: label.title,
        background: label.background,
      }))
    }
    return []
  }, [labelData])
  const defaultValues = {
    label: '',
  }

  const methods = useForm({
    defaultValues,
  })
  const labelWatch = methods.watch('label')

  useEffect(() => {
    if (labelWatch) {
      setBackground(
        labelOptions?.find((item) => item.label === labelWatch)?.background ||
          '#fff'
      )
    }
  }, [labelWatch, labelOptions])

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async () => {
    if (!labelWatch || !background) {
      enqueueSnackbar(translate('pages.board.selectLabel'), {
        variant: 'error',
      })
      return
    }

    const data = {
      title: labelWatch,
      background: background,
      candidateJobId: cardId,
      laneId: laneId,
    }

    const isExist = labels.find(
      (item) =>
        item.background === background &&
        item.candidateJobId === data.candidateJobId &&
        item.title === data.title
    )

    if (isExist) {
      enqueueSnackbar(translate('pages.board.labelExist'), {
        variant: 'error',
      })
      return
    }
    // wait for loading
    await dispatch(createLabel(data))
    setOpenMenuActions(null)
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          marginTop: '1rem',
        }}
      >
        <RHFBasicSelect label='Name' name='label' options={labelOptions} />
        <Stack direction='row' sx={{ marginTop: '16px', paddingLeft: '2px' }}>
          {translate('pages.board.background')}:
          <Box
            sx={{
              width: '46px',
              height: '24px',
              marginLeft: '1rem',
              padding: '5px',
              border: '1px solid #eee',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                background: background,
              }}
            />
          </Box>
        </Stack>
        <LoadingButton
          fullWidth
          type='submit'
          variant='contained'
          loading={isSubmitting}
          sx={{ marginY: '1rem' }}
        >
          {translate('pages.board.save')}
        </LoadingButton>
      </Box>
    </FormProvider>
  )
}

export default KanbanActionCreateLabel
