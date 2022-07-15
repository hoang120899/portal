// config
import { HEADER } from '@/config'

export default function useOffsetHeightKanban(formRef = null) {
  const { height = 0 } = formRef?.current?.getBoundingClientRect() ?? {}

  return {
    lgHeight: height + 24 + 24 + HEADER.DASHBOARD_DESKTOP_HEIGHT,
    xsHeight: height + 16 + 24 + HEADER.MOBILE_HEIGHT,
  }
}
