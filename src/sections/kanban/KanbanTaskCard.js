import { useState } from 'react'

// @mui
import { Box, Stack, Typography } from '@mui/material'

import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'

// components
import Iconify from '@/components/Iconify'
import Image from '@/components/Image'
import useLocales from '@/hooks/useLocales'

//
import KanbanTaskDetails from './KanbanTaskDetails'

KanbanTaskCard.propTypes = {
  card: PropTypes.object,
  index: PropTypes.number,
  onDeleteTask: PropTypes.func,
}

export default function KanbanTaskCard({ card, onDeleteTask, index }) {
  const { labels = ['label test'], Users, Job, Candidate } = card
  const [openDetails, setOpenDetails] = useState(false)

  const handleOpenDetails = () => {
    setOpenDetails(true)
  }

  const handleCloseDetails = () => {
    setOpenDetails(false)
  }

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <KanbanTaskDetails
            card={card}
            isOpen={openDetails}
            onClose={handleCloseDetails}
            onDeleteTask={() => onDeleteTask(card.id)}
          />
          <UserDetail
            handleOpenDetails={handleOpenDetails}
            Candidate={Candidate}
            title={Job.title}
            Users={Users}
            labels={labels}
          />
        </div>
      )}
    </Draggable>
  )
}
UserDetail.propTypes = {
  handleOpenDetails: PropTypes.func,
  Candidate: PropTypes.object,
  title: PropTypes.string,
  Users: PropTypes.array,
  labels: PropTypes.array,
}
function UserDetail({ Candidate, title, Users, labels, handleOpenDetails }) {
  const { translate } = useLocales()
  return (
    <Stack
      spacing={2}
      sx={{
        p: 2,
        background: 'white',
        boxShadow: '0 1px 0 rgb(9 30 66 / 25%)',
      }}
      onClick={(e) => {
        e.stopPropagation()
        handleOpenDetails()
      }}
    >
      {labels.map((label, index) => (
        <Box
          key={index}
          sx={{
            backgroundColor: '#871e03',
            borderRadius: '4px',
            px: 1,
            color: 'white',
            width: 'fit-content',
            fontWeight: 'bold',
          }}
        >
          {translate(label)}
        </Box>
      ))}
      <Typography variant='h5'>{Candidate?.name}</Typography>
      <Typography variant='subtitle2' color='#777'>
        {title}
      </Typography>
      <Box
        display={'Grid'}
        alignItems={'center'}
        gridTemplateColumns='60px 1fr'
      >
        <Typography variant='subtitle2' fontWeight={'bold'}>
          {translate('Email')}:
        </Typography>
        <Typography
          variant='subtitle2'
          align='right'
          color='#777'
          sx={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {Candidate?.email}
        </Typography>
        <Typography variant='subtitle2' fontWeight={'bold'}>
          {translate('Phone')}:
        </Typography>
        <Typography variant='subtitle2' align='right' color='#777'>
          {Candidate?.phone}
        </Typography>
        <Typography variant='subtitle2' fontWeight={'bold'}>
          {translate('Position')}:
        </Typography>
        <Typography align='right' variant='subtitle2' color='#777'>
          {Candidate?.position}
        </Typography>
      </Box>
      <Box display='flex' alignItems='center'>
        {Users.map((user) => (
          <Box key={user.id} mx='4px'>
            {/* user.linkAvatar || */}
            <Image
              src={'/assets/avatarDefault.png'}
              alt={user.name}
              sx={{ width: '34px', height: '34px', borderRadius: '50%' }}
            />
          </Box>
        ))}
        <Box
          mx='4px'
          backgroundColor='#f5f5f5'
          borderRadius='50%'
          width={34}
          height={34}
          p='4px'
        >
          <Iconify icon={'eva:plus-fill'} width={26} height={26} />
        </Box>
      </Box>
    </Stack>
  )
}
