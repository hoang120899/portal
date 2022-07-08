import * as React from 'react'

import propTypes from 'prop-types'

const IconTimer = (props) => (
  <svg
    width={16}
    height={16}
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M4.111 13.82a7 7 0 1 0 7.778-11.64A7 7 0 0 0 4.11 13.82Zm.556-10.809a6 6 0 1 1 6.666 9.978A6 6 0 0 1 4.667 3.01ZM7.5 8.205 10.295 11l.705-.705L8.5 7.79V3.5h-1v4.705Z'
      fill={props.fill || '#000'}
    />
  </svg>
)
IconTimer.propTypes = {
  fill: propTypes.string,
}

export default IconTimer
