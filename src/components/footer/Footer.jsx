import React from 'react'
import PropTypes from 'prop-types'

import './footer.scss'
const Footer = props => {
  return (
    <div className={`footer ${props.shrink ? 'shrink' : ''}`}>
      <div className="footer-text">
        &copy; Copyright 2021
      </div>
    </div>
  )
}

Footer.propTypes = {}

export default Footer