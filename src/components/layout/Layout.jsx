import React, { useState } from "react";
import PropTypes from "prop-types";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";

import "./layout.scss";
const Layout = (props) => {
  const location = useLocation();

  const [activeSidebar, setActiveSidebar] = useState(true);
  const [activeSidebarMobile, setActiveSidebarMobile] = useState(false);

  const handleActiveSidebar = () => {
    setActiveSidebar(!activeSidebar);
    setActiveSidebarMobile(!activeSidebarMobile);
  };

  return (
    <>
      <div className="app">
        <Header activeSidebar={handleActiveSidebar} />
        <div className="main">
          <div className={`main__sidebar ${activeSidebar ? "active" : ""}`}>
            <Sidebar />
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
            <Sidebar closeSidebar={handleActiveSidebar} />
          </div>
          <div className={`main__content ${activeSidebar ? "shrink" : ""}`}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

Layout.propTypes = {};

export default Layout;
