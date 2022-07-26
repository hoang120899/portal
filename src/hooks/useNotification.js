import { useContext } from 'react'

import { NotificationContext } from '@/contexts/NotificationContext'

const useNotification = () => {
  const context = useContext(NotificationContext)

  if (!context)
    throw new Error(
      'Notification context must be use inside NotificationProvider'
    )

  return context
}

export default useNotification
