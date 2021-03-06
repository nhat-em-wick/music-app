import React, { useEffect, useState, useRef, memo } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { menuBrowse, menuLibrary } from "../../constant";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "../../redux/theme/ThemeSlice";
import "./sidebar.scss";

const Sidebar = (props) => {
  const location = useLocation();
  const [activeLinkBrowse, setActiveLinkBrowse] = useState(0);
  const [activeLinkLibrary, setActiveLinkLibrary] = useState(null);
  
  const dispath = useDispatch()
  const theme = useSelector(state => state.theme.currentTheme)

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
    if(theme === 'light') {
      dispath(changeTheme('dark'))
    }else {
      dispath(changeTheme('light'))
    }
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
          <div onClick={() => handleChangeTheme()} className="sidebar__link change-theme">
            <div className={`sidebar__icon change-theme__icon ${theme === 'dark' ? 'active' : ''}`}>
              
            </div>
            <span className="sidebar__text">
              chế độ tối
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  closeSidebar: PropTypes.func,
};

export default memo(Sidebar);
