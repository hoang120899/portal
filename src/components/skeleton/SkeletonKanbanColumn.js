// @mui
import { Box, Paper, Skeleton, Stack } from '@mui/material'

import PropTypes from 'prop-types'

// hooks
import useOffsetHeightKanban from '@/hooks/useOffsetHeightKanban'

SkeletonKanbanColumn.propTypes = {
  formRefProp: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
}

export default function SkeletonKanbanColumn(formRefProp) {
  const { lgHeight, xsHeight } = useOffsetHeightKanban(formRefProp)

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: 'repeat(5, 1fr)',
      }}
    >
      {[...Array(5)].map((_, index) => (
        <Paper
          variant='outlined'
          key={index}
          sx={{
            p: 2.5,
            width: 310,
            height: {
              lg: `calc(100vh - ${lgHeight}px)`,
              xs: `calc(100vh - ${xsHeight}px)`,
            },
          }}
        >
          <Stack spacing={2}>
            {[...Array(8)].map((_, skeletonIndex) => (
              <Skeleton
                key={`${index}-${skeletonIndex}`}
                variant='rectangular'
                sx={{ paddingTop: '50%', borderRadius: 1.5 }}
              />
            ))}
          </Stack>
        </Paper>
      ))}
    </Box>
  )
}
