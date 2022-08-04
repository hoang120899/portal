import { useEffect, useRef, useState } from 'react'

// @mui
import { Button, ClickAwayListener, OutlinedInput, Paper } from '@mui/material'

// components
import Iconify from '@/components/Iconify'

export default function KanbanColumnAdd() {
  const nameRef = useRef(null)
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      if (nameRef.current) {
        nameRef.current.focus()
      }
    }
  }, [open])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChangeName = (event) => {
    setName(event.target.value)
  }

  const handleCreateColumn = async () => {
    try {
      if (name) {
        setName('')
      }
      handleClose()
    } catch (error) {
      // TODO
    }
  }

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleCreateColumn()
    }
  }

  return (
    <Paper sx={{ minWidth: 280, width: 280 }}>
      {!open && (
        <Button
          fullWidth
          size='large'
          color='inherit'
          variant='outlined'
          startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
          onClick={handleOpen}
        >
          Add section
        </Button>
      )}

      {open && (
        <ClickAwayListener onClickAway={handleCreateColumn}>
          <OutlinedInput
            fullWidth
            placeholder='New section'
            inputRef={nameRef}
            value={name}
            onChange={handleChangeName}
            onKeyUp={handleKeyUp}
            sx={{ typography: 'h6' }}
          />
        </ClickAwayListener>
      )}
    </Paper>
  )
}
