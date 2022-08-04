import React from 'react'

import { Button, Stack } from '@mui/material'

import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import useLocales from '@/hooks/useLocales'

import { storageCard } from './kanbanSlice'

KanbanActionStorage.propTypes = {
  laneId: PropTypes.string,
  cardId: PropTypes.string,
}

function KanbanActionStorage({ cardId, laneId }) {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { translate } = useLocales()

  const handleStorage = async () => {
    const data = { cardId: cardId, laneId: laneId }
    await dispatch(storageCard(data))
    enqueueSnackbar(translate('pages.board.storageSuccess'))
  }

  return (
    <Stack sx={{ alignItems: 'center', textAlign: 'center' }}>
      {translate('pages.board.confirmStorage')}?
      <Button
        size='small'
        variant='contained'
        sx={{ width: 'fit-content', marginY: '24px' }}
        onClick={handleStorage}
      >
        {translate('pages.board.save')}
      </Button>
    </Stack>
  )
}

export default KanbanActionStorage
