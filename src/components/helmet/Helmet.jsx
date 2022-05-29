import React from 'react'
import PropTypes from 'prop-types'

const Helmet = props => {
  document.title = `Music App - ${props.title}`
  return (
    <>
      {props.children}
    </>
  )
}

Helmet.propTypes = {}

export default Helmet