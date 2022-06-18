import { useEffect } from 'react'

// @mui
import { alpha, styled } from '@mui/material/styles'

import { AnimatePresence, m } from 'framer-motion'

//
import { varFade } from '@/components/animate'
import { NAVBAR } from '@/config'
import cssStyles from '@/utils/cssStyles'

const RootStyle = styled(m.div)(({ theme }) => ({
  ...cssStyles(theme).bgBlur({
    color: theme.palette.background.paper,
    opacity: 0.92,
  }),
  top: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  position: 'fixed',
  overflow: 'hidden',
  width: NAVBAR.BASE_WIDTH,
  flexDirection: 'column',
  margin: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  zIndex: theme.zIndex.drawer + 3,
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  boxShadow: `-24px 12px 32px -4px ${alpha(
    theme.palette.mode === 'light'
      ? theme.palette.grey[500]
      : theme.palette.common.black,
    0.16
  )}`,
}))

export default function SettingsDrawer() {
  const varSidebar = varFade({
    distance: NAVBAR.BASE_WIDTH,
    durationIn: 0.32,
    durationOut: 0.32,
  }).inLeft

  useEffect(() => {
    document.body.style.overflow = ''
  }, [])

  return (
    <>
      <AnimatePresence>
        {false && <RootStyle {...varSidebar} />}
      </AnimatePresence>
    </>
  )
}
