import React from 'react'

import { Skeleton } from '@mui/material'

export default function SkeletonTableDashboard() {
  return (
    <>
      <Skeleton animation='wave' sx={{ height: 36, width: '100%' }} />
      <Skeleton animation='wave' sx={{ height: 36, width: '100%' }} />
      <Skeleton animation='wave' sx={{ height: 36, width: '100%' }} />
      <Skeleton animation='wave' sx={{ height: 36, width: '100%' }} />
      <Skeleton animation='wave' sx={{ height: 36, width: '100%' }} />
    </>
  )
}
