// config
import { HEADER, ICON, NAVBAR } from '@/config'

export default function useKanban() {
  return {
    kanbanColumn: {
      lgHeight: HEADER.DASHBOARD_DESKTOP_HEIGHT + ICON.NAVBAR_ITEM,
      xsHeight: HEADER.MOBILE_HEIGHT + NAVBAR.DASHBOARD_ITEM_SUB_HEIGHT,
    },
  }
}
