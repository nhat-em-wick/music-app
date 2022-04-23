import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import PlayMusic from "../play-music/PlayMusic";

import "./layout.scss";
const Layout = (props) => {
  const location = useLocation();

  const [activeSidebar, setActiveSidebar] = useState(true);
  const [activeSidebarMobile, setActiveSidebarMobile] = useState(false);
  const [dark, setDark] = useState(false)
  const handleActiveSidebar = () => {
    setActiveSidebar(!activeSidebar);
    setActiveSidebarMobile(!activeSidebarMobile);
  };

  const themeRef = useRef(null)

  const themeToggle = () => {
    setDark(!dark)
  }

  return (
    <>
      <div className={`app ${dark ? 'dark-theme' : 'light-theme'}`}>
        <Header activeSidebar={handleActiveSidebar} />
        <div className="main">
          <div className={`main__sidebar ${activeSidebar ? "active" : ""}`}>
            <Sidebar changeTheme={themeToggle} />
          </div>
          <div
            onClick={() => handleActiveSidebar()}
            className={`main__sidebar-overlay ${
              activeSidebarMobile ? "active" : ""
            }`}
          ></div>
          <div
            className={`main__sidebar-mobile ${
              activeSidebarMobile ? "active" : ""
            }`}
          >
            <Sidebar closeSidebar={handleActiveSidebar} changeTheme={themeToggle}/>
          </div>
          <div className={`main__content ${activeSidebar ? "shrink" : ""}`}>
            <Outlet />
          </div>
        </div>
        <PlayMusic/>
      </div>
    </>
  );
};

Layout.propTypes = {};

export default Layout;
