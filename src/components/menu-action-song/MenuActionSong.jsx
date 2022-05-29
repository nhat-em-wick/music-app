import React, { useEffect, useRef, useState, memo } from "react";
import PropTypes from "prop-types";
import useClickOutside from "../../custom-hook/clickOutside";
import useClickInside from '../../custom-hook/clickInside'
import { menuAction } from "../../constant";
import { useSelector, useDispatch } from "react-redux";

import {
  updateItemMenuAction,
  menuActionToggle,
} from "../../redux/men-action/menuActionSlice";

import "./menu-action-song.scss";

const MenuActionSong = ({ item, active }) => {
  const dispatch = useDispatch();
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });
  const menuRef = useClickInside(() => {
    dispatch(menuActionToggle(false));
  });

  const domNode = useClickOutside(() => {
    dispatch(menuActionToggle(false));
  });

  useEffect(() => {
    const handleCloseWhenScroll = () => {
      dispatch(menuActionToggle(false));
    };
    document.addEventListener("scroll", handleCloseWhenScroll);
    return () => {
      document.removeEventListener("scroll", handleCloseWhenScroll);
    };
  }, []);

  // lấy tọa độ click
  useEffect(() => {
    const printMousePos = (event) => {
      const rect = domNode.current.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const vw = window.innerWidth || document.documentElement.clientWidth;
      if(domNode.current && domNode.current.contains(event.target)) {
        return
      }
      if (event.clientY + rect.height - 50 > vh) {
        setPosition({
          top: event.pageY - rect.height,
          left: event.pageX - 270,
        });
      } else {
        setPosition({
          top: event.pageY - 50,
          left: event.pageX - 270,
        });
      }
      
    };
    document.addEventListener("click", printMousePos);
    return () => {
      document.removeEventListener("click", printMousePos);
    };
  }, []);

 

  return (
    <>
      <div
        ref={domNode}
        style={position}
        className={`menu-action-song ${active ? "active" : ""}`}
      >
        <div className="menu-action-song__header">
          <div className="menu-action-song__header__thumb">
            <div
              className="menu-action-song__header__thumb__img"
              style={{
                background: `url(${item?.thumbnail}) center right / cover no-repeat`,
              }}
            ></div>
          </div>
          <div className="menu-action-song__header__info">
            <h4 className="menu-action-song__header__title">{item?.title}</h4>
          </div>
        </div>
        <ul ref={menuRef} className="menu-action-song__list">
          {menuAction.map((item, index) => (
            <li key={index} className="menu-action-song__item">
              <div className="menu-action-song__icon">
                <i className={item.icon}></i>
              </div>
              <div className="menu-action-song__text">{item.text}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

MenuActionSong.propTypes = {};

export default memo(MenuActionSong);
