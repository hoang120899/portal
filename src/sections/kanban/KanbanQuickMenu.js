// @mui
import { Box, Divider, IconButton } from '@mui/material'

import PropTypes from 'prop-types'

// components
import Iconify from '@/components/Iconify'
import MenuPopover from '@/components/MenuPopover'

KanbanQuickMenu.propTypes = {
  actions: PropTypes.node,
  open: PropTypes.object,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  onBack: PropTypes.func,
  title: PropTypes.string,
}

export default function KanbanQuickMenu({
  actions,
  open,
  onClose,
  onOpen,
  title,
  onBack,
}) {
  return (
    <>
      <IconButton onClick={onOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={onClose}
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
            {title || 'title'}
          </Box>
          <IconButton
            onClick={onBack}
            sx={{
              position: 'absolute',
              top: '12px',
              left: '8px',
            }}
          >
            <Iconify icon='eva:arrow-back-outline' width={20} height={20} />
          </IconButton>
          <Divider />
          {actions}
        </>
      </MenuPopover>
    </>
  )
}
