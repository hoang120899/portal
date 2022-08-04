// @mui
import { Dialog, DialogActions, DialogTitle } from '@mui/material'

import PropTypes from 'prop-types'

ConfirmDialog.propTypes = {
  title: PropTypes.node.isRequired,
  subheader: PropTypes.node,
  open: PropTypes.bool,
  actions: PropTypes.node,
  onClose: PropTypes.func,
}

export default function ConfirmDialog({
  title,
  subheader,
  actions,
  open,
  onClose,
}) {
  return (
    <Dialog fullWidth maxWidth='xs' open={open} onClose={onClose}>
      <DialogTitle>
        {title}
        {subheader}
      </DialogTitle>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  )
}
