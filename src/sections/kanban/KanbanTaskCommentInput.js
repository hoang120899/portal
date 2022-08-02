import { useState } from 'react'

// @mui
import {
  Button,
  OutlinedInput,
  Paper,
  Stack,
  TextareaAutosize,
} from '@mui/material'

import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'

import useLocales from '@/hooks/useLocales'

import { useAddCommentMutation } from './kanbanSlice'

KanbanTaskCommentInput.propTypes = {
  cardId: PropTypes.string,
}

export default function KanbanTaskCommentInput({ cardId }) {
  const [comment, setComment] = useState('')
  const enqueueSnackbar = useSnackbar()
  const { translate } = useLocales()

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
          inputprops={{
            inputComponent: TextareaAutosize,
            inputProps: {
              minRows: 1,
            },
          }}
          placeholder={translate('pages.board.typeAMessage')}
          sx={{ '& fieldset': { display: 'none' } }}
          value={comment}
          onChange={handleChangeComment}
        />

        <Stack direction='row' justifyContent='flex-end'>
          <Button variant='contained' onClick={handleCommentChange}>
            {translate('pages.board.comment')}
          </Button>
        </Stack>
      </Paper>
    </Stack>
  )
}
