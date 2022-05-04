import React, { useEffect, useRef, useState,useMemo, memo, useCallback } from "react";
import PropTypes from "prop-types";
import anime from 'animejs/lib/anime.es.js';


import "./play-music.scss";

import { useDispatch, useSelector } from "react-redux";
import { mute } from "../../redux/audio/audioSlice";


const PlayMusic = ({
  songs,
  audioRef,
  currentIndex,
  currentTime,
  duration,
  favorite,
  isRandom,
  isRepeat,
  onRepeat,
  onRandom,
  updateCurrentTimeMouseTouch,
  onFavorite,
  onPrevSong,
  onNextSong,
  isPlaying,
  onPlay,
  onMute,
  onRangeUpdate
}) => {
  const cdAnimate = useRef(null)
  const cdThumbRef = useRef(null);
  const isDragSongRef = useRef(false);
  const isDragVolumeRef = useRef(false);
  const progressSongRef = useRef(null);
  const currentTimeSongRef = useRef(null);
  const currentCircleSongRef = useRef(null);
  const progressVolumeRef = useRef(null);
  const currentVolumeRef = useRef(null);
  const currentCircleVolumeRef = useRef(null);

  const dispatch = useDispatch()

  const isMute = useSelector(state => state.audio.isMute)
  
  const [openMusicPlayMB, setOpenMusicPlayMB] = useState(false);

  useEffect(() => {
    if(isPlaying) {
      cdThumbRef.current.classList.add('playing')
    }else {cdThumbRef.current.classList.remove('playing')}
    
  }, [isPlaying])

  useEffect(() => {
    currentVolumeRef.current.style.width = audioRef.current.volume * 100 + "%";
    currentCircleVolumeRef.current.style.left = `calc(${
      audioRef.current.volume * 100 + "%"
    } - 5px)`;
  }, []);

  useEffect(() => {
    onRangeUpdate(currentTimeSongRef, currentCircleSongRef)
  }, [currentTime])

  
  const handleChangeProgress = (
    event,
    progressBarRef,
    rangeRef,
    dotRef,
    isDrag
  ) => {
    const clientX = event.clientX;
    const left = progressBarRef.current.getBoundingClientRect().left;
    const width = progressBarRef.current.getBoundingClientRect().width;
    const min = left;
    const max = progressBarRef.current.getBoundingClientRect().width + left;
    let percent
    if (isDrag && clientX >= min && clientX <= max) {
      percent = (clientX - left) / width;
    }else if(isDrag && clientX < min ) {
      percent = 0
    }else if(isDrag && clientX > max ) {
      percent = 0.999999
    }
    rangeRef.current.style.width = percent * 100 + "%";
    dotRef.current.style.left = `calc(${percent * 100 + "%"} - 5px)`;
    return percent
  };

  const handleMouseDownSong = (e) => {
    isDragSongRef.current = true;
    const percent = handleChangeProgress(
      e,
      progressSongRef,
      currentTimeSongRef,
      currentCircleSongRef,
      isDragSongRef.current
    );
    audioRef.current.currentTime = audioRef.current.duration * percent;
    updateCurrentTimeMouseTouch(audioRef.current.duration * percent);
  };

  const handleMouseDownVolume = (e) => {
    isDragVolumeRef.current = true;
    const percent = handleChangeProgress(
      e,
      progressVolumeRef,
      currentVolumeRef,
      currentCircleVolumeRef,
      isDragVolumeRef.current
    );
    audioRef.current.volume = percent;
  };

  const handleMouseUp = (e) => {
    isDragSongRef.current = false;
    isDragVolumeRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (isDragSongRef.current) {
      const percent = handleChangeProgress(
        e,
        progressSongRef,
        currentTimeSongRef,
        currentCircleSongRef,
        isDragSongRef.current
      );
      audioRef.current.currentTime = audioRef.current.duration * percent;
      updateCurrentTimeMouseTouch(audioRef.current.duration * percent);
    }
    if (isDragVolumeRef.current) {
      const percent = handleChangeProgress(
        e,
        progressVolumeRef,
        currentVolumeRef,
        currentCircleVolumeRef,
        isDragVolumeRef.current
      );
      if(percent <= 0) {
        dispatch(mute(true))
      }else {
        dispatch(mute(false))
      }
      audioRef.current.volume = percent;
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", (e) => handleMouseMove(e));
    return () =>
      window.removeEventListener("mousemove", (e) => handleMouseMove(e));
  }, []);

  useEffect(() => {
    window.addEventListener("mouseup", (e) => handleMouseUp(e));
    return () => window.removeEventListener("mouseup", (e) => handleMouseUp(e));
  }, []);


  return (
    <>
      <div className={`play-music ${songs.length > 0 ? 'active' :''}`}>
        <div className="play-music__left">
          <div className="play-music__thumb">
            <img
              ref={cdThumbRef}
              src={songs[currentIndex]?.thumb}
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
              {songs[currentIndex]?.name}
            </h3>
            <span className="play-music__singer">
              {songs[currentIndex]?.singer}
            </span>
          </div>
        </div>
        <div className="play-music__center">
          <div className="play-music__control">
            <div
              onClick={() => onRandom()}
              className={`play-music__icon icon--random ${
                isRandom ? "active" : ""
              }`}
            >
              <i className="bx bx-shuffle"></i>
              <span className="tooltip-text">Phát ngẫu nhiên</span>
            </div>
            <div
              onClick={() => onPrevSong()}
              className="play-music__icon icon--previous"
            >
              <i className="bx bx-skip-previous"></i>
            </div>
            <div
              onClick={() => onPlay()}
              className="play-music__icon icon--play"
            >
              {isPlaying ? (
                <i className="bx bx-pause"></i>
              ) : (
                <i className="bx bx-play"></i>
              )}
            </div>
            <div
              onClick={() => onNextSong()}
              className="play-music__icon icon--next"
            >
              <i className="bx bx-skip-next"></i>
            </div>
            <div
              onClick={() => onRepeat()}
              className={`play-music__icon icon--repeat ${
                isRepeat ? "active" : ""
              }`}
            >
              <i className="bx bx-repeat"></i>
              <span className="tooltip-text">Lặp lại</span>
            </div>
          </div>
          <div className="play-music__progress-bar-song">
            <span className="play-music__time time-start">
              {currentTime}
            </span>
            <div
              ref={progressSongRef}
              onMouseDown={(e) => handleMouseDownSong(e)}
              className="play-music__range range__song"
            >
              <div
                ref={currentTimeSongRef}
                className="play-music__range-current range-current__song"
              ></div>
              <div
                ref={currentCircleSongRef}
                className="play-music__range-dot dot__song"
              ></div>
            </div>
            <span className="play-music__time time-duration">
              {duration}
            </span>
          </div>
        </div>
        <div className="play-music__right">
          <div className="play-music__action">
            <div
              onClick={() => onFavorite()}
              className={`play-music__icon icon--heart ${
                favorite ? "active" : ""
              }`}
            >
              {favorite ? (
                <i className="bx bxs-heart"></i>
              ) : (
                <i className="bx bx-heart"></i>
              )}
              <span className="tooltip-text">Yêu thích</span>
            </div>
            <div className="play-music__icon icon--download">
              <i className="bx bx-download"></i>
              <span className="tooltip-text">Tải xuống</span>
            </div>
          </div>
          <div className="play-music__progress-bar-volume">
            <div
              onClick={() => onMute()}
              className="play-music__icon icon--volume"
            >
              { isMute ? (
                <i className="bx bxs-volume-mute"></i>
              ) : (
                <i className="bx bxs-volume-full"></i>
              )}
            </div>
            <div
              ref={progressVolumeRef}
              onMouseDown={(e) => handleMouseDownVolume(e)}
              className="play-music__range range__volume"
            >
              <div
                ref={currentVolumeRef}
                className="play-music__range-current range-current__volume"
              ></div>
              <div
                ref={currentCircleVolumeRef}
                className="play-music__range-dot dot__volume"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <PlayMusicMobile
      songs={songs}
        currentIndex={currentIndex}
        isPlaying={isPlaying}
        onPlay={onPlay}
        onNext={onNextSong}
        favorite={favorite}
        onFavorite={onFavorite}
        openFullMB={() => setOpenMusicPlayMB(!openMusicPlayMB)}
        audioRef={audioRef}
      />
      <PlayMusicMobileFull
        songs={songs}
        audioRef={audioRef}
        currentIndex={currentIndex}
        currentTime={currentTime}
        duration={duration}
        favorite={favorite}
        isRandom={isRandom}
        isRepeat={isRepeat}
        isPlaying={isPlaying}
        onPlay={onPlay}
        onRandom={() => onRandom()}
        onRepeat={() => onRepeat()}
        onPrevSong={onPrevSong}
        onNextSong={onNextSong}
        onFavorite={() => onFavorite()}
        openMusicPlayMB={openMusicPlayMB}
        closeMusicPlayMB={() => setOpenMusicPlayMB(!openMusicPlayMB)}
        updateCurrentTimeMouseTouch={(value) => updateCurrentTimeMouseTouch(value)}
        onRangeUpdate={(currentTimeRef, currentCircleRef) =>
          onRangeUpdate(currentTimeRef, currentCircleRef)
        }
      />
    </>
  );
};

