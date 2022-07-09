import { Button, Stack, TextField } from '@mui/material'

// @prop-types
import PropTypes from 'prop-types'

import Iconify from '@/components/Iconify'
import { RHFTextField } from '@/components/hook-form'
import { API_UPLOAD_LINK } from '@/routes/api'
import { _postApi } from '@/utils/axios'

KanbanFileUpload.propTypes = {
  label: PropTypes.string,
  nameTextField: PropTypes.string,
  name: PropTypes.string,
  nameJob: PropTypes.string,
  idJob: PropTypes.string,
  linkCv: PropTypes.string,
  hasAddPermission: PropTypes.bool,
  setValue: PropTypes.func,
}

export default function KanbanFileUpload({
  label,
  nameTextField,
  name,
  nameJob,
  idJob,
  hasAddPermission,
  setValue,
}) {
  const handleUploadFile = async (e) => {
    if (name === '' || nameJob === '') {
      // TODO: Load toast message
      return
    } else {
      const file = e.target.files[0]
      if (file.size > 5145728) {
        // TODO: Load toast message
        return
      }
      const formData = new FormData()
      formData.append('file', file)
      formData.append('nameFile', `${name} ${nameJob}`)
      formData.append('idJob', `${idJob}`)
      try {
        const res = await _postApi(API_UPLOAD_LINK, formData)
        setValue(nameTextField, res.fileName)
      } catch (error) {
        // TODO: Handle error
      }
    }
  }

  return (
    <Stack direction='row' sx={{ alignItems: 'center' }}>
      <RHFTextField type='text' label={label} name={nameTextField} disabled />
      <input id='file-upload' type='file' hidden />
      <label>
        <Button component='div' disabled={!hasAddPermission}>
          <TextField
            type='file'
            sx={{ display: 'none' }}
            onChange={handleUploadFile}
            disabled={!hasAddPermission}
          />
          <Iconify icon={'ant-design:upload-outlined'} width={32} height={32} />
        </Button>
      </label>
    </Stack>
  )
}
