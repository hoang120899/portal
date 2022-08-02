import { useCallback, useState } from 'react'

// @mui
import {
  Avatar,
  Checkbox,
  Dialog,
  InputAdornment,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

import PropTypes from 'prop-types'

// components
import Iconify from '@/components/Iconify'
import Scrollbar from '@/components/Scrollbar'
import { DOMAIN_SERVER_API } from '@/config'
// hooks
import useLocales from '@/hooks/useLocales'

const ITEM_HEIGHT = 64

ContactsDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  listContacts: PropTypes.array,
  assignee: PropTypes.array,
  onToggleAssignee: PropTypes.func,
}

export default function ContactsDialog({
  open,
  onClose,
  listContacts = [],
  assignee = [],
  onToggleAssignee,
}) {
  const { translate } = useLocales()
  const [filterName, setFilterName] = useState('')

  const handleSearchQuery = (event) => {
    setFilterName(event.target.value)
  }

  const dataFiltered = applySortFilter({
    listData: listContacts,
    filterName,
  })

  const checkSelectedUser = useCallback(
    (userId) => assignee.some((user) => userId === user.id),
    [assignee]
  )

  const onToggleMenuItem = (userId) => () => {
    const checked = checkSelectedUser(userId)
    onToggleAssignee(checked, userId)
  }

  return (
    <Dialog fullWidth maxWidth='xs' open={open} onClose={onClose}>
      <Stack spacing={2} sx={{ p: 2.5, pb: 1 }}>
        <Typography variant='h6'>
          {`${translate('contacts')} `}
          <Typography component='span'>({listContacts.length})</Typography>
        </Typography>

        <TextField
          fullWidth
          value={filterName}
          onChange={handleSearchQuery}
          placeholder='Search...'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Iconify
                  icon={'eva:search-fill'}
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Scrollbar
        sx={{
          height: ITEM_HEIGHT * 6,
          p: 1,
          '& .MuiMenuItem-root': {
            px: 1.5,
            height: ITEM_HEIGHT,
            borderRadius: 0.75,
          },
        }}
      >
        {dataFiltered.map(({ id, avatar, linkAvatar, name, email }, index) => {
          const checked = checkSelectedUser(id)

          return (
            <MenuItem key={`${id}-${index}`} onClick={onToggleMenuItem(id)}>
              <ListItemAvatar sx={{ position: 'relative' }}>
                <Avatar src={`${DOMAIN_SERVER_API}/${avatar || linkAvatar}`} />
              </ListItemAvatar>

              <ListItemText
                primaryTypographyProps={{ typography: 'subtitle2', mb: 0.25 }}
                secondaryTypographyProps={{ typography: 'caption' }}
                primary={name}
                secondary={email}
                sx={{ flexGrow: 1 }}
              />
              <Checkbox checked={checked} disabled={!checked} />
            </MenuItem>
          )
        })}
      </Scrollbar>
    </Dialog>
  )
}

function applySortFilter({ listData, filterName }) {
  if (filterName) {
    listData = listData.filter(
      (item) =>
        item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.email.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    )
  }

  return listData
}
