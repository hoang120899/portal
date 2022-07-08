import { Fragment } from 'react'

import { Button, TextField } from '@mui/material'

// @prop-types
import PropTypes from 'prop-types'

import Iconify from '@/components/Iconify'
import { RHFTextField } from '@/components/hook-form'

// import { _postApi } from '@/utils/axios'

KanbanFileUpload.propTypes = {
  name: PropTypes.string,
  nameJob: PropTypes.string,
  idJob: PropTypes.string,
  linkCv: PropTypes.string,
  hasAddPermission: PropTypes.bool,
  setValue: PropTypes.func,
}

export default function KanbanFileUpload({
  name,
  nameJob,
  idJob,
  hasAddPermission,
  linkCv,
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
      //   console.log(formData)
      //   try {
      //     const res = await _postApi('/api/cards/upload/cv', formData)
      //     console.log(res)
      //   } catch (error) {
      //     console.log(error)
      //   }
    }
  }

  return (
    <Fragment>
      <RHFTextField
        type='text'
        label='Link CV'
        name='linkCv'
        value={linkCv}
        disabled
      />
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
    </Fragment>
  )
}
