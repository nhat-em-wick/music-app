import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './404.scss'
const Page404 = props => {

  return (
    <div className="page-error">
      <div className="page-error__content">
        <h2 className="page-error__title">404</h2>
        <h4 className="page-error__description">Không tìm thấy trang mà bạn yêu cầu</h4>
        <Link to="/" className="page-error__link">Quay lại trang chủ</Link>
      </div>
    </div>
  )
}

Page404.propTypes = {}

export default Page404