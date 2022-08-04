import { useMemo } from 'react'

// @mui
import { CssBaseline } from '@mui/material'
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
} from '@mui/material/styles'

import PropTypes from 'prop-types'

// hooks
import useSettings from '@/hooks/useSettings'

//
import breakpoints from './breakpoints'
import componentsOverride from './overrides'
import palette from './palette'
import shadows, { customShadows } from './shadows'
import typography from './typography'

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default function ThemeProvider({ children }) {
  const { themeMode, themeDirection } = useSettings()

  const isLight = themeMode === 'light'

  const themeOptions = useMemo(
    () => ({
      palette: isLight ? palette.light : palette.dark,
      typography,
      breakpoints,
      shape: { borderRadius: 8 },
      direction: themeDirection,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight, themeDirection]
  )

  const theme = createTheme(themeOptions)

  theme.components = componentsOverride(theme)

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  )
}
