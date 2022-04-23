import React from "react";
import PropTypes from "prop-types";

import './song.scss'
function Song(props) {
  return (
    <>
      <div className="song">
        <div className="song__left">
          <div className="song__thumb">
            <div className="song__thumb__overlay"></div>
            <span className="song__icon">
              <i className="bx bx-play"></i>
            </span>
            <img src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/d/a/c/6/dac69cd1300a635c193c0f03e8d6d617.jpg" alt="" />
          </div>
          <div className="song__information">
            <div className="song__name">Despacito</div>
            <div className="song__singer">Mr.Siro</div>
          </div>
        </div>
        <div className="song__album">
          <div className="song__album__name">Khong the yeu them mot ai</div>
        </div>
        <div className="song__view-duration">
          <div className="song__view">
            <span className="song__icon">
              <i className='bx bxs-music'></i>
            </span>
            <span className="song__number">
              100000
            </span>
          </div>
          <div className="song__duration">
            <span className="song__icon">
              <i className='bx bxs-time-five' ></i>
            </span>
            <span className="song__number">04:56</span>
          </div>
        </div>
        <div className="song__action">
          <div className="song__favorite">
            <span className="song__icon">
              <i className='bx bx-heart' ></i>
              <span className="tooltip-text">Yêu thích</span>
            </span>
          </div>
          <div className="song__dot">
            <span className="song__icon">
              <i className='bx bx-dots-horizontal-rounded'></i>
              <span className="tooltip-text">Khác</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

Song.propTypes = {
  item: PropTypes.object,
};

export default Song;
