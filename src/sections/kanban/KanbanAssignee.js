import React, { memo, useState } from 'react'

import { Box } from '@mui/material'

import PropTypes from 'prop-types'

import Assignee from '@/components/Assignee'
import { useDispatch } from '@/redux/store'

import { addAssignee, removeAssignee, useGetUserQuery } from './kanbanSlice'

KanbanAssignee.propTypes = {
  Users: PropTypes.array,
  cardId: PropTypes.string,
  laneId: PropTypes.string,
  cardNotInCol: PropTypes.bool,
  hasAddPermission: PropTypes.bool,
}

function KanbanAssignee({
  Users,
  cardId,
  laneId,
  cardNotInCol = false,
  hasAddPermission,
}) {
  const { data: contactData } = useGetUserQuery()
  const [users, setUsers] = useState(Users)
  const dispatch = useDispatch()

  const onToggleAssignee = async (checked, userId) => {
    const user = contactData.data.list.find((item) => item.id === userId) || {}
    if (checked) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
      dispatch(
        removeAssignee({ ...user, cardId: cardId, laneId: laneId })
      ).then(({ meta }) => {
        if (meta.requestStatus === 'rejected')
          setUsers((prevUsers) => [...prevUsers, user])
      })
    } else {
      setUsers((prevUsers) => [...prevUsers, user])
      dispatch(addAssignee({ ...user, cardId: cardId, laneId: laneId })).then(
        ({ meta }) => {
          if (meta.requestStatus === 'rejected')
            setUsers((prevUsers) =>
              prevUsers.filter((user) => user.id !== userId)
            )
        }
      )
    }
  }

  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <Assignee
        onToggleAssignee={onToggleAssignee}
        assignee={cardNotInCol ? users : Users}
        hasAddAssignee={hasAddPermission}
        listContacts={contactData?.data?.list}
      />
    </Box>
  )
}

export default memo(KanbanAssignee)
