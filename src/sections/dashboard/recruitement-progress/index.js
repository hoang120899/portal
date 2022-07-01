// @mui
import { Timeline } from '@mui/lab'
import { Card, CardContent, CardHeader } from '@mui/material'

import PropTypes from 'prop-types'

import RecruitementProgressDetail from './RecruitementProgressDetail'

RecruitementProgress.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
}

export default function RecruitementProgress({ title, subheader, ...other }) {
  const list = [
    {
      name: 'Test1',
      team: 'Team1',
      status: 'Pending',
    },
    {
      name: 'Test2',
      team: 'Team2',
      status: 'Approach',
    },
    {
      name: 'Test3',
      team: 'Team3',
      status: 'Done',
    },
  ]
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <CardContent
        sx={{
          '& .MuiTimelineItem-missingOppositeContent:before': {
            display: 'none',
          },
        }}
      >
        <Timeline>
          {list.map((item, index) => (
            <RecruitementProgressDetail key={index} item={item} />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  )
}
