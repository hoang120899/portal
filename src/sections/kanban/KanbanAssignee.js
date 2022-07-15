import React, { memo } from 'react'

import { Box } from '@mui/material'

import PropTypes from 'prop-types'

import Assignee from '@/components/Assignee'
import { useDispatch } from '@/redux/store'

import { addAssignee, removeAssignee, useGetUserQuery } from './kanbanSlice'

KanbanAssignee.propTypes = {
  Users: PropTypes.array,
  cardId: PropTypes.string,
  laneId: PropTypes.string,
}

function KanbanAssignee({ Users, cardId, laneId }) {
  const { data: contactData } = useGetUserQuery()
  const dispatch = useDispatch()
  const onToggleAssignee = async (checked, userId) => {
    const user = contactData.data.list.find((item) => item.id === userId) || {}
    if (checked) {
      dispatch(removeAssignee({ ...user, cardId: cardId, laneId: laneId }))
    } else {
      dispatch(addAssignee({ ...user, cardId: cardId, laneId: laneId }))
    }
  }
  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <Assignee
        onToggleAssignee={onToggleAssignee}
        assignee={Users}
        hasAddAssignee
        listContacts={contactData?.data?.list}
      />
    </Box>
  )
}

export default memo(KanbanAssignee)
