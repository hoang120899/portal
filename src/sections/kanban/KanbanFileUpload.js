import { Button, Stack, TextField } from '@mui/material'

import { useSnackbar } from 'notistack'
// @prop-types
import PropTypes from 'prop-types'

import CopyClipboard from '@/components/CopyClipboard'
import Iconify from '@/components/Iconify'
import { RHFTextField } from '@/components/hook-form'
import { MAX_SIZE_FILEIMAGE } from '@/config'
import useLocales from '@/hooks/useLocales'
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
  watch: PropTypes.func,
}

export default function KanbanFileUpload({
  label,
  nameTextField,
  idJob,
  hasAddPermission,
  setValue,
  watch,
}) {
  const { enqueueSnackbar } = useSnackbar()
  const { translate } = useLocales()
  const handleUploadFile = async (e) => {
    const name = watch('name')
    const nameJob = watch('nameJob')

    if (!name || !nameJob) {
      enqueueSnackbar(translate('pages.board.warningFill'), {
        variant: 'info',
      })
      return
    }

    const file = e.target.files[0]

    if (file.size > MAX_SIZE_FILEIMAGE) {
      enqueueSnackbar(`${translate('pages.board.fileTooBig')}!`, {
        variant: 'info',
      })
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
      enqueueSnackbar(translate('pages.board.failedUpload'), {
        variant: 'error',
      })
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
          <Iconify icon={'bxs:cloud-upload'} width={32} height={32} />
        </Button>
      </label>

      {watch(nameTextField) && (
        <CopyClipboard value={watch(nameTextField)} placement='top-start' arrow>
          <Button>
            <Iconify icon={'fluent:copy-16-regular'} width={32} height={32} />
          </Button>
        </CopyClipboard>
      )}
    </Stack>
  )
}
