import { useEffect, useRef, useState } from 'react'

// @mui
import { Card, CardHeader } from '@mui/material'

import PropTypes from 'prop-types'

import EmptyContent from '@/components/EmptyContent'
import useLocales from '@/hooks/useLocales'
import useRole from '@/hooks/useRole'

import MemberActivitiesDetails from './MemberActivitiesDetails'
import { useGetAllMemberLastLoginQuery } from './memberActivitiesSlice'

MemberActivities.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
}

export default function MemberActivities({ title, subheader, ...other }) {
  const { currentRole } = useRole()
  const { translate } = useLocales()
  const [listLastLogin, setListLastLogin] = useState([])
  const headerRef = useRef(null)
  const {
    data = {},
    isLoading,
    isFetching,
  } = useGetAllMemberLastLoginQuery({
    currentRole,
  })

  const { list: listMembers = [] } = data?.data || {}

  // const listMemberHeight =

  useEffect(() => {
    setListLastLogin(listMembers)
  }, [setListLastLogin, listMembers])

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} ref={headerRef} />
      {listLastLogin.length > 0 ? (
        <MemberActivitiesDetails
          list={listLastLogin}
          isLoading={isLoading || isFetching}
        />
      ) : (
        <EmptyContent
          title={translate('No Data')}
          sx={{
            height: 'auto',
            '& span.MuiBox-root': { height: 'auto' },
          }}
        />
      )}
    </Card>
  )
}
