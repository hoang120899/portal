import { useState } from 'react'

// @mui
import {
  Avatar,
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

// _mock_
import { _contacts } from '@/_mock'
// components
import Iconify from '@/components/Iconify'
import Scrollbar from '@/components/Scrollbar'
import useLocales from '@/hooks/useLocales'

const ITEM_HEIGHT = 64

KanbanContactsDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
}

export default function KanbanContactsDialog({ open, onClose }) {
  const [filterName, setFilterName] = useState('')

  const handleSearchQuery = (event) => {
    setFilterName(event.target.value)
  }

  const dataFiltered = applySortFilter({
    listData: _contacts,
    filterName,
  })
  const { translate } = useLocales()

  return (
    <Dialog fullWidth maxWidth='xs' open={open} onClose={onClose}>
      <Stack spacing={2} sx={{ p: 2.5, pb: 1 }}>
        <Typography variant='h6'>
          {translate('pages.board.contacts')}&nbsp;
          <Typography component='span'>({_contacts.length})</Typography>
        </Typography>

        <TextField
          fullWidth
          value={filterName}
          onChange={handleSearchQuery}
          placeholder={`${translate('pages.board.search')}...`}
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
        {dataFiltered.map((contact) => (
          <MenuItem key={contact.id} onClick={onClose}>
            <ListItemAvatar sx={{ position: 'relative' }}>
              <Avatar src={contact.avatar} />
            </ListItemAvatar>

            <ListItemText
              primaryTypographyProps={{ typography: 'subtitle2', mb: 0.25 }}
              secondaryTypographyProps={{ typography: 'caption' }}
              primary={contact.name}
              secondary={contact.email}
            />
          </MenuItem>
        ))}
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
