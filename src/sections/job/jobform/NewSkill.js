import { memo, useState } from 'react'

import { Button, Stack, TextField, Typography } from '@mui/material'

import { useSnackbar } from 'notistack'

import Iconify from '@/components/Iconify'
import useLocales from '@/hooks/useLocales'
import { useCreateSkillMutation } from '@/sections/job/jobSlice'

function NewSkill() {
  const { translate } = useLocales()
  const [isOpen, setIsOpen] = useState(false)
  const [skill, setSkill] = useState('')
  const { enqueueSnackbar } = useSnackbar()
  const [createSkill] = useCreateSkillMutation()

  const handleToggleAddNewSkill = () => {
    setIsOpen((prevState) => !prevState)
  }

  const handleOnChangeSkill = (e) => {
    setSkill(e.target.value)
  }

  const handleAddSkill = async () => {
    try {
      await createSkill({ skill }).unwrap()
      setSkill('')
      enqueueSnackbar(translate('pages.jobs.addSkillSuccess'))
    } catch (error) {
      enqueueSnackbar(translate('pages.jobs.failedToAddSkill'), {
        variant: 'error',
      })
    }
  }

  return (
    <>
      <Stack direction='row' alignItems='center' pt={2}>
        <Typography variant='span'>
          {translate('pages.jobs.addSkillText')}
        </Typography>
        <Button
          onClick={handleToggleAddNewSkill}
          sx={{
            minWidth: 'fit-content',
          }}
        >
          <Iconify icon={'eva:plus-fill'} width={20} height={20} />
        </Button>
      </Stack>

      {isOpen && (
        <Stack direction='row' pt={1} spacing={2}>
          <TextField
            label={translate('pages.jobs.addNewSkill')}
            value={skill}
            onChange={handleOnChangeSkill}
          />
          <Button variant='outlined' onClick={handleAddSkill}>
            {translate('pages.jobs.add')}
          </Button>
        </Stack>
      )}
    </>
  )
}

export default memo(NewSkill)
