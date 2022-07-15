// @mui
import { Card, CardHeader } from '@mui/material'

import PropTypes from 'prop-types'

import ApplicantsDetails from './ApplicantsDetails'

Applicants.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
}

export default function Applicants({ title, subheader, ...other }) {
  const list = [...Array(5).keys()].map((value, index) => ({
    name: `Name ${index + 1}`,
    email: `Email${index}@gmail.com`,
  }))

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <ApplicantsDetails list={list} />
    </Card>
  )
}
