import React, { useState, useRef, useEffect, memo } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import FilterSearch from "../filter-search/FilterSearch";

import "./header.scss";
import user from "../../assets/images/download.jpeg";
const Header = ({ onActiveSidebar }) => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
  });
  const [showSearchMobile, setShowSearchMobile] = useState(false);

  const handleShowSearchMobile = () => {
    setShowSearchMobile(!showSearchMobile);
  };

  const handleFilterChange = (newFilter) => {
    setFilters({
      ...filters,
      q: newFilter.q,
    });
  };

  useEffect(() => {
    // console.log("call api: ", filters);
  }, [filters]);

  return (
    <>
      <div className="header">
        <div className="header__left">
          <div className="header__menu" onClick={onActiveSidebar}>
            <div className={`header__hamburger--toggle`}>
              <span className="line"></span>
            </div>
          </div>
          <Link to="/" className="header__logo">
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
          </Link>
        </div>
        <div className="header__center">
          <div className="header__search">
            <FilterSearch
              onSubmit={handleFilterChange}
              activeMobile={showSearchMobile}
              onClose={handleShowSearchMobile}
            />
          </div>
        </div>
        <div className="header__right">
          <div className="header__auth">
            <Link to="dang-nhap" className="header__login">
              Đăng nhập
            </Link>
            <Link to="dang-ki" className="header__register">
              Đăng kí
            </Link>
          </div>
          <div className="header__no-user-mobile">
            <i className="bx bxs-user"></i>
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
  activeSidebar: PropTypes.func,
};

export default memo(Header);
