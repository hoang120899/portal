// @mui
import { useState } from 'react'

import { Box, Divider, IconButton, MenuItem } from '@mui/material'

import PropTypes from 'prop-types'

// components
import Iconify from '@/components/Iconify'
import MenuPopover from '@/components/MenuPopover'
import useLocales from '@/hooks/useLocales'

import KanbanActionCreateLabel from './KanbanActionCreateLabel'
import KanbanActionMove from './KanbanActionMove'
import KanbanActionStorage from './KanbanActionStorage'
import { ACTION_STATUS } from './config'

KanbanQuickMenu.propTypes = {
  laneId: PropTypes.string,
  cardId: PropTypes.string,
  Labels: PropTypes.array,
  hasAddPermission: PropTypes.bool,
}

export default function KanbanQuickMenu({
  laneId,
  cardId,
  Labels = [],
  hasAddPermission,
}) {
  const [actions, setActions] = useState('actions')
  const { translate } = useLocales()
  const [openMenu, setOpenMenuActions] = useState(null)

  const configAction = () => {
    switch (actions) {
      case ACTION_STATUS.MOVE:
        return (
          <KanbanActionMove laneId={laneId} sourceId={laneId} cardId={cardId} />
        )
      case ACTION_STATUS.LABEL:
        return (
          <KanbanActionCreateLabel
            cardId={cardId}
            labels={Labels}
            setOpenMenuActions={setOpenMenuActions}
            laneId={laneId}
          />
        )
      case ACTION_STATUS.STORAGE:
        return <KanbanActionStorage cardId={cardId} laneId={laneId} />
      default:
        return (
          <>
            {hasAddPermission && (
              <MenuItem
                onClick={() => {
                  setActions(ACTION_STATUS.MOVE)
                }}
              >
                {translate('pages.board.moveCard')}
              </MenuItem>
            )}
            <MenuItem
              onClick={() => {
                setActions(ACTION_STATUS.STORAGE)
              }}
            >
              {translate('pages.board.storageCard')}
            </MenuItem>
            {hasAddPermission && (
              <MenuItem
                onClick={() => {
                  setActions(ACTION_STATUS.LABEL)
                }}
              >
                {translate('pages.board.createLabel')}
              </MenuItem>
            )}
          </>
        )
    }
  }

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget)
    setActions('')
  }

  const handleCloseMenu = () => {
    setOpenMenuActions(null)
  }

  const handleOnback = () => {
    if (actions && actions !== 'actions') {
      setActions('actions')
    } else {
      setOpenMenuActions(null)
    }
  }

  return (
    <>
      <IconButton onClick={handleOpenMenu}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(openMenu)}
        anchorEl={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow='right-top'
        sx={{
          mt: -1,
          width: '15rem',
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
            '& svg': { mr: 2, width: 20, height: 20 },
          },
          position: 'relative',
        }}
      >
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingY: '12px',
            }}
          >
            {actions || 'actions'}
          </Box>

          <IconButton
            onClick={handleOnback}
            sx={{
              position: 'absolute',
              top: '12px',
              left: '8px',
            }}
          >
            <Iconify icon='eva:arrow-back-outline' width={20} height={20} />
          </IconButton>
          <Divider />
          {configAction()}
        </>
      </MenuPopover>
    </>
  )
}
