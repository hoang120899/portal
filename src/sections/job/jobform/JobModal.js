import { memo, useState } from 'react'

import { Divider, Drawer } from '@mui/material'

import PropTypes from 'prop-types'

import JobForm from './JobForm'

JobModal.propTypes = {
  isOpen: PropTypes.bool,
  isEdit: PropTypes.bool,
  onClose: PropTypes.func,
  job: PropTypes.object,
  onSubmit: PropTypes.func,
}

function JobModal({ isOpen, isEdit, onClose, job, onSubmit }) {
  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = (e) => {
    if (e.target.scrollTop <= 10) {
      setIsScrolled(false)
    } else {
      setIsScrolled(true)
    }
  }

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      anchor='right'
      PaperProps={{
        sx: { width: { xs: 1, sm: 560, md: 700 } },
        onScroll: handleScroll,
      }}
    >
      <Divider />
      <JobForm
        onClose={onClose}
        isEdit={isEdit}
        job={job}
        onEditSubmit={onSubmit}
        isScrolled={isScrolled}
      />
    </Drawer>
  )
}

export default memo(JobModal)
