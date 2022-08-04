// @mui
import { Box, Paper, Skeleton, Stack } from '@mui/material'

// hooks
import useKanban from '@/hooks/useKanban'
// sections
import { CARD_WIDTH } from '@/sections/kanban/config'

export default function SkeletonKanbanColumn() {
  const { kanbanColumn: { lgHeight = 0, xsHeight = 0 } = {} } = useKanban()

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: 'repeat(5, 1fr)',
        overflow: 'hidden',
      }}
    >
      {[...Array(5)].map((_, index) => (
        <Paper
          variant='outlined'
          key={index}
          sx={{
            p: 2.5,
            width: CARD_WIDTH,
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
