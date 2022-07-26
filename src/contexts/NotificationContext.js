import { createContext, useState } from 'react'

import PropTypes from 'prop-types'

const NotificationContext = createContext()

const NotificationProvider = ({ children }) => {
  const [totalUnreadNoti, setTotalUnreadNoti] = useState(0)

  return (
    <NotificationContext.Provider
      value={{
        totalUnreadNoti,
        setTotalUnreadNoti,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

NotificationProvider.propTypes = {
  children: PropTypes.node,
}

export { NotificationContext, NotificationProvider }
