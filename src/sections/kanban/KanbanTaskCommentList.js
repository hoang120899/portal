import { useMemo, useState } from 'react'

// @mui
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'

// components
// utils
import Scrollbar from '@/components/Scrollbar'
import useAuth from '@/hooks/useAuth'
import useLocales from '@/hooks/useLocales'
import { useGetListCommentQuery } from '@/sections/kanban/kanbanSlice'
import { fDateTime } from '@/utils/formatTime'

import { useEditCommentMutation } from './kanbanSlice'

// ----------------------------------------------------------------------

KanbanCommentList.propTypes = {
  title: PropTypes.string,
  cardId: PropTypes.string,
}

export default function KanbanCommentList({ title, cardId, ...other }) {
  const { data: commentData } = useGetListCommentQuery(cardId)

  const commentList = useMemo(() => {
    if (commentData && commentData.data.list) {
      return commentData.data.list.map((comment) => ({
        id: comment.id,
        User: comment.User,
        content: comment.content,
        userId: comment.userId,
        updatedAt: comment.updatedAt,
      }))
    } else {
      return []
    }
  }, [commentData])

  return (
    <Card {...other}>
      <CardHeader title={title} sx={{ p: 2, pb: 0 }} />

      <Scrollbar>
        <Stack spacing={2} sx={{ p: 2 }}>
          {commentList.map((commentItem) => (
            <KanbanCommentItem key={commentItem.id} commentItem={commentItem} />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  )
}

// ----------------------------------------------------------------------

KanbanCommentItem.propTypes = {
  commentItem: PropTypes.object,
}

function KanbanCommentItem({ commentItem }) {
  const { User, content, updatedAt, userId, id } = commentItem
  const { translate } = useLocales()
  const { user } = useAuth()
  const enqueueSnackbar = useSnackbar()
  const [isEdit, setIsEdit] = useState(false)
  const [comment, setComment] = useState('')

  const [editComment] = useEditCommentMutation()

  const handleOpenEditCommentInput = () => {
    setIsEdit((prev) => !prev)
    setComment(commentItem.content)
  }

  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }

  const handleEditComment = async () => {
    try {
      await editComment({ id, content: comment }).unwrap()
      setComment('')
      setIsEdit(false)
    } catch (error) {
      enqueueSnackbar('Add comment failed! Please try again.', {
        variant: 'error',
      })
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={User.name} src={User.linkAvatar} />

        <Box ml={2} sx={{ flex: '1' }}>
          {isEdit ? (
            <TextField
              label={translate('Edit Comment')}
              value={comment}
              fullWidth
              multiline
              rows={1}
              onChange={handleCommentChange}
            />
          ) : (
            <>
              <Stack direction='row'>
                <Typography mr={1} sx={{ fontWeight: 'bold' }}>
                  {User.name}
                </Typography>
                <Typography>{content}</Typography>
              </Stack>
              <Typography variant='caption'>{fDateTime(updatedAt)}</Typography>
            </>
          )}

          {user.userId === userId && (
            <Button onClick={handleOpenEditCommentInput}>
              {isEdit ? translate('Cancel') : translate('Edit')}
            </Button>
          )}
          {isEdit && (
            <Button onClick={handleEditComment}>{translate('Save')}</Button>
          )}
        </Box>
      </Box>
    </>
  )
}
