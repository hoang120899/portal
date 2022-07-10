import { useState } from 'react'

// @mui
import { Button, OutlinedInput, Paper, Stack } from '@mui/material'

import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'

import { useAddCommentMutation } from './kanbanSlice'

KanbanTaskCommentInput.propTypes = {
  cardId: PropTypes.string,
}

export default function KanbanTaskCommentInput({ cardId }) {
  const [comment, setComment] = useState('')
  const enqueueSnackbar = useSnackbar()

  const [addComment] = useAddCommentMutation()

  const handleChangeComment = (e) => {
    setComment(e.target.value)
  }

  const handleCommentChange = async () => {
    try {
      await addComment({ cardId, content: comment }).unwrap()
      setComment('')
    } catch (error) {
      enqueueSnackbar('Add comment failed! Please try again.', {
        variant: 'error',
      })
    }
  }

  return (
    <Stack direction='row' spacing={2}>
      <Paper variant='outlined' sx={{ p: 1, flexGrow: 1 }}>
        <OutlinedInput
          fullWidth
          multiline
          rows={1}
          placeholder='Type a message'
          sx={{ '& fieldset': { display: 'none' } }}
          value={comment}
          onChange={handleChangeComment}
        />

        <Stack direction='row' justifyContent='flex-end'>
          <Button variant='contained' onClick={handleCommentChange}>
            Comment
          </Button>
        </Stack>
      </Paper>
    </Stack>
  )
}
