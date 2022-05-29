import React, { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import PlayMusic from "../play-music/PlayMusic";
import MenuAction from "../menu-action-song/MenuActionSong";
import Footer from "../footer/Footer";

import "./layout.scss";

import { updateItemMenuAction, menuActionToggle } from "../../redux/men-action/menuActionSlice";



const Layout = (props) => {
  const location = useLocation();
  const dispatch = useDispatch()
  const [activeSidebar, setActiveSidebar] = useState(true);
  const [activeSidebarMobile, setActiveSidebarMobile] = useState(false);
  const theme = useSelector(state => state.theme.currentTheme)

  const handleActiveSidebar = useCallback(() => {
    setActiveSidebar(prev => !prev);
    setActiveSidebarMobile(prev => !prev);
  }, []);

  // selector
  const itemMenuAction = useSelector(state => state.menuAction.item)
  const activeMenuAction = useSelector(state => state.menuAction.active)


  return (
    <>
      <div className={`app ${theme}`}>
        <Header onActiveSidebar={handleActiveSidebar} />
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
            <Sidebar
              closeSidebar={handleActiveSidebar}
            />
          </div>
          <div className={`main__content ${activeSidebar ? "shrink" : ""}`}>
            <Outlet />
          </div>
        </div>
        <Footer shrink={activeSidebar} />
        <PlayMusic />
        <MenuAction item={itemMenuAction} active={activeMenuAction} />
      </div>
    </>
  );
};

Layout.propTypes = {};

export default Layout;
