import { createContext } from 'react'

import PropTypes from 'prop-types'
import { io } from 'socket.io-client'

const SocketContext = createContext()
const socket = io('http://128.199.85.201:3003' || '')

const SocketProvider = ({ children }) => (
  <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
)

SocketProvider.propTypes = {
  children: PropTypes.node,
}

export { SocketContext, SocketProvider }
