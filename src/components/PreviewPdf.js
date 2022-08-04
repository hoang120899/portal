import { useMemo } from 'react'

import { Box, DialogTitle, Divider } from '@mui/material'

import { Viewer, Worker } from '@react-pdf-viewer/core'
import { toolbarPlugin } from '@react-pdf-viewer/toolbar'
import PropTypes from 'prop-types'

import { DialogAnimate } from '@/components/animate'
import useLocales from '@/hooks/useLocales'
import { base64toBlob } from '@/utils/pdf'

PreviewPdf.propTypes = {
  fileUrl: PropTypes.string,
  base64: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
}

export default function PreviewPdf({
  fileUrl,
  base64,
  isOpen = false,
  onClose,
  ...other
}) {
  const { translate } = useLocales()
  const toolbarPluginInstance = toolbarPlugin()
  const { Toolbar } = toolbarPluginInstance

  const url = useMemo(() => {
    if (fileUrl) return fileUrl
    if (!base64) return ''
    return URL.createObjectURL(base64toBlob(base64))
  }, [fileUrl, base64])

  return (
    <DialogAnimate open={isOpen} onClose={onClose} maxWidth='md' {...other}>
      <DialogTitle sx={{ mb: 1 }}>{translate('Preview pdf')}</DialogTitle>
      <Divider />

      <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.js'>
        <Box px={2} py={2}>
          <Toolbar>
            {(slots) => {
              const {
                CurrentPageInput,
                Download,
                EnterFullScreen,
                GoToNextPage,
                GoToPreviousPage,
                NumberOfPages,
                Print,
                Zoom,
                ZoomIn,
                ZoomOut,
              } = slots
              return (
                <div
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                    width: '100%',
                    background: 'rgb(238, 238, 238)',
                    padding: '8px',
                  }}
                >
                  <div style={{ padding: '0px 2px' }}>
                    <ZoomOut />
                  </div>
                  <div style={{ padding: '0px 2px' }}>
                    <Zoom />
                  </div>
                  <div style={{ padding: '0px 2px' }}>
                    <ZoomIn />
                  </div>
                  <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                    <GoToPreviousPage />
                  </div>
                  <div style={{ padding: '0px 2px', width: '4rem' }}>
                    <CurrentPageInput />
                  </div>
                  <div style={{ padding: '0px 2px' }}>
                    / <NumberOfPages />
                  </div>
                  <div style={{ padding: '0px 2px' }}>
                    <GoToNextPage />
                  </div>
                  <div style={{ padding: '0px 2px', marginLeft: 'auto' }}>
                    <EnterFullScreen />
                  </div>
                  <div style={{ padding: '0px 2px' }}>
                    <Download />
                  </div>
                  <div style={{ padding: '0px 2px' }}>
                    <Print />
                  </div>
                </div>
              )
            }}
          </Toolbar>
          <Box
            sx={{
              height: 'calc(100vh - 200px)',
              overflowY: 'auto',
              border: '1px solid rgba(0, 0, 0, 0.1)',
            }}
          >
            <Viewer fileUrl={url} plugins={[toolbarPluginInstance]} />
          </Box>
        </Box>
      </Worker>
    </DialogAnimate>
  )
}
