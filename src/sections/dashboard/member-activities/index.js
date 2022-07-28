import { useRef } from 'react'

// @mui
import { Card, CardHeader } from '@mui/material'

import PropTypes from 'prop-types'

import EmptyContent from '@/components/EmptyContent'
import { DASHBOARD_TABLE_HEIGHT } from '@/config'
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
  const headerRef = useRef(null)
  const {
    data = {},
    isLoading,
    isFetching,
  } = useGetAllMemberLastLoginQuery({
    currentRole,
  })

  const { list: listLastLogin = [] } = data?.data || {}

  const listMemberHeight =
    DASHBOARD_TABLE_HEIGHT - headerRef.current?.offsetHeight - 20

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        ref={headerRef}
        sx={{ pb: 1 }}
      />
      {listLastLogin.length > 0 ? (
        <MemberActivitiesDetails
          list={listLastLogin}
          isLoading={isLoading || isFetching}
          height={listMemberHeight}
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
