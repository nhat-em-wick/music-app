import React from "react";
import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";
import { playing, updateCurrentTime, updateDuration, mute } from "../../redux/audio/audioSlice";
import { list, currentSong, index, repeat, random, listPlayed, clearListPlayed } from "../../redux/music/musicSlice";

import './song.scss'
function Song ({song, indexSong, songs}) {
  const dispatch = useDispatch()
  const currentSong = useSelector(state => state.music.currentSong)
  const isPlay = useSelector(state => state.audio.isPlay)
  
  const handlePlaySong = (currentIndex) => {
    dispatch(playing(true))
    dispatch(index(currentIndex))
    dispatch(list(songs))
  }

  const handleStopSong = () => {
    dispatch(playing(false))
  }

  return (
    <>
      <div onDoubleClick={() => handlePlaySong(indexSong)} className={`song ${currentSong?.id === song.id ? 'active' : ''}`}>
        <div className="song__left">
          <div  className="song__thumb">
            <div className="song__thumb__overlay"></div>
            {
              (currentSong?.id === song.id) && isPlay ? 
            <div onClick={() => handleStopSong()} className={`wave-animation`}>
              <span className="wave"></span>
              <span className="wave"></span>
              <span className="wave"></span>
            </div> : <span onClick={() => handlePlaySong(indexSong)} className="song__icon">
              <i className="bx bx-play"></i>
            </span>
            }
            <img src={song.thumb} alt="" />
          </div>
          <div className="song__information">
            <div className="song__name">{song.name}</div>
            <div className="song__singer">{song.singer}</div>
          </div>
        </div>
        <div className="song__album">
          <div className="song__album__name">{song.album}</div>
        </div>
        <div className="song__view-duration">
          <div className="song__view">
            <div className="song__icon">
              <i className='bx bxs-music'></i>
            </div>
            <span className="song__number">
              100000
            </span>
          </div>
          <div className="song__duration">
            <div className="song__icon">
              <i className='bx bxs-time-five' ></i>
            </div>
            <span className="song__number">04:56</span>
          </div>
        </div>
        <div className="song__action">
          <div className="song__favorite">
            <div className="song__icon">
              <i className='bx bx-heart' ></i>
              <span className="tooltip-text">Yêu thích</span>
            </div>
          </div>
          <div className="song__dot">
            <div className="song__icon">
              <i className='bx bx-dots-horizontal-rounded'></i>
              <span className="tooltip-text">Khác</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Song.propTypes = {
  song: PropTypes.object,
  songs: PropTypes.array,
  indexSong: PropTypes.number
};

export default Song;
