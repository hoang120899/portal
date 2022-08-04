import { useContext } from 'react'

//
import { SocketContext } from '@/contexts/SocketContext'

const useSocket = () => {
  const context = useContext(SocketContext)

  if (!context)
    throw new Error('Socket context must be use inside SocketProvider')

  return context
}

export default useSocket
