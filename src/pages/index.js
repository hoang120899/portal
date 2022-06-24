import { useEffect } from 'react'

import { useRouter } from 'next/router'

// config
import { PATH_AFTER_LOGIN } from '@/config'
// hook
import useRole from '@/hooks/useRole'
// routes
import { PATH_DASHBOARD } from '@/routes/paths'

export default function Index() {
  const { pathname, replace, prefetch } = useRouter()
  const { isAdminRole } = useRole()

  useEffect(() => {
    if (pathname !== PATH_DASHBOARD.root) return
    if (isAdminRole) {
      replace(PATH_DASHBOARD.task.root)
      return
    }
    replace(PATH_AFTER_LOGIN)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, isAdminRole])

  useEffect(() => {
    prefetch(PATH_AFTER_LOGIN)
    prefetch(PATH_DASHBOARD.task.root)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
