// import { useState } from 'react'
// @mui
import { Box, Button, Drawer, Grid, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

// components
import Iconify from '@/components/Iconify'
import {
  FormProvider,
  RHFBasicSelect,
  RHFDatePicker,
  RHFMultiCheckbox,
  RHFTextField,
  RHFUploadSingleFile,
} from '@/components/hook-form'

// hooks
// import useToggle from '@/hooks/useToggle'
// utils
// import uuidv4 from '@/utils/uuidv4'

//
// import KanbanContactsDialog from './KanbanContactsDialog'
// import KanbanDatePickerDialog from './KanbanDatePickerDialog'
// import KanbanTaskDisplayTime from './KanbanTaskDisplayTime'

// const defaultTask = {
//   attachments: [],
//   comments: [],
//   description: '',
//   due: [null, null],
//   assignee: [],
// }

KanbanTaskAdd.propTypes = {
  open: PropTypes.bool,
  onAddTask: PropTypes.func,
  onCloseAddTask: PropTypes.func,
}

const jobs = [
  {
    clientName: 'Client 1',
    id: 'j1',
    label: 'Testcronjob',
    locationName: 'Fetch Cầu Giấy',
    value: 'Testcronjob',
  },
  {
    clientName: 'Client 2',
    id: 'j2',
    label: 'Test 2',
    locationName: 'Fetch HCM',
    value: 'test 2',
  },
  {
    clientName: 'Client 3',
    id: 'j3',
    label: 'Test 3',
    locationName: 'Fetch Cầu Giấy',
    value: 'test 3',
  },
]

const CheckboxRootStyle = styled('div')(() => ({
  '& .MuiFormGroup-root': {
    flexDirection: 'row',
  },
}))

export default function KanbanTaskAdd({ open, onAddTask, onCloseAddTask }) {
  const methods = useForm()
  // const [name, setName] = useState('')

  // const [completed, setCompleted] = useState(false)

  // const {
  //   toggle: openContacts,
  //   onOpen: onOpenContacts,
  //   onClose: onCloseContacts,
  // } = useToggle()

  // const {
  //   startTime,
  //   endTime,
  //   onChangeStartTime,
  //   onChangeEndTime,
  //   //
  //   openPicker,
  //   onOpenPicker,
  //   onClosePicker,
  //   //
  //   isSameDays,
  //   isSameMonths,
  // } = useDateRangePicker([null, null])

  // const handleKeyUpAddTask = (event) => {
  //   if (event.key === 'Enter') {
  //     if (name.trim() !== '') {
  //       onAddTask({
  //         ...defaultTask,
  //         id: uuidv4(),
  //         name,
  //         due: [startTime, endTime],
  //         completed,
  //       })
  //     }
  //   }
  // }

  // const handleClickAddTask = () => {
  //   if (name) {
  //     onAddTask({
  //       ...defaultTask,
  //       id: uuidv4(),
  //       name,
  //       due: [startTime, endTime],
  //       completed,
  //     })
  //   }
  //   onCloseAddTask()
  // }

  // const handleChangeCompleted = (event) => {
  //   setCompleted(event.target.checked)
  // }

  return (
    <Drawer
      open={open}
      onClose={onCloseAddTask}
      anchor='right'
      PaperProps={{ sx: { width: { xs: 1, sm: 640 } } }}
    >
      {/* <ClickAwayListener onClickAway={handleClickAddTask}>
        <Paper variant='outlined' sx={{ p: 2 }}>
          <OutlinedInput
            multiline
            size='small'
            placeholder='Task name'
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyUp={handleKeyUpAddTask}
            sx={{
              '& input': { p: 0 },
              '& fieldset': { borderColor: 'transparent !important' },
            }}
          />

          <Stack direction='row' justifyContent='space-between'>
            <Tooltip title='Mark task complete'>
              <Checkbox
                disableRipple
                checked={completed}
                onChange={handleChangeCompleted}
                icon={<Iconify icon={'eva:radio-button-off-outline'} />}
                checkedIcon={
                  <Iconify icon={'eva:checkmark-circle-2-outline'} />
                }
              />
            </Tooltip>

            <Stack direction='row' spacing={1.5} alignItems='center'>
              <Tooltip title='Assign this task' onClick={onOpenContacts}>
                <IconButton size='small'>
                  <Iconify icon={'eva:people-fill'} width={20} height={20} />
                </IconButton>
              </Tooltip>

              <KanbanContactsDialog
                open={openContacts}
                onClose={onCloseContacts}
              />

              {startTime && endTime ? (
                <KanbanTaskDisplayTime
                  startTime={startTime}
                  endTime={endTime}
                  isSameDays={isSameDays}
                  isSameMonths={isSameMonths}
                  onOpenPicker={onOpenPicker}
                />
              ) : (
                <Tooltip title='Add due date'>
                  <IconButton size='small' onClick={onOpenPicker}>
                    <Iconify
                      icon={'eva:calendar-fill'}
                      width={20}
                      height={20}
                    />
                  </IconButton>
                </Tooltip>
              )}

              <KanbanDatePickerDialog
                open={openPicker}
                startTime={startTime}
                endTime={endTime}
                onChangeStartTime={onChangeStartTime}
                onChangeEndTime={onChangeEndTime}
                onClose={onClosePicker}
              />
            </Stack>
          </Stack>
        </Paper>
      </ClickAwayListener> */}
      <Box sx={{ padding: '20px' }}>
        <Box component='header'>
          <Typography variant='h5'>Add Card</Typography>
        </Box>
        <Box>
          <FormProvider onSubmit={onAddTask} methods={methods}>
            <Box sx={{ marginTop: '16px' }}>
              <RHFTextField label='Name' name='name' type='text' required />
            </Box>

            <Box sx={{ marginTop: '16px' }}>
              <RHFBasicSelect
                label='Name job'
                name='nameJob'
                options={jobs}
                required
              />
            </Box>

            <Box sx={{ marginTop: '16px' }}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <RHFTextField
                    label='Location'
                    name='location'
                    type='text'
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <RHFTextField
                    label='Client Name'
                    name='location'
                    type='text'
                    disabled
                  />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ marginTop: '16px' }}>
              <RHFTextField label='Email' name='email' type='text' required />
            </Box>

            <Box sx={{ marginTop: '16px' }}>
              <CheckboxRootStyle>
                <RHFMultiCheckbox
                  name='social'
                  options={[
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Linkedin', value: 'linkedin' },
                    { label: 'Skype', value: 'skype' },
                  ]}
                />
              </CheckboxRootStyle>
              {false && (
                <Box sx={{ marginTop: '16px' }}>
                  <RHFTextField
                    label='Facebook'
                    name='facebook'
                    InputProps={{
                      startAdornment: (
                        <Iconify
                          icon='ant-design:facebook-filled'
                          sx={{ width: 24, height: 24 }}
                        />
                      ),
                    }}
                  />
                </Box>
              )}

              {false && (
                <Box sx={{ marginTop: '16px' }}>
                  <RHFTextField
                    label='Linkedin'
                    name='linkedin'
                    InputProps={{
                      startAdornment: (
                        <Iconify
                          icon='ant-design:linkedin-filled'
                          sx={{ width: 24, height: 24 }}
                        />
                      ),
                    }}
                  />
                </Box>
              )}

              {false && (
                <Box sx={{ marginTop: '16px' }}>
                  <RHFTextField
                    label='Skype'
                    name='skype'
                    InputProps={{
                      startAdornment: (
                        <Iconify
                          icon='ant-design:skype-filled'
                          sx={{ width: 24, height: 24 }}
                        />
                      ),
                    }}
                  />
                </Box>
              )}
            </Box>

            <Box sx={{ marginTop: '16px' }}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <RHFTextField
                    label='Phone'
                    name='phone'
                    type='text'
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <RHFDatePicker label='Approach Date' name='approachDate' />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ marginTop: '16px' }}>
              <RHFTextField label='Position' name='position' />
            </Box>

            <Box sx={{ marginTop: '16px' }}>
              <RHFUploadSingleFile name='uploadCV' />
            </Box>

            <Box sx={{ marginTop: '16px' }}>
              <RHFTextField
                label='Approach Point'
                name='approachPoint'
                required
              />
            </Box>
            <Box sx={{ marginTop: '16px', textAlign: 'right' }}>
              <Button type='submit' variant='contained'>
                Save
              </Button>
              <Button
                type='button'
                sx={{ marginLeft: '8px' }}
                onClick={onCloseAddTask}
              >
                Cancel
              </Button>
            </Box>
          </FormProvider>
        </Box>
      </Box>
    </Drawer>
  )
}
