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
  TextareaAutosize,
  Typography,
} from '@mui/material'

import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'

import Scrollbar from '@/components/Scrollbar'
import { DOMAIN_SERVER_API } from '@/config'
import useAuth from '@/hooks/useAuth'
import useLocales from '@/hooks/useLocales'
import { useGetListCommentQuery } from '@/sections/kanban/kanbanSlice'
import { fDateTime } from '@/utils/formatTime'

import { useEditCommentMutation } from './kanbanSlice'

KanbanCommentList.propTypes = {
  title: PropTypes.string,
  cardId: PropTypes.string,
  isLight: PropTypes.bool,
}

export default function KanbanCommentList({
  title,
  cardId,
  isLight,
  ...other
}) {
  const { data: commentData } = useGetListCommentQuery(cardId)

  const commentList = useMemo(() => {
    const listCommentData = commentData?.data?.list || []
    if (!listCommentData.length) return []
    return listCommentData.map(({ id, User, content, userId, updatedAt }) => ({
      id,
      User,
      content,
      userId,
      updatedAt,
    }))
  }, [commentData])

  return (
    <Card sx={{ maxHeight: '25rem', overflowY: 'auto' }} {...other}>
      <CardHeader title={title} sx={{ p: 2, pb: 0 }} />

      <Scrollbar>
        <Stack spacing={2} sx={{ p: 2 }}>
          {commentList.map((commentItem) => (
            <KanbanCommentItem
              key={commentItem.id}
              commentItem={commentItem}
              isLight={isLight}
            />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  )
}

KanbanCommentItem.propTypes = {
  commentItem: PropTypes.object,
  isLight: PropTypes.bool,
}

function KanbanCommentItem({ commentItem, isLight }) {
  const { User, content, updatedAt, userId, id } = commentItem
  const { translate } = useLocales()
  const { user } = useAuth()
  const enqueueSnackbar = useSnackbar()
  const [isEdit, setIsEdit] = useState(false)
  const [comment, setComment] = useState('')

  const [editComment] = useEditCommentMutation()

  const saveText = useMemo(() => {
    if (isEdit) return translate('pages.board.cancel')
    return translate('pages.board.edit')
  }, [isEdit, translate])

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
      enqueueSnackbar(translate('pages.board.addCommentFailed'), {
        variant: 'error',
      })
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          alt={User.name}
          src={`${DOMAIN_SERVER_API}/${User.linkAvatar}`}
        />

        <Box ml={2} sx={{ flex: '1' }}>
          {isEdit ? (
            <TextField
              label={translate('pages.board.editComment')}
              value={comment}
              fullWidth
              multiline
              InputProps={{
                inputComponent: TextareaAutosize,
                inputProps: {
                  minRows: 1,
                },
              }}
              onChange={handleCommentChange}
            />
          ) : (
            <>
              <Stack
                direction='column'
                sx={{
                  '& p:not(:first-of-type)': {
                    opacity: isLight ? 1 : 0.8,
                  },
                }}
              >
                <Typography mr={1} sx={{ fontWeight: 'bold' }}>
                  {User.name}
                </Typography>
                <Typography>{content}</Typography>
              </Stack>
              <Typography variant='caption' sx={{ opacity: '0.5' }}>
                {fDateTime(updatedAt)}
              </Typography>
            </>
          )}

          {user.userId === userId && (
            <Button onClick={handleOpenEditCommentInput}>{saveText}</Button>
          )}
          {isEdit && (
            <Button onClick={handleEditComment}>
              {translate('pages.board.save')}
            </Button>
          )}
        </Box>
      </Box>
    </>
  )
}
