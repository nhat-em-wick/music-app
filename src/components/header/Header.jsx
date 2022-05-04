import React, { useState, useRef, useEffect, memo } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

import "./header.scss";
import user from "../../assets/images/download.jpeg";
const Header = ({ onActiveSidebar }) => {
  
  const [showSearchMobile, setShowSearchMobile] = useState(false)
  const searchMobileRef = useRef(null)

  const handleShowSearchMobile = () => {
    setShowSearchMobile(!showSearchMobile)
    searchMobileRef.current.focus()
  }

  return (
    <>
      <div className="header">
        <div className="header__left">
          <div
            className="header__menu"
            onClick={onActiveSidebar}
          >
            <div className="header__hamburger--toggle"></div>
          </div>
          <a className="header__logo">
            <div className="header__animate">
              <span className="wave"></span>
              <span className="wave"></span>
              <span className="wave"></span>
              <span className="wave"></span>
              <span className="wave"></span>
              <span className="wave"></span>
              <span className="wave"></span>
            </div>
            <h1 className="header__title">Music App</h1>
          </a>
        </div>
        <div className="header__center">
          <div className="header__search">
            <input
              type="search"
              name="search"
              placeholder="Tìm kiếm..."
              className="header__input"
            />
            <span className="header__search__icon">
              <i className="bx bx-search"></i>
            </span>
          </div>
          <span onClick={() => handleShowSearchMobile()} className="header__icon-search--toggle">
            <i className="bx bx-search"></i>
          </span>
          <div className={`header__search-mobile ${showSearchMobile ? 'active' : ''}`}>
            <input
              ref={searchMobileRef}
              type="search"
              name="search"
              placeholder="Tìm kiếm..."
              className="header__search-mobile__input"
            />
            <span onClick={() => handleShowSearchMobile()}  className="header__search-mobile__icon">
              <i className="bx bx-x"></i>
            </span>
          </div>
        </div>
        <div className="header__right">
          <div className="header__auth">
            <Link to='dang-nhap' className="header__login">
              Đăng nhập
            </Link>
            <Link to='dang-ki' className="header__register">
              Đăng kí
            </Link>
          </div>
          <div className="header__no-user-mobile">
            <i className='bx bxs-user'></i>
          </div>
          {/* <div className="header__user">
            <span className="header__user__icon">
              <i className="bx bx-chevron-down"></i>
            </span>
            <span className="header__user-name">Nhat Nguyen</span>
            <div className="header__avatar">
              <img src={user} alt="" />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

Header.propTypes = {
  activeSidebar: PropTypes.func
};

export default memo(Header);
