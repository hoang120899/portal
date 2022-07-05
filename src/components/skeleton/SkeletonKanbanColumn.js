// @mui
import { Box, Paper, Skeleton, Stack } from '@mui/material'

export default function SkeletonKanbanColumn() {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: 'repeat(5, 1fr)',
      }}
    >
      {[...Array(5)].map((_, index) => (
        <Paper variant='outlined' key={index} sx={{ p: 2.5, width: 310 }}>
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
