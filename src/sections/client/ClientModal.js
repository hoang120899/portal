import { useEffect } from 'react'

import { Divider, Drawer, Link, Stack, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import PropTypes from 'prop-types'

import CopyClipboard from '@/components/CopyClipboard'
import { useDispatch, useSelector } from '@/redux/store'
import { HANDLE_TYPE } from '@/sections/client/list/config'

import ClientForm from './ClientForm'
import { getShortLink } from './clientSlice'

ClientModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  handleType: PropTypes.string,
  client: PropTypes.object,
  createClient: PropTypes.func,
  updateClient: PropTypes.func,
}

const CustomLink = styled(Link)(() => ({
  textDecoration: 'none',
  cursor: 'pointer',
}))

export default function ClientModal({
  isOpen,
  onClose,
  handleType,
  client,
  createClient,
  updateClient,
}) {
  const dispatch = useDispatch()
  const { shortLink = '' } = useSelector((state) => state.client)
  const isEditScreen = HANDLE_TYPE.EDIT === handleType
  const canEdit = handleType !== HANDLE_TYPE.DETAIL
  const { token } = client

  useEffect(() => {
    if (!isEditScreen) return
    dispatch(getShortLink(token))
  }, [isEditScreen, dispatch, token])

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      anchor='right'
      PaperProps={{ sx: { width: { xs: 1, sm: 480, md: 640 } } }}
    >
      <Stack spacing={2}>
        {isEditScreen && (
          <>
            <Stack
              direction='row'
              justifyContent='space-between'
              sx={{ px: 3, pt: 3 }}
            >
              <Typography sx={{ fontWeight: 'bold' }}>Update client</Typography>
              {shortLink && (
                <CopyClipboard value={shortLink} placement='top-start' arrow>
                  <CustomLink>{shortLink}</CustomLink>
                </CopyClipboard>
              )}
            </Stack>
            <Divider />
          </>
        )}
        <ClientForm
          disabled={!canEdit}
          canEdit={canEdit}
          client={client}
          onClose={onClose}
          createClient={createClient}
          updateClient={updateClient}
        />
      </Stack>
    </Drawer>
  )
}