const PlayMusicMobile = ({
  songs,
  currentIndex,
  isPlaying,
  onPlay,
  onNext,
  favorite,
  onFavorite,
  openFullMB,
  audioRef,
}) => {
  const cdThumbRef = useRef(null)


  useEffect(() => {
    if(isPlaying) {
      cdThumbRef.current.classList.add('playing')
    }else {
      cdThumbRef.current.classList.remove('playing')
    }
  }, [isPlaying])

  return (
    <>
      <div className="play-music-mobile">
        <div onClick={() => openFullMB()} className="play-music-mobile__left">
          <div className="play-music-mobile__cd-thumb">
            <img ref={cdThumbRef}
              src={songs[currentIndex]?.thumb}
              alt=""
            />
          </div>
          <div className="play-music-mobile__text">
            <div className="play-music-mobile__name">
              {songs[currentIndex]?.name}
            </div>
            <div className="play-music-mobile__singer">
              {songs[currentIndex]?.singer}
            </div>
          </div>
        </div>
        <div className="play-music-mobile__right">
          <div
            onClick={() => onFavorite()}
            className={`play-music-mobile__icon icon--heart ${
              favorite ? "active" : ""
            }`}
          >
            {favorite ? (
              <i className="bx bxs-heart"></i>
            ) : (
              <i className="bx bx-heart"></i>
            )}
          </div>
          <div
            onClick={() => onPlay()}
            className="play-music-mobile__icon icon--play"
          >
            {!isPlaying ? (
              <i className="bx bx-play"></i>
            ) : (
              <i className="bx bx-pause"></i>
            )}
          </div>
          <div
            onClick={() => onNext()}
            className="play-music-mobile__icon icon--next"
          >
            <i className="bx bx-skip-next"></i>
          </div>
        </div>
      </div>
    </>
  );
};

