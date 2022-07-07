// @mui
import { Box, useTheme } from '@mui/material'

import PropTypes from 'prop-types'

CustomLabel.propTypes = {
  children: PropTypes.node,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  color: PropTypes.string,
  variant: PropTypes.oneOf(['filled', 'outlined', 'ghost']),
  sx: PropTypes.object,
}

export default function CustomLabel({
  children,
  color = 'default',
  startIcon,
  endIcon,
  sx,
}) {
  const style = {
    width: 16,
    height: 16,
    '& svg, img': { width: 1, height: 1, objectFit: 'cover' },
  }
  const theme = useTheme()

  return (
    <Box
      sx={{
        ...(startIcon && { pl: 0.75 }),
        ...(endIcon && { pr: 0.75 }),
        color: '#fff',
        backgroundColor: color,
        fontSize: theme.typography.pxToRem(12),
        alignItems: 'center',
        whiteSpace: 'nowrap',
        display: 'inline-flex',
        justifyContent: 'center',
        fontFamily: theme.typography.fontFamily,
        fontWeight: theme.typography.fontWeightBold,
        minWidth: 22,
        height: 22,
        paddingX: 1,
        borderRadius: '6px',
        ...sx,
      }}
    >
      {startIcon && <Box sx={{ mr: 0.75, ...style }}>{startIcon}</Box>}

      {children}

      {endIcon && <Box sx={{ ml: 0.75, ...style }}>{endIcon}</Box>}
    </Box>
  )
}
