import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import LoadingSkeleton from "../loading-skeleton/LoadingSkeleton";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  playing,
  updateCurrentTime,
  updateDuration,
  mute,
} from "../../redux/audio/audioSlice";
import {
  list,
  currentSong,
  index,
  repeat,
  random,
  listPlayed,
  clearListPlayed,
  albumPlay,
} from "../../redux/music/musicSlice";

import zingApi from "../../api/zingApi";

import "./card-album.scss";


const CardAlbum = ({ album }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const isPlaying = useSelector((state) => state.audio.isPlay);
  const currentAlbum = useSelector((state) => state.music.currentAlbum);
  
  const handlePlayAlbum = (idAlbum) => {
    dispatch(albumPlay(idAlbum));
    dispatch(playing(true));
  };
  const handleEndedAlbum = () => {
    dispatch(playing(false));
  };


  return (
    <div onClick={() => navigate(`/album/${album.encodeId}`)} className="card">
      <div
        className={`card__thumb ${currentAlbum === album.encodeId && isPlaying ? 'active' : ''}`}
      >
        <div
          className="card__img"
          style={{
            background: `url(${album.thumbnailM}) center right / cover no-repeat`,
          }}
        ></div>
        <div className="card__overlay"></div>
        <div className="card__action">
          <div className="card__action-icon icon--play">
            { isPlaying && currentAlbum === album.encodeId ?  (
              <div
                onClick={() => handleEndedAlbum()}
                className="card__wave-animate"
              >
                <div>
                  <span className="wave"></span>
                  <span className="wave"></span>
                  <span className="wave"></span>
                </div>
              </div>
            ) : (
              <div
                onClick={() => handlePlayAlbum(album.encodeId)}
                className="card__action--play"
              >
                <i className="bx bx-play"></i>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="card__information">
        <div className="card__name">{album.title}</div>
        <ul className="card__singers">
          {album?.artists?.map((item, index) => (
            <React.Fragment key={index}>
              <li className="card__singer__item">
                <a href="#" className="card__singer__link">
                  {item.name}
                </a>
              </li>
              {index >= 0 && index !== album?.artists?.length - 1 && ", "}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="card">
      <div className={`card__thumb`}>
        <LoadingSkeleton style={{ "paddingTop" : "100%"}} />
      </div>
      <div className="card__information">
        <LoadingSkeleton style={{ "height": '20px', "marginBottom": '10px' }} />
        <LoadingSkeleton style={{ "height": '14px'}} />
      </div>
    </div>
  );
};

CardAlbum.Loading = Loading

CardAlbum.propTypes = {
  album: PropTypes.object,
};

export default CardAlbum;
