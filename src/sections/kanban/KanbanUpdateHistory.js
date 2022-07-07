// @mui
import { Avatar, Box, Card, CardHeader, Stack, Typography } from '@mui/material'

import PropTypes from 'prop-types'

// components
// utils
import Scrollbar from '@/components/Scrollbar'
import { fDateTime } from '@/utils/formatTime'

// ----------------------------------------------------------------------

KanbanUpdateHistory.propTypes = {
  title: PropTypes.string,
  list: PropTypes.array.isRequired,
}

export default function KanbanUpdateHistory({ title, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} sx={{ p: 2, pb: 0 }} />

      <Scrollbar>
        <Stack spacing={2} sx={{ p: 2, pr: 0 }}>
          {list.map((historyItem) => (
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
          <Typography>{content}</Typography>
          <Typography variant='caption'>{fDateTime(createdAt)}</Typography>
        </Box>
      </Box>
    </>
  )
}
