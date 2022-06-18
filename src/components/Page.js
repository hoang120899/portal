import { forwardRef } from 'react'

// next
import Head from 'next/head'

// @mui
import { Box } from '@mui/material'

import PropTypes from 'prop-types'

const Page = forwardRef(({ children, title = '', meta, ...other }, ref) => (
  <>
    <Head>
      <title>{`${title} | Minimal-UI`}</title>
      {meta}
    </Head>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
))

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  meta: PropTypes.node,
}

export default Page
