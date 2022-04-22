import React from 'react'
import PropTypes from 'prop-types'

import './section.scss'
const Section = props => {
  return (
    <>
      <section className="section">
        {props.children}
      </section>
    </>
  )
}

export const SectionTitle = props => (
  <h2 className="section-title">
    {props.title}
  </h2>
)

Section.propTypes = {}
SectionTitle.propTypes= {
  title: PropTypes.string
}
export default Section