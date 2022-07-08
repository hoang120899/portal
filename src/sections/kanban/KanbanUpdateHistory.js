import { useMemo } from 'react'

// @mui
import { Avatar, Box, Card, CardHeader, Stack, Typography } from '@mui/material'

import PropTypes from 'prop-types'

// components
// utils
import Scrollbar from '@/components/Scrollbar'
import { useGetUpdateHistoryQuery } from '@/sections/kanban/kanbanSlice'
import { fDateTime } from '@/utils/formatTime'

// ----------------------------------------------------------------------

KanbanUpdateHistory.propTypes = {
  title: PropTypes.string,
  cardId: PropTypes.string,
}

export default function KanbanUpdateHistory({ title, cardId, ...other }) {
  const { data: historyData } = useGetUpdateHistoryQuery({ cardId })
  const historyList = useMemo(() => {
    if (historyData && historyData.data.historyCard) {
      return historyData.data.historyCard.map((history) => ({
        User: history.User,
        content: history.content,
        createdAt: history.createdAt,
        id: history.id,
      }))
    } else return []
  }, [historyData])

  return (
    <Card {...other}>
      <CardHeader title={title} sx={{ p: 2, pb: 0 }} />

      <Scrollbar>
        <Stack spacing={2} sx={{ p: 2 }}>
          {historyList.map((historyItem) => (
            <KanbanHistoryItem key={historyItem.id} historyItem={historyItem} />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  )
}

// ----------------------------------------------------------------------

KanbanHistoryItem.propTypes = {
  historyItem: PropTypes.object,
}

function KanbanHistoryItem({ historyItem }) {
  const { User, content, createdAt } = historyItem

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={User.name} src={User.linkAvatar}>
          A
        </Avatar>

        <Box sx={{ minWidth: 240, ml: 2 }}>
          <Typography>
            <Typography mr={1} sx={{ fontWeight: 'bold' }} component='span'>
              {User.name}
            </Typography>
            {content}
          </Typography>
          <Typography variant='caption'>{fDateTime(createdAt)}</Typography>
        </Box>
      </Box>
    </>
  )
}
