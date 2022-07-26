// import React from 'react'

// // @mui
// import {
//   TimelineConnector,
//   TimelineContent,
//   TimelineDot,
//   TimelineItem,
//   TimelineSeparator,
// } from '@mui/lab'
// import { Box, Stack, TableCell, TableRow, Typography } from '@mui/material'
// import { styled } from '@mui/material/styles'

// import PropTypes from 'prop-types'

// const TimelineSeparatorStyle = styled(TimelineSeparator)(() => ({
//   padding: '10px 0',
// }))

// const TimelineConnectorStyle = styled(TimelineConnector)(() => ({
//   width: '4px',
// }))

// const TimelineContentStyle = styled(TimelineContent)(() => ({
//   padding: '8px 10px',
// }))

// const ColorPreview = styled(Box)(() => ({
//   display: 'flex',
// }))

// export default function RecruitmentProgressTableRow({ row }) {
//   return (
//     <TableRow hover>
//       <TableCell align='left' sx={{py: '2px'}}>
//         <Box sx={{
//           '& .MuiTimelineItem-missingOppositeContent:before': {
//             display: 'none',
//           },
//         }}>
//           <TimelineItem>
//             <TimelineSeparatorStyle>
//               <TimelineConnectorStyle />
//             </TimelineSeparatorStyle>

//             <TimelineContentStyle>
//               <Typography variant='subtitle2'>name</Typography>

//               <Typography variant='caption' sx={{ color: 'text.secondary' }}>
//                 team
//               </Typography>
//             </TimelineContentStyle>
//           </TimelineItem>
//         </Box>
//       </TableCell>
//       <TableCell align='left'>
//         <ColorPreview component='span'>
//           <TimelineDot color='primary' />
//           <Typography variant='subtitle2' sx={{ mt: '6px', ml: '4px' }}>
//             status
//           </Typography>
//         </ColorPreview>
//       </TableCell>
//     </TableRow>
//   )
// }
