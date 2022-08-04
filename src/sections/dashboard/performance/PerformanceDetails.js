// @mui
import { Avatar, Box, Stack, Typography } from '@mui/material'

import PropTypes from 'prop-types'

import Scrollbar from '@/components/Scrollbar'
import { DOMAIN_SERVER_API } from '@/config'
import useLocales from '@/hooks/useLocales'

PerformanceDetails.propTypes = {
  list: PropTypes.array.isRequired,
}

export default function PerformanceDetails({ list = [] }) {
  const { translate } = useLocales()
  return (
    <Scrollbar sx={{ height: { xs: '345px !important' } }}>
      <Stack spacing={1} sx={{ p: 3 }}>
        {list.map(({ idTeam, memberTeam, name, total }) => {
          if (!total) return

          return (
            <Stack alignItems='left' key={idTeam}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant='subtitle2' sx={{ mb: 0.5 }} noWrap>
                  {name}
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ color: 'text.secondary' }}
                  noWrap
                >
                  {`${total} ${translate('CV')}`}
                </Typography>
              </Box>

              <Stack>
                {memberTeam.map(
                  ({ linkAvatar = '', name = '', totalCv = 0 }, index) => (
                    <Stack
                      direction='row'
                      key={index}
                      spacing={2}
                      sx={{ p: 1 }}
                    >
                      <Avatar
                        src={`${DOMAIN_SERVER_API}/${linkAvatar}`}
                        sx={{ width: 48, height: 48 }}
                      />

                      <Box>
                        <Typography
                          variant='subtitle2'
                          sx={{ mb: 0.5, overflow: 'hidden' }}
                          noWrap
                        >
                          {name}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          flexGrow: 1,
                          textAlign: 'right',
                          overflow: 'hidden',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <Typography variant='subtitle2' sx={{ mb: 0.5 }} noWrap>
                          {translate('CV')}
                        </Typography>
                        <Typography
                          variant='body2'
                          sx={{ color: 'text.secondary' }}
                          noWrap
                        >
                          {totalCv}
                        </Typography>
                      </Box>
                    </Stack>
                  )
                )}
              </Stack>
            </Stack>
          )
        })}
      </Stack>
    </Scrollbar>
  )
}
