import { useMemo } from 'react'

// @mui
import { Avatar, Box, Card, CardHeader, Stack, Typography } from '@mui/material'

import PropTypes from 'prop-types'

// components
// utils
import Scrollbar from '@/components/Scrollbar'
import useLocales from '@/hooks/useLocales'
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
      return historyData.data.historyCard.map((history) => {
        let historyContent
        if (history.type === 'update_card') {
          historyContent = JSON.parse(history.content)
        } else {
          historyContent = history.content
        }
        return {
          User: history.User,
          content: historyContent,
          createdAt: history.createdAt,
          id: history.id,
          type: history.type,
        }
      })
    } else return []
  }, [historyData])

  return (
    <Card {...other}>
      <CardHeader title={title} sx={{ p: 2, pb: 0 }} />

      <Scrollbar>
        <Stack spacing={2} sx={{ p: 2 }}>
          {historyList.map((historyItem) => {
            if (historyItem.content) {
              return (
                <KanbanHistoryItem
                  key={historyItem.id}
                  historyItem={historyItem}
                />
              )
            }
          })}
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
  const { translate } = useLocales()
  const { User, content, createdAt, type } = historyItem

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={User.name} src={User.linkAvatar} />

        <Box sx={{ minWidth: 240, ml: 2 }}>
          <Box>
            <Typography mr={1} sx={{ fontWeight: 'bold' }} component='span'>
              {User.name}
            </Typography>
            {type === 'update_card' && (
              <span>{translate('has update this card')}</span>
            )}
            {type === 'update_card'
              ? content.map((e, i) => (
                  <Typography key={i}>
                    <span>{`${e.path}: `}</span>
                    {e.lhs} <span>{translate('change to')}</span> {e.rhs}
                    {/* {`${e.lhs} => ${e.rhs}`} */}
                  </Typography>
                ))
              : translate(content)}
          </Box>
          <Typography variant='caption'>{fDateTime(createdAt)}</Typography>
        </Box>
      </Box>
    </>
  )
}
