// @mui
import { Button, OutlinedInput, Paper, Stack } from '@mui/material'

export default function KanbanTaskCommentInput() {
  return (
    <Stack direction='row' spacing={2}>
      <Paper variant='outlined' sx={{ p: 1, flexGrow: 1 }}>
        <OutlinedInput
          fullWidth
          multiline
          rows={1}
          placeholder='Type a message'
          sx={{ '& fieldset': { display: 'none' } }}
        />

        <Stack direction='row' justifyContent='flex-end' alignItems='center'>
          <Button variant='contained'>Comment</Button>
        </Stack>
      </Paper>
    </Stack>
  )
}
