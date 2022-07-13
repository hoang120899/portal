// config
import { HEADER, ICON } from '@/config'

import useGetBoundingClientRect from './useGetBoundingClientRect'

export default function useKanban({ formRef }) {
  const { height = 0 } = useGetBoundingClientRect(formRef)

  return {
    kanbanColumn: {
      lgHeight: height + HEADER.MAIN_DESKTOP_HEIGHT + ICON.NAVBAR_ITEM,
      xsHeight:
        height + HEADER.MOBILE_HEIGHT + HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    },
  }
}
