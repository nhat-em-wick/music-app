import React from 'react'
import PropTypes from 'prop-types'

import './loading-skeleton.scss'
const LoadingSkeleton = props => {
  return (
    <div
      style={props.style}
    className="skeleton">

    </div>
  )
}

LoadingSkeleton.propTypes = {}

export default LoadingSkeleton