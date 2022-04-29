import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { songs } from "../../constant";
import "./play-music.scss";
const PlayMusic = (props) => {
  const audioRef = useRef(null);
  const cdThumbRef = useRef(null);
  const isDragSongRef = useRef(false);
  const isDragVolumeRef = useRef(false);
  const progressSongRef = useRef(null);
  const currentTimeSongRef = useRef(null);
  const currentCircleSongRef = useRef(null);
  const progressSongMBRef = useRef(null);
  const rangeSongMBRef = useRef(null);
  const dotSongMBRef = useRef(null);
  const progressVolumeRef = useRef(null);
  const currentVolumeRef = useRef(null);
  const currentCircleVolumeRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMute, setIsMute] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const songsPlayed = useRef([]);
  const [favorite, setFavorite] = useState(false);
  const [openMusicPlayMB, setOpenMusicPlayMB] = useState(false);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const animateCD = cdThumbRef.current.animate(
      [
        {
          transform: "rotate(360deg)",
        },
      ],
      {
        duration: 10000,
        iterations: Infinity,
      }
    );
    animateCD.pause();
    if (isPlaying) {
      animateCD.play();
    } else {
      animateCD.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    currentVolumeRef.current.style.width = audioRef.current.volume * 100 + "%";
    currentCircleVolumeRef.current.style.left = `calc(${
      audioRef.current.volume * 100 + "%"
    } - 5px)`;
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [currentIndex, isPlaying]);

  useEffect(() => {
    if (isRandom) {
      songsPlayed.current.push(currentIndex);
    }
  }, [currentIndex]);

  const nextSong = () => {
    if (isRandom) {
      handleRandomSongs();
    } else {
      setCurrentIndex(currentIndex + 1 >= songs.length ? 0 : currentIndex + 1);
    }
    setIsPlaying(true);
  };
  const prevSong = () => {
    if (isRandom) {
      handleRandomSongs();
    } else {
      setCurrentIndex(
        currentIndex - 1 < 0 ? songs.length - 1 : currentIndex - 1
      );
    }
    setIsPlaying(true);
  };

  // event drag drop range =======================================

  const updateCurrentTime = (value) => {
    setCurrentTime(value);
  };

  const handleChangeProgressSong = (
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
    if (isDrag && clientX >= min && clientX <= max) {
      const percent = (clientX - left) / width;
      rangeRef.current.style.width = percent * 100 + "%";
      dotRef.current.style.left = `calc(${percent * 100 + "%"} - 5px)`;
      audioRef.current.currentTime = audioRef.current.duration * percent;
      updateCurrentTime(audioRef.current.duration * percent);
    }
  };

  const handleChangeProgressVolume = (
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
    if (isDrag && clientX >= min && clientX <= max) {
      const percent = (clientX - left) / width;
      rangeRef.current.style.width = percent * 100 + "%";
      dotRef.current.style.left = `calc(${percent * 100 + "%"} - 5px)`;
      audioRef.current.volume = percent;
    }
  };

  const handleMouseDownSong = (e) => {
    isDragSongRef.current = true;
    handleChangeProgressSong(
      e,
      progressSongRef,
      currentTimeSongRef,
      currentCircleSongRef,
      isDragSongRef.current
    );
  };

  const handleMouseDownVolume = (e) => {
    isDragVolumeRef.current = true;
    handleChangeProgressVolume(
      e,
      progressVolumeRef,
      currentVolumeRef,
      currentCircleVolumeRef,
      isDragVolumeRef.current
    );
  };

  const handleMouseUp = (e) => {
    isDragSongRef.current = false;
    isDragVolumeRef.current = false;
  };

  const handleMouseMove = (e) => {
    if (isDragSongRef.current) {
      handleChangeProgressSong(
        e,
        progressSongRef,
        currentTimeSongRef,
        currentCircleSongRef,
        isDragSongRef.current
      );
    }
    if (isDragVolumeRef.current) {
      handleChangeProgressVolume(
        e,
        progressVolumeRef,
        currentVolumeRef,
        currentCircleVolumeRef,
        isDragVolumeRef.current
      );
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
  // ======================================================== //

  // ============================= event audio ============================================ //

  const handleLoadMetadata = () => {
    const seconds = Math.floor(audioRef.current.duration);
    setDuration(seconds);
  };

  const handleTimeUpdate = (currentTimeRef, currentCircle) => {
    const seconds = Math.floor(audioRef.current.currentTime);
    const percent = (seconds / duration) * 100;
    currentTimeRef.current.style.width = percent + "%";
    currentCircle.current.style.left = `calc(${percent + "%"} - 5px)`;
    setCurrentTime(seconds);
  };

  const handleEnded = () => {
    if (isRepeat) {
      audioRef.current.play();
    } else {
      nextSong();
    }
  };

  const handleMute = () => {
    audioRef.current.muted = !isMute;
    setIsMute(!isMute);
  };

  // ======================================================================== //

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const returnMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(time % 60);
    const returnSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnMinutes}:${returnSeconds}`;
  };

  const handleRandomSongs = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * songs.length);
      if (songsPlayed.current.length >= songs.length) {
        while (songsPlayed.current.length > 0) {
          songsPlayed.current.pop();
        }
      }
    } while (
      newIndex === currentIndex ||
      songsPlayed.current.includes(newIndex)
    );
    setCurrentIndex(newIndex);
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={songs[currentIndex].src}
        onEnded={() => handleEnded()}
        onLoadedMetadata={() => handleLoadMetadata()}
        onTimeUpdate={() =>
          handleTimeUpdate(currentTimeSongRef, currentCircleSongRef)
        }
      ></audio>
      <div className="play-music">
        <div className="play-music__left">
          <div className="play-music__thumb">
            <img
              ref={cdThumbRef}
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
              {songs[currentIndex].name}
            </h3>
            <span className="play-music__singer">
              {songs[currentIndex].singer}
            </span>
          </div>
        </div>
        <div className="play-music__center">
          <div className="play-music__control">
            <div
              onClick={() => setIsRandom(!isRandom)}
              className={`play-music__icon icon__random ${
                isRandom ? "active" : ""
              }`}
            >
              <i className="bx bx-shuffle"></i>
              <span className="tooltip-text">Phát ngẫu nhiên</span>
            </div>
            <div
              onClick={() => prevSong()}
              className="play-music__icon icon__previous"
            >
              <i className="bx bx-skip-previous"></i>
            </div>
            <div
              onClick={() => handlePlay()}
              className="play-music__icon icon__play"
            >
              {isPlaying ? (
                <i className="bx bx-pause"></i>
              ) : (
                <i className="bx bx-play"></i>
              )}
            </div>
            <div
              onClick={() => nextSong()}
              className="play-music__icon icon__next"
            >
              <i className="bx bx-skip-next"></i>
            </div>
            <div
              onClick={() => setIsRepeat(!isRepeat)}
              className={`play-music__icon icon__repeat ${
                isRepeat ? "active" : ""
              }`}
            >
              <i className="bx bx-repeat"></i>
              <span className="tooltip-text">Lặp lại</span>
            </div>
          </div>
          <div className="play-music__progress-bar-song">
            <span className="play-music__time time-start">
              {formatTime(currentTime)}
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
              {formatTime(duration)}
            </span>
          </div>
        </div>
        <div className="play-music__right">
          <div className="play-music__action">
            <div
              onClick={() => handleFavorite()}
              className={`play-music__icon icon__heart ${
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
            <div className="play-music__icon icon__download">
              <i className="bx bx-download"></i>
              <span className="tooltip-text">Tải xuống</span>
            </div>
          </div>
          <div className="play-music__progress-bar-volume">
            <div
              onClick={() => handleMute()}
              className="play-music__icon icon__volume"
            >
              {isMute ? (
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
        currentIndex={currentIndex}
        isPlaying={isPlaying}
        handlePlay={handlePlay}
        handleNext={nextSong}
        favorite={favorite}
        handleFavorite={handleFavorite}
        openFullMB={() => setOpenMusicPlayMB(!openMusicPlayMB)}
        audioRef={audioRef}
      />
      <PlayMusicMobileFull
        audioRef={audioRef}
        currentIndex={currentIndex}
        currentTime={formatTime(currentTime)}
        duration={formatTime(duration)}
        favorite={favorite}
        isRandom={isRandom}
        isRepeat={isRepeat}
        isPlaying={isPlaying}
        handlePlay={handlePlay}
        prevSong={prevSong}
        nextSong={nextSong}
        handleFavorite={() => setFavorite(!favorite)}
        openMusicPlayMB={openMusicPlayMB}
        closeMusicPlayMB={() => setOpenMusicPlayMB(!openMusicPlayMB)}
        updateCurrentTime={(value) => updateCurrentTime(value)}
        handleTimeUpdate={(currentTimeRef, currentCircleRef) =>
          handleTimeUpdate(currentTimeRef, currentCircleRef)
        }
      />
    </>
  );
};

const PlayMusicMobile = ({
  currentIndex,
  isPlaying,
  handlePlay,
  handleNext,
  favorite,
  handleFavorite,
  openFullMB,
  audioRef,
}) => {
  return (
    <>
      <div className="play-music-mobile">
        <div onClick={() => openFullMB()} className="play-music-mobile__left">
          <div className="play-music-mobile__cd-thumb">
            <img
              src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/d/a/c/6/dac69cd1300a635c193c0f03e8d6d617.jpg"
              alt=""
            />
          </div>
          <div className="play-music-mobile__text">
            <div className="play-music-mobile__name">
              {songs[currentIndex].name}
            </div>
            <div className="play-music-mobile__singer">
              {songs[currentIndex].singer}
            </div>
          </div>
        </div>
        <div className="play-music-mobile__right">
          <div
            onClick={() => handleFavorite()}
            className={`play-music-mobile__icon icon__heart ${
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
            onClick={() => handlePlay()}
            className="play-music-mobile__icon icon__play"
          >
            {!isPlaying ? (
              <i className="bx bx-play"></i>
            ) : (
              <i className="bx bx-pause"></i>
            )}
          </div>
          <div
            onClick={() => handleNext()}
            className="play-music-mobile__icon icon__next"
          >
            <i className="bx bx-skip-next"></i>
          </div>
        </div>
      </div>
    </>
  );
};

const PlayMusicMobileFull = ({
  audioRef,
  currentIndex,
  currentTime,
  duration,
  favorite,
  isRandom,
  isRepeat,
  openMusicPlayMB,
  closeMusicPlayMB,
  updateCurrentTime,
  handleFavorite,
  prevSong,
  nextSong,
  isPlaying,
  handlePlay,
  handleTimeUpdate
}) => {
  const isDrag = useRef(false);
  const progressSongRef = useRef();
  const currentTimeRef = useRef();
  const dotCurrentTimeRef = useRef();

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
      updateCurrentTime(audioRef.current.duration * percent);
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
    handleTimeUpdate(currentTimeRef, dotCurrentTimeRef)
  }, [audioRef.current?.currentTime])

  return (
    <>
      <div
        className={`play-music-mobile-full ${openMusicPlayMB ? "show" : ""}`}
      >
        <div
          onClick={() => closeMusicPlayMB()}
          className="play-music-mobile-full__top"
        >
          <div className="play-music-mobile-full__top__icon">
            <i className="bx bx-chevron-down"></i>
          </div>
          <div className="play-music-mobile-full__top__text">
            <div className="play-music-mobile-full__name">
              {songs[currentIndex].name}
            </div>
            <div className="play-music-mobile-full__singer">
              {songs[currentIndex].singer}
            </div>
          </div>
        </div>
        <div className="play-music-mobile-full__content">
          <div className="play-music-mobile-full__cd-thumb">
            <img
              src="https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/d/a/c/6/dac69cd1300a635c193c0f03e8d6d617.jpg"
              alt=""
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
              onClick={() => handleFavorite()}
              className={`play-music-mobile-full__icon icon__heart ${
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
            className={`play-music-mobile-full__icon icon__random ${
              isRandom ? "active" : ""
            }`}
          >
            <i className="bx bx-shuffle"></i>
          </div>
          <div
            onClick={() => prevSong()}
            className="play-music-mobile-full__icon icon__previous"
          >
            <i className="bx bx-skip-previous"></i>
          </div>
          <div
            onClick={() => handlePlay()}
            className="play-music-mobile-full__icon icon__play"
          >
            {!isPlaying ? (
              <i className="bx bx-play"></i>
            ) : (
              <i className="bx bx-pause"></i>
            )}
          </div>
          <div
            onClick={() => nextSong()}
            className="play-music-mobile-full__icon icon__next"
          >
            <i className="bx bx-skip-next"></i>
          </div>
          <div
            className={`play-music-mobile-full__icon icon__repeat ${
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
