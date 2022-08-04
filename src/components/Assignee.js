// @mui
import { Avatar, Stack, Tooltip } from '@mui/material'

import PropTypes from 'prop-types'

// components
import Iconify from '@/components/Iconify'
import { IconButtonAnimate } from '@/components/animate'
import { DOMAIN_SERVER_API } from '@/config'
// hooks
import useLocales from '@/hooks/useLocales'
import useToggle from '@/hooks/useToggle'

//
import ContactsDialog from './ContactsDialog'

Assignee.propTypes = {
  assignee: PropTypes.array,
  listContacts: PropTypes.array,
  hasAddAssignee: PropTypes.bool,
  onToggleAssignee: PropTypes.func,
}

export default function Assignee({
  assignee = [],
  listContacts = [],
  hasAddAssignee = false,
  onToggleAssignee = (x) => x,
}) {
  const {
    toggle: openContacts,
    onOpen: onOpenContacts,
    onClose: onCloseContacts,
  } = useToggle()
  const { translate } = useLocales()

  return (
    <Stack direction='row' flexWrap='wrap' alignItems='center'>
      {assignee.map(({ id, name, avatar, linkAvatar, User }, index) => (
        <Tooltip key={`${id}-${index}`} title={name || User?.name}>
          <Avatar
            alt={name}
            src={`${DOMAIN_SERVER_API}/${avatar || linkAvatar}`}
            sx={{ m: 0.5, width: 36, height: 36 }}
          />
        </Tooltip>
      ))}
      {hasAddAssignee && (
        <Tooltip title={translate('add_assignee')}>
          <IconButtonAnimate
            onClick={onOpenContacts}
            sx={{
              p: 1,
              ml: 0.5,
              border: (theme) => `dashed 1px ${theme.palette.divider}`,
            }}
          >
            <Iconify icon={'eva:plus-fill'} width={20} height={20} />
          </IconButtonAnimate>
        </Tooltip>
      )}

      <ContactsDialog
        open={openContacts}
        onClose={onCloseContacts}
        listContacts={listContacts}
        assignee={assignee}
        onToggleAssignee={onToggleAssignee}
      />
    </Stack>
  )
}
