// next
import dynamic from 'next/dynamic'

// @mui
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import PropTypes from 'prop-types'

import '@/utils/highlight'

//
import EditorToolbar, { formats } from './EditorToolbar'

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => (
    <Box
      sx={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        bgcolor: 'background.paper',
      }}
    >
      Loading...
    </Box>
  ),
})

const RootStyle = styled(Box)(
  ({ theme, ownerState: { invisibleToolbar = false } = {} }) => ({
    overflow: 'hidden',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: `solid 1px ${theme.palette.grey[500_32]}`,
    '& .ql-container.ql-snow': {
      borderColor: 'transparent',
      ...theme.typography.body1,
      fontFamily: theme.typography.fontFamily,
    },
    '& .ql-editor': {
      minHeight: 200,
      maxHeight: 640,
      '&.ql-blank::before': {
        fontStyle: 'normal',
        color: theme.palette.text.disabled,
      },
      '& pre.ql-syntax': {
        ...theme.typography.body2,
        padding: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.grey[900],
      },
    },
    ...(invisibleToolbar && {
      '& .ql-toolbar.ql-snow': {
        display: 'none',
      },
    }),
  })
)

Editor.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.node,
  simple: PropTypes.bool,
  invisibleToolbar: PropTypes.bool,
  sx: PropTypes.object,
}

export default function Editor({
  id = 'minimal-quill',
  error,
  value,
  onChange,
  simple = false,
  invisibleToolbar = false,
  helperText,
  sx,
  ...other
}) {
  const modules = {
    toolbar: {
      container: `#${id}`,
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
    syntax: true,
    clipboard: {
      matchVisual: false,
    },
  }
  const ownerState = {
    invisibleToolbar,
  }

  return (
    <div>
      <RootStyle
        ownerState={ownerState}
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
          }),
          ...sx,
        }}
      >
        <EditorToolbar id={id} isSimple={simple} />
        <ReactQuill
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder='Write something awesome...'
          {...other}
        />
      </RootStyle>

      {helperText && helperText}
    </div>
  )
}
