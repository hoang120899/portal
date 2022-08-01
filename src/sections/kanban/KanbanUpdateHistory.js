import { useMemo } from 'react'

// @mui
import { Avatar, Box, Card, CardHeader, Stack, Typography } from '@mui/material'

import PropTypes from 'prop-types'

// components
// utils
import Scrollbar from '@/components/Scrollbar'
import { DOMAIN_SERVER_API } from '@/config'
import useLocales from '@/hooks/useLocales'
import { useGetUpdateHistoryQuery } from '@/sections/kanban/kanbanSlice'
import { fDateTime } from '@/utils/formatTime'

import { HISTORY_STATUS } from './config'

// ----------------------------------------------------------------------

KanbanUpdateHistory.propTypes = {
  title: PropTypes.string,
  cardId: PropTypes.string,
  isLight: PropTypes.bool,
}

export default function KanbanUpdateHistory({
  title,
  cardId,
  isLight,
  ...other
}) {
  const { data: historyData } = useGetUpdateHistoryQuery({ cardId })
  const historyList = useMemo(() => {
    if (historyData && historyData.data.historyCard) {
      return historyData.data.historyCard.map((history) => {
        let historyContent
        if (history.type === HISTORY_STATUS.update) {
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
    <Card sx={{ maxHeight: '25rem', overflowY: 'auto' }} {...other}>
      <CardHeader title={title} sx={{ p: 2, pb: 0 }} />

      <Scrollbar>
        <Stack spacing={2} sx={{ p: 2 }}>
          {historyList.map((historyItem) => {
            if (historyItem.content) {
              return (
                <KanbanHistoryItem
                  key={historyItem.id}
                  historyItem={historyItem}
                  isLight={isLight}
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
  isLight: PropTypes.bool,
}

function KanbanHistoryItem({ historyItem, isLight }) {
  const { translate } = useLocales()
  const { User, content, createdAt, type } = historyItem

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          alt={User.name}
          src={`${DOMAIN_SERVER_API}/${User.linkAvatar}`}
        />

        <Box
          sx={{
            minWidth: 240,
            ml: 2,
            '& span:not(:first-child)': {
              opacity: isLight ? 1 : 0.8,
            },
          }}
        >
          <Box>
            <Typography mr={1} sx={{ fontWeight: 'bold' }} component='span'>
              {User.name}
            </Typography>
            {type === HISTORY_STATUS.update && (
              <span>{translate('has update this card')}</span>
            )}
            {type === HISTORY_STATUS.update ? (
              content.map((e, i) => (
                <Typography key={i}>
                  <span>{`${e.path}: `}</span>
                  {e.lhs} <span>{translate('change to')}</span> {e.rhs}
                </Typography>
              ))
            ) : (
              <span>{translate(content)}</span>
            )}
          </Box>
          <Typography variant='caption' sx={{ opacity: '0.5 !important' }}>
            {fDateTime(createdAt)}
          </Typography>
        </Box>
      </Box>
    </>
  )
}
