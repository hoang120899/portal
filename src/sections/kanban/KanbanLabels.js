import React, { memo } from 'react'

import { Box } from '@mui/material'

import PropTypes from 'prop-types'

import IconDelete from '@/assets/icon_delete'
import CustomLabel from '@/components/CustomLabel'

KanbanLabels.propTypes = {
  Job: PropTypes.object,
  Labels: PropTypes.array,
  handleDeleteLabel: PropTypes.func,
  hasAddPermission: PropTypes.bool,
}

function KanbanLabels({ Job, Labels, handleDeleteLabel, hasAddPermission }) {
  return (
    <Box display='flex' flexWrap='wrap'>
      <CustomLabel
        color={Job?.Client?.background}
        sx={{
          margin: '2px',
        }}
        title={Job?.Client?.name}
      >
        {Job?.Client?.name}
      </CustomLabel>

      {Labels.map((label, index) => (
        <CustomLabel
          key={index}
          color={label?.background}
          title={label?.title}
          sx={{
            margin: '2px',
          }}
          endIcon={
            hasAddPermission ? (
              <Box width='10px'>
                <IconDelete
                  fill='#fff'
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteLabel(label)
                  }}
                />
              </Box>
            ) : null
          }
        >
          {label?.title}
        </CustomLabel>
      ))}
    </Box>
  )
}

export default memo(KanbanLabels)
