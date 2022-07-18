import { useEffect, useState } from 'react'

// @mui
import { IconButton, InputAdornment, TextField, Tooltip } from '@mui/material'

import { useSnackbar } from 'notistack'
import PropTypes from 'prop-types'
import { CopyToClipboard } from 'react-copy-to-clipboard'

//
import Iconify from './Iconify'

CopyClipboard.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
}

const INPUT_TYPE = {
  TEXTFIELD: 'textfield',
}

export default function CopyClipboard({
  value,
  type,
  title = 'Click to copy',
  children,
  ...other
}) {
  const { enqueueSnackbar } = useSnackbar()
  const [state, setState] = useState({
    value,
    copied: false,
  })

  useEffect(() => {
    setState({ value, copied: false })
  }, [value])

  const handleChange = (event) => {
    setState({ value: event.target.value, copied: false })
  }

  const onCopy = () => {
    setState({ ...state, copied: true })
    if (state.value) {
      enqueueSnackbar('Copied to clipboard!')
    }
  }

  if (type === INPUT_TYPE.TEXTFIELD) {
    return (
      <TextField
        fullWidth
        value={state.value}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <CopyToClipboard text={state.value} onCopy={onCopy}>
                <Tooltip title={title}>
                  <IconButton>
                    <Iconify icon={'eva:copy-fill'} width={24} height={24} />
                  </IconButton>
                </Tooltip>
              </CopyToClipboard>
            </InputAdornment>
          ),
        }}
        {...other}
      />
    )
  }

  return (
    <CopyToClipboard text={state.value} onCopy={onCopy}>
      <Tooltip title={title} {...other}>
        {children}
      </Tooltip>
    </CopyToClipboard>
  )
}
