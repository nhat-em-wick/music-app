import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { menuBrowse, menuLibrary } from "../../constant";

import "./sidebar.scss";

const Sidebar = (props) => {
  const location = useLocation();
  const [activeLinkBrowse, setActiveLinkBrowse] = useState(0);
  const [activeLinkLibrary, setActiveLinkLibrary] = useState(null);
  useEffect(() => {
    const currentPath = window.location.pathname.split("/")[1];
    const indexMenuBrowse = menuBrowse.findIndex(
      (item) => item.path === currentPath
    );
    const indexMenuLibrary = menuLibrary.findIndex(
      (item) => item.path === currentPath
    );
    setActiveLinkBrowse(currentPath.length === 0 ? 0 : indexMenuBrowse);
    setActiveLinkLibrary(currentPath.length === 0 ? null : indexMenuLibrary);
  }, [location]);

  const changeThemeRef = useRef(null)
  

  const handleChangeTheme = () => {
    const icon = changeThemeRef.current.querySelector('.change-theme__icon')
    icon.classList.toggle('active')

    props.changeTheme()
  }

  return (
    <>
      <div className={`sidebar`}>
        <div className="sidebar__content">
          <h3 className="sidebar__title">Duyệt qua</h3>
          <ul className="sidebar__list">
            {menuBrowse.map((item, index) => (
              <li
                key={index}
                onClick={
                  props.closeSidebar ? () => props.closeSidebar() : null
                }
                className={`sidebar__item ${
                  index === activeLinkBrowse ? "active" : ""
                }`}
              >
                <Link to={item.path} className="sidebar__link">
                  <span className="sidebar__icon">
                    <i className={item.icon}></i>
                  </span>
                  <span className="sidebar__text">{item.display}</span>
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="sidebar__title">Thư viện</h3>
          <ul className="sidebar__list">
            {menuLibrary.map((item, index) => (
              <li
                key={index}
                onClick={
                  props.closeSidebar ? () => props.closeSidebar() : null
                }
                className={`sidebar__item ${
                  index === activeLinkLibrary ? "active" : ""
                }`}
              >
                <Link to={item.path} className="sidebar__link">
                  <span className="sidebar__icon">
                    <i className={item.icon}></i>
                  </span>
                  <span className="sidebar__text">{item.display}</span>
                </Link>
              </li>
            ))}
          </ul>
          <h3 className="sidebar__title">Giao diện</h3>
          <div ref={changeThemeRef} onClick={() => handleChangeTheme()} className="sidebar__link change-theme">
            <span className="sidebar__icon change-theme__icon">
              
            </span>
            <span className="sidebar__text">
              dark mode
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  closeSlidebar: PropTypes.func,
};

export default Sidebar;
