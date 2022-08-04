import * as React from 'react'

import propTypes from 'prop-types'

const IconDelete = (props) => (
  <svg
    width={15}
    height={15}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 15 15'
    {...props}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M.872 1.138a1.194 1.194 0 0 1 1.66.045l11.321 11.704a1.13 1.13 0 0 1-.046 1.623 1.194 1.194 0 0 1-1.66-.046L.825 2.761a1.13 1.13 0 0 1 .046-1.623Z'
      fill='#fff'
    />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M13.995 1.317a1.13 1.13 0 0 1 0 1.624L2.345 14.33a1.194 1.194 0 0 1-1.662 0 1.13 1.13 0 0 1 0-1.624l11.651-11.39a1.194 1.194 0 0 1 1.661 0Z'
      fill='#fff'
    />
  </svg>
)
IconDelete.propTypes = {
  fill: propTypes.string,
}

export default IconDelete
