import { createContext } from 'react'

import PropTypes from 'prop-types'
import { io } from 'socket.io-client'

const SocketContext = createContext()
const socket = io(process.env.NEXT_PUBLIC_HOST_API_KEY || '')

const SocketProvider = ({ children }) => (
  <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
)

SocketProvider.propTypes = {
  children: PropTypes.node,
}

export { SocketContext, SocketProvider }
