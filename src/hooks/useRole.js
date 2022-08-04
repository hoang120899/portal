import { useContext } from 'react'

//
import { RoleContext } from '@/contexts/RoleContext'

const useRole = () => {
  const context = useContext(RoleContext)

  if (!context) throw new Error('Role context must be use inside RoleProvider')

  return context
}

export default useRole
