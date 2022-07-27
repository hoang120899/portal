import { createContext } from 'react'

import PropTypes from 'prop-types'
import { io } from 'socket.io-client'

import { DOMAIN_SERVER_API } from '@/config'

const SocketContext = createContext()
const socket = io(DOMAIN_SERVER_API)

const SocketProvider = ({ children }) => (
  <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
)

SocketProvider.propTypes = {
  children: PropTypes.node,
}

export { SocketContext, SocketProvider }