const PlayMusicMobileFull = ({
  songs,
  audioRef,
  currentIndex,
  currentTime,
  duration,
  favorite,
  isRandom,
  isRepeat,
  onRepeat,
  onRandom,
  openMusicPlayMB,
  closeMusicPlayMB,
  updateCurrentTimeMouseTouch,
  onFavorite,
  onPrevSong,
  onNextSong,
  isPlaying,
  onPlay,
  onRangeUpdate
}) => {
  const isDrag = useRef(false);
  const progressSongRef = useRef();
  const currentTimeRef = useRef();
  const dotCurrentTimeRef = useRef();
  const cdThumbRef = useRef(null)


  useEffect(() => {
    if(isPlaying) {
      cdThumbRef.current.classList.add('playing')
    }else {
      cdThumbRef.current.classList.remove('playing')
    }
  }, [isPlaying])

  const handleChangeProgressSongMB = (
    event,
    progressBarRef,
    rangeRef,
    dotRef,
    isDrag
  ) => {
    const clientX = event.touches[0].clientX;
    const left = progressBarRef.current.getBoundingClientRect().left;
    const width = progressBarRef.current.getBoundingClientRect().width;
    const min = left;
    const max = progressBarRef.current.getBoundingClientRect().width + left;
    if (isDrag && clientX >= min && clientX <= max) {
      const percent = (clientX - left) / width;
      rangeRef.current.style.width = percent * 100 + "%";
      dotRef.current.style.left = `calc(${percent * 100 + "%"} - 5px)`;
      audioRef.current.currentTime = audioRef.current.duration * percent;
      updateCurrentTimeMouseTouch(audioRef.current.duration * percent);
    }
  };

  const handleTouchStart = (e) => {
    isDrag.current = true;
    handleChangeProgressSongMB(
      e,
      progressSongRef,
      currentTimeRef,
      dotCurrentTimeRef,
      isDrag.current
    );
  };
  const handleTouchMove = (e) => {
    if (isDrag.current) {
      handleChangeProgressSongMB(
        e,
        progressSongRef,
        currentTimeRef,
        dotCurrentTimeRef,
        isDrag.current
      );
    }
  };
  const handleTouchEnd = (e) => {
    isDrag.current = false;
  };

  useEffect(() => {
    window.addEventListener("touchmove", (e) => handleTouchMove(e));
    return () =>
      window.removeEventListener("touchmove", (e) => handleTouchMove(e));
  }, []);

  useEffect(() => {
    window.addEventListener("touchend", (e) => handleTouchEnd(e));
    return () =>
      window.removeEventListener("touchend", (e) => handleTouchEnd(e));
  }, []);

  
  useEffect(() => {
    onRangeUpdate(currentTimeRef, dotCurrentTimeRef)
  }, [currentTime])

  return (
    <>
      <div
        className={`play-music-mobile-full ${openMusicPlayMB ? "show" : ""}`}
        style={{
          background: `url(${songs[currentIndex]?.thumb}) no-repeat center / cover`,
        }}
      >
        <div className="backdrop-filter"></div>
        <div
          onClick={() => closeMusicPlayMB()}
          className="play-music-mobile-full__top"
        >
          <div className="play-music-mobile-full__top__icon">
            <i className="bx bx-chevron-down"></i>
          </div>
          <div className="play-music-mobile-full__top__text">
            <div className="play-music-mobile-full__name">
              {songs[currentIndex]?.name}
            </div>
            <div className="play-music-mobile-full__singer">
              {songs[currentIndex]?.singer}
            </div>
          </div>
        </div>
        <div className="play-music-mobile-full__content">
          <div className="play-music-mobile-full__cd-thumb">
            <img ref={cdThumbRef}
              src={songs[currentIndex]?.thumb}
              alt={songs[currentIndex]?.name}
            />
          </div>
          <div className="play-music-mobile-full__progress-bar">
            <div className="play-music-mobile-full__time"> {currentTime}</div>
            <div
              onTouchStart={(e) => handleTouchStart(e)}
              ref={progressSongRef}
              className="play-music-mobile-full__range"
            >
              <div
                ref={currentTimeRef}
                onTouchMove={(e) => handleTouchMove(e)}
                className="play-music-mobile-full__range-current-song"
              ></div>
              <div
                ref={dotCurrentTimeRef}
                className="play-music-mobile-full__dot-current-song"
              ></div>
            </div>
            <div className="play-music-mobile-full__time">{duration}</div>
          </div>
          <div className="play-music-mobile-full__action">
            <div
              onClick={() => onFavorite()}
              className={`play-music-mobile-full__icon icon--heart ${
                favorite ? "active" : ""
              }`}
            >
              {favorite ? (
                <i className="bx bxs-heart"></i>
              ) : (
                <i className="bx bx-heart"></i>
              )}
            </div>
            <div className="play-music-mobile-full__icon">
              <i className="bx bx-download"></i>
            </div>
          </div>
        </div>
        <div className="play-music-mobile-full__bottom">
          <div
            onClick={() => onRandom()}
            className={`play-music-mobile-full__icon icon--random ${
              isRandom ? "active" : ""
            }`}
          >
            <i className="bx bx-shuffle"></i>
          </div>
          <div
            onClick={() => onPrevSong()}
            className="play-music-mobile-full__icon icon--previous"
          >
            <i className="bx bx-skip-previous"></i>
          </div>
          <div
            onClick={() => onPlay()}
            className="play-music-mobile-full__icon icon--play"
          >
            {!isPlaying ? (
              <i className="bx bx-play"></i>
            ) : (
              <i className="bx bx-pause"></i>
            )}
          </div>
          <div
            onClick={() => onNextSong()}
            className="play-music-mobile-full__icon icon--next"
          >
            <i className="bx bx-skip-next"></i>
          </div>
          <div
            onClick={() => onRepeat()}
            className={`play-music-mobile-full__icon icon--repeat ${
              isRepeat ? "active" : ""
            }`}
          >
            <i className="bx bx-repeat"></i>
          </div>
        </div>
      </div>
    </>
  );
};

PlayMusic.propTypes = {};

export default PlayMusic;
