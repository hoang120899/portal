// // @mui
// import { Timeline } from '@mui/lab'
// import { Card, CardContent, CardHeader } from '@mui/material'

// import PropTypes from 'prop-types'

// import BasicTable from '@/components/BasicTable'
// import Pagination from '@/components/Pagination'
// import useRole from '@/hooks/useRole'
// import useTable from '@/hooks/useTable'

// import RecruitementProgressDetail from './RecruitementProgressDetail'
// import RecruitmentProgressTableRow from './RecruitmentProgressTableRow'
// import { COLUMNS, TABLE_COLUMNS } from './config'
// import { useGetAllRecruitmentProgressQuery } from './recruitmentProgressSlice'
// import { useEffect } from 'react'

// RecruitementProgress.propTypes = {
//   title: PropTypes.string,
//   subheader: PropTypes.string,
// }

// export default function RecruitementProgress({ title, subheader, ...other }) {
//   const { page, rowsPerPage, setPage, onChangePage, onChangeRowsPerPage } =
//     useTable({ defaultRowsPerPage: 5 })
//   const { currentRole } = useRole()
//   const { data, isLoading, isFetching } = useGetAllRecruitmentProgressQuery({
//     pageSize: rowsPerPage,
//     pageNumber: page + 1,
//     currentRole,
//   })

//   const { list: listRecruitmentProgress = [], total: totalRecord = 0 } =
//     data?.data || {}
//   const columns = TABLE_COLUMNS

//   const tableRowComp = (row, index) => (
//     <RecruitmentProgressTableRow key={row?.id || index} row={row} />
//   )

//   console.log(listRecruitmentProgress)
//   const list = [
//     {
//       name: 'Test1',
//       team: 'Team1',
//       status: 'Pending',
//     },
//     {
//       name: 'Test2',
//       team: 'Team2',
//       status: 'Approach',
//     },
//     {
//       name: 'Test3',
//       team: 'Team3',
//       status: 'Done',
//     },
//   ]

//   useEffect(() => {
//     setPage(0)
//   }, [setPage])

//   return (
//     <Card {...other}>
//       <CardHeader title={title} subheader={subheader} />

//       <BasicTable
//         columns={[]}
//         page={page}
//         rowsPerPage={rowsPerPage}
//         dataSource={listRecruitmentProgress}
//         isLoading={isLoading || isFetching}
//         TableRowComp={tableRowComp}
//         tableStyle={{marginTop: '10px', maxHeight: '370px', overflow: 'hidden'}}
//       />

//       <Pagination
//         totalRecord={totalRecord}
//         page={page}
//         rowsPerPage={rowsPerPage}
//         onChangePage={onChangePage}
//         onChangeRowsPerPage={onChangeRowsPerPage}
//       />

//       {/* <CardContent
//         sx={{
//           '& .MuiTimelineItem-missingOppositeContent:before': {
//             display: 'none',
//           },
//         }}
//       >
//         <Timeline>
//           {list.map((item, index) => (
//             <RecruitementProgressDetail key={index} item={item} />
//           ))}
//         </Timeline>
//       </CardContent> */}
//     </Card>
//   )
// }
