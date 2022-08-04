// config
import { PAGES, ROLE_BY_PAGES } from '@/config'

export const getRolesByPage = (pageName = '') =>
  ROLE_BY_PAGES.find((val) => val.pageNames.includes(pageName))?.roles || []

export const getListRoles = () =>
  Object.values(PAGES).reduce(
    (prev, acc) => ({ ...prev, [acc]: getRolesByPage(acc) }),
    {}
  )
