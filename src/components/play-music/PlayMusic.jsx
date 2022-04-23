import React from "react";
import PropTypes from "prop-types";

import "./play-music.scss";
const PlayMusic = (props) => {
  return (
    <div className="play-music">
      <div className="play-music__left">
        <div className="play-music__thumb">
          <img
            src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/d/a/c/6/dac69cd1300a635c193c0f03e8d6d617.jpg"
            alt=""
          />
          <div className="play-music__wave">
            <span className="wave"></span>
            <span className="wave"></span>
            <span className="wave"></span>
            <span className="wave"></span>
            <span className="wave"></span>
          </div>
        </div>
        <div className="play-music__information">
          <h3 className="play-music__name-song">
            Khong muon yeu lai cang say dam
          </h3>
          <span className="play-music__singer">Mr.Siro</span>
        </div>
      </div>
      <div className="play-music__center">
        <div className="play-music__control">
          <span className="play-music__icon icon__random">
            <i className="bx bx-shuffle"></i>
            <span className="tooltip-text">Phát ngẫu nhiên</span>
          </span>
          <span className="play-music__icon icon__previous">
            <i className="bx bx-skip-previous"></i>
          </span>
          <span className="play-music__icon icon__play">
            {/* <i className='bx bx-play' ></i> */}
            <i className="bx bx-pause"></i>
          </span>
          <span className="play-music__icon icon__next">
            <i className="bx bx-skip-next"></i>
          </span>
          <span className="play-music__icon icon__repeat">
            <i className="bx bx-repeat"></i>
            <span className="tooltip-text">Lặp lại</span>
          </span>
        </div>
        <div className="play-music__progress-bar-song">
          <span className="play-music__time time-start">03:34</span>
          <span className="play-music__range range__song">
            <span className="play-music__range-current range-current__song"></span>
            <span className="play-music__range-dot dot__song"></span>
          </span>
          <span className="play-music__time time-end">05:07</span>
        </div>
      </div>
      <div className="play-music__right">
        <span className="play-music__icon icon__heart">
          <i className="bx bx-heart"></i>
          <span className="tooltip-text">Yêu thích</span>

        </span>
        <span className="play-music__icon icon__download">
          <i className="bx bx-download"></i>
          <span className="tooltip-text">Tải xuống</span>

        </span>

        <div className="play-music__progress-bar-volume">
          <span className="play-music__icon">
            <i className="bx bxs-volume-full"></i>
          </span>
          <span className="play-music__range range__volume">
            <span className="play-music__range-current range-current__volume"></span>
            <span className="play-music__range-dot dot__volume"></span>
          </span>
        </div>

      </div>
    </div>
  );
};

PlayMusic.propTypes = {};

export default PlayMusic;
