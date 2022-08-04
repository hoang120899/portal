import { useEffect } from 'react'

// @mui
import { useTheme } from '@mui/material/styles'

// emotion
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import PropTypes from 'prop-types'
// rtl
import rtlPlugin from 'stylis-plugin-rtl'

ThemeRtlLayout.propTypes = {
  children: PropTypes.node,
}

export default function ThemeRtlLayout({ children }) {
  const theme = useTheme()

  useEffect(() => {
    document.dir = theme.direction
  }, [theme.direction])

  const cacheRtl = createCache({
    key: theme.direction === 'rtl' ? 'rtl' : 'css',
    stylisPlugins: theme.direction === 'rtl' ? [rtlPlugin] : [],
  })

  return <CacheProvider value={cacheRtl}>{children}</CacheProvider>
}
