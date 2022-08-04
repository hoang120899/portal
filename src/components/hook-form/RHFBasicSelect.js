import React from 'react'

// @mui
import { Divider, MenuItem } from '@mui/material'

import PropTypes from 'prop-types'

import RHFSelect from './RHFSelect'

RHFBasicSelect.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  hasBlankOption: PropTypes.bool,
}

const styles = {
  mx: 1,
  my: 0.5,
  borderRadius: 0.75,
  typography: 'body2',
}

export default function RHFBasicSelect({
  name,
  options = [],
  hasBlankOption = false,
  ...other
}) {
  const destOptions = React.useMemo(
    () =>
      options.map((option) => {
        // check object
        if (typeof option === 'object' && option !== null) {
          const { value, label: displayName } = option
          return {
            value,
            displayName,
          }
        }
        return {
          value: option,
          displayName: option,
        }
      }),
    [options]
  )

  const render = React.useMemo(
    () =>
      [
        hasBlankOption && (
          <MenuItem
            key='blank_default_option'
            value=''
            sx={{
              fontStyle: 'italic',
              color: 'text.secondary',
              ...styles,
            }}
          >
            None
          </MenuItem>
        ),
        hasBlankOption && <Divider key='divider' />,
        destOptions.map((option) => (
          <MenuItem key={option.value} value={option.value} sx={styles}>
            {option.displayName}
          </MenuItem>
        )),
      ].filter(Boolean),
    [hasBlankOption, destOptions]
  )

  return (
    <RHFSelect
      name={name}
      SelectProps={{
        MenuProps: {
          sx: { '& .MuiPaper-root': { maxHeight: 260 } },
        },
      }}
      {...other}
    >
      {render}
    </RHFSelect>
  )
}
