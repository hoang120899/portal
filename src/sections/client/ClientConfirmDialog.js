import { forwardRef, useCallback, useImperativeHandle, useState } from 'react'

import { Button, Typography } from '@mui/material'

import { useSnackbar } from 'notistack'

import ConfirmDialog from '@/components/ConfirmDialog'
import useLocales from '@/hooks/useLocales'

import { useDeleteClientMutation } from './clientSlice'

function ClientConfirmDialog(props, ref) {
  const { translate } = useLocales()
  const [deleteClient] = useDeleteClientMutation()
  const { enqueueSnackbar } = useSnackbar()

  const [isOpen, setIsOpen] = useState(false)
  const [chosenClient, setChosenClient] = useState({})
  const { name: clientName = '', id: clientId } = chosenClient || {}

  useImperativeHandle(ref, () => ({
    handleToggleConfirmDialog: (chosenClient) => {
      setIsOpen(true)
      setChosenClient(chosenClient)
    },
  }))

  const onCloseConfirm = useCallback(() => {
    setIsOpen(false)
    setChosenClient({})
  }, [setChosenClient, setIsOpen])

  const handleDeleteClient = async () => {
    try {
      const res = await deleteClient(clientId).unwrap()
      const isSuccess = res.data.success
      if (isSuccess) {
        enqueueSnackbar(translate('Delete client success!'))
        return
      }
      enqueueSnackbar(translate('Delete client failed!'), { variant: 'error' })
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' })
    }
  }

  return (
    <ConfirmDialog
      open={isOpen}
      onClose={onCloseConfirm}
      title={
        <Typography>
          Are you sure you want to delete client <strong>{clientName}</strong>?
        </Typography>
      }
      actions={
        <>
          <Button variant='outlined' color='inherit' onClick={onCloseConfirm}>
            {translate('Cancel')}
          </Button>
          <Button
            variant='contained'
            color='error'
            onClick={handleDeleteClient}
          >
            {translate('Delete')}
          </Button>
        </>
      }
    />
  )
}

export default forwardRef(ClientConfirmDialog)
