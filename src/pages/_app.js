// next
import App from 'next/app'
import Head from 'next/head'

import cookie from 'cookie'
import PropTypes from 'prop-types'
// lazy image
import 'react-lazy-load-image-component/src/effects/black-and-white.css'
import 'react-lazy-load-image-component/src/effects/blur.css'
import 'react-lazy-load-image-component/src/effects/opacity.css'
// scroll bar
import 'simplebar/src/simplebar.css'

// components
import ProgressBar from '@/components/ProgressBar'
import MotionLazyContainer from '@/components/animate/MotionLazyContainer'
import ThemeSettings from '@/components/settings'
// contexts
import { CollapseDrawerProvider } from '@/contexts/CollapseDrawerContext'
import { SettingsProvider } from '@/contexts/SettingsContext'
// theme
import ThemeProvider from '@/theme'
// utils
import { getSettings } from '@/utils/getSettings'

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
  settings: PropTypes.object,
}

export default function MyApp(props) {
  const { Component, pageProps, settings } = props

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      <CollapseDrawerProvider>
        <SettingsProvider defaultSettings={settings}>
          <MotionLazyContainer>
            <ThemeProvider>
              <ThemeSettings>
                <ProgressBar />
                {getLayout(<Component {...pageProps} />)}
              </ThemeSettings>
            </ThemeProvider>
          </MotionLazyContainer>
        </SettingsProvider>
      </CollapseDrawerProvider>
    </>
  )
}

MyApp.getInitialProps = async (context) => {
  const appProps = await App.getInitialProps(context)

  const cookies = cookie.parse(
    context.ctx.req ? context.ctx.req.headers.cookie || '' : document.cookie
  )

  const settings = getSettings(cookies)

  return {
    ...appProps,
    settings,
  }
}
