import { useEffect, useState } from 'react'

import { Box, Button, Dialog, Divider, Stack, Typography } from '@mui/material'

import { useForm } from 'react-hook-form'

import Iconify from '@/components/Iconify'
import { IconButtonAnimate } from '@/components/animate'
import {
  FormProvider,
  RHFBasicSelect,
  RHFDatePicker,
  RHFTextField,
} from '@/components/hook-form'

// const formatDate = (date) => {
//   if (!date) return
//   const arrDate = date.split('/')
//   if (!arrDate) return
//   const [day, month, year] = arrDate
//   const newDate = new Date(`${month}/${day}/${year}`).toISOString()
//   return newDate
// }

export default function WeeklyTaskEditModal({
  isOpen,
  onClose,
  task = [],
  listMember,
}) {
  const [contentTask, setContentTask] = useState([])

  const methods = useForm()
  const { handleSubmit, register } = methods
  // const {fields, remove, append} = useFieldArray({
  //   control,
  //   name: 'content',
  // })

  const onSubmit = async () => {
    try {
      // console.log(data)
    } catch (error) {
      // TODO
    }
  }

  const handleAddContentTask = () => {
    setContentTask([...contentTask, { content: '', percent: '', target: '' }])
  }

  const handleRemoveContentTask = (index) => {
    let newContentTask = [...contentTask]
    if (newContentTask.length > 1) {
      newContentTask.splice(index, 1)
      setContentTask(newContentTask)
    } else {
      return
    }
  }

  useEffect(() => {
    setContentTask(task?.content)
  }, [task])

  return (
    <Dialog fullWidth maxWidth='xs' open={isOpen} onClose={onClose}>
      <Stack spacing={2} sx={{ p: 2.5 }}>
        <Typography
          variant='h6'
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          Edit Task
        </Typography>
        <Divider />
        <Box>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Box
              sx={{
                mb: 2.5,
                gap: 1,
                display: 'flex',
              }}
            >
              <RHFDatePicker name='startDate' {...register('startDate')} />
              <RHFDatePicker name='endDate' {...register('endDate')} />
            </Box>

            <Box sx={{ mb: 2.5 }}>
              <RHFBasicSelect
                label={'Name'}
                name='member'
                options={listMember}
              />
            </Box>

            <IconButtonAnimate onClick={handleAddContentTask}>
              <Iconify icon={'akar-icons:circle-plus'} width={20} height={20} />
            </IconButtonAnimate>
            {contentTask?.map((item, index) => (
              <Box sx={{ display: 'flex', columnGap: 1, mb: 1 }} key={index}>
                <RHFTextField {...register(`content.${index}.content`)} />
                <RHFTextField name='percent' {...register('percent')} />
                <RHFTextField name='target' {...register('target')} />
                <IconButtonAnimate
                  onClick={() => handleRemoveContentTask(index)}
                >
                  <Iconify icon={'clarity:trash-line'} width={20} height={20} />
                </IconButtonAnimate>
              </Box>
            ))}

            <Box>
              <Button type='submit' variant='contained'>
                Save
              </Button>
            </Box>
          </FormProvider>
        </Box>
      </Stack>
    </Dialog>
  )
}
