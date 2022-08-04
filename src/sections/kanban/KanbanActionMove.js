import React from 'react'

import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'

import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import { FormProvider, RHFBasicSelect } from '@/components/hook-form'
import useLocales from '@/hooks/useLocales'

import { moveCard } from './kanbanSlice'

KanbanActionMove.propTypes = {
  laneId: PropTypes.string,
  sourceId: PropTypes.string,
  cardId: PropTypes.string,
}

function KanbanActionMove({ laneId, sourceId, cardId }) {
  const listColumnName = useSelector((state) => state.kanban.listColumnName)
  const { translate } = useLocales()
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()

  const defaultValues = {
    laneId: laneId,
  }

  const methods = useForm({
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (data) => {
    data = { ...data, sourceId: sourceId, cardId: cardId }
    await dispatch(moveCard(data))
    enqueueSnackbar('Move card success')
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          marginTop: '1rem',
        }}
      >
        <RHFBasicSelect
          label='Name column'
          name='laneId'
          options={listColumnName}
        />
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

export default KanbanActionMove
