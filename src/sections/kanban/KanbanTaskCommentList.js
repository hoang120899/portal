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

import PropTypes from 'prop-types'

// components
// utils
import Scrollbar from '@/components/Scrollbar'
import { useGetListCommentQuery } from '@/sections/kanban/kanbanSlice'
import { fDateTime } from '@/utils/formatTime'

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
  const { User, content, updatedAt } = commentItem
  const [isEdit, setIsEdit] = useState(false)
  const [editComment, setEditComment] = useState('')

  const handleOpenEditCommentInput = () => {
    setIsEdit((prev) => !prev)
    setEditComment(commentItem.content)
  }

  const handleCommentChange = (e) => {
    setEditComment(e.target.value)
    setEditComment('')
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={User.name} src={User.linkAvatar}>
          A
        </Avatar>

        <Box ml={2} sx={{ flex: '1' }}>
          {isEdit ? (
            <TextField
              label='Edit Comment'
              value={editComment}
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

          <Button onClick={handleOpenEditCommentInput}>
            {isEdit ? 'Cancel' : 'Edit'}
          </Button>
          {isEdit && <Button>Save</Button>}
        </Box>
      </Box>
    </>
  )
}
