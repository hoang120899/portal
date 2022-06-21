import React from 'react'

// @mui
import { MenuItem } from '@mui/material'

import PropTypes from 'prop-types'

import RHFSelect from './RHFSelect'

RHFBasicSelect.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  hasBlankOption: PropTypes.bool,
}

export default function RHFBasicSelect({
  name,
  options = [],
  hasBlankOption = false,
  ...other
}) {
  const styles = {
    mx: 1,
    my: 0.5,
    borderRadius: 0.75,
    typography: 'body2',
  }
  const destOptions = React.useMemo(
    () =>
      options.map((option) => {
        // check object
        if (typeof option === 'object' && option !== null) {
          const { value, displayName } = Object.values(option)
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
      {hasBlankOption && (
        <MenuItem value='' sx={styles}>
          None
        </MenuItem>
      )}
      {destOptions.map((option) => (
        <MenuItem key={option.value} value={option.value} sx={styles}>
          {option.displayName}
        </MenuItem>
      ))}
    </RHFSelect>
  )
}
