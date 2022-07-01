// @mui
import { Card, CardHeader } from '@mui/material'

import PropTypes from 'prop-types'

import MemberActivitiesDetails from './MemberActivitiesDetails'

MemberActivities.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
}

export default function MemberActivities({ title, subheader, ...other }) {
  const list = [...Array(5).keys()].map((value, index) => ({
    avatar: `https://minimal-assets-api-dev.vercel.app/assets/images/avatars/avatar_${
      index + 1
    }.jpg`,
    name: `Name ${index + 1}`,
    email: `Email${index}@gmail.com`,
  }))

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <MemberActivitiesDetails list={list} />
    </Card>
  )
}
