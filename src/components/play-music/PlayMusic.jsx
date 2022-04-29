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
  const rangeSongRef = useRef(null);
  const dotSongRef = useRef(null);
  const progressVolumeRef = useRef(null);
  const rangeVolumeRef = useRef(null);
  const dotVolumeRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMute, setIsMute] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const songsPlayed = useRef([]);
  const [favorite, setFavorite] = useState(false);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    rangeVolumeRef.current.style.width = audioRef.current.volume * 100 + "%";
    dotVolumeRef.current.style.left = `calc(${
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
      setCurrentTime(audioRef.current.duration * percent);
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
      rangeSongRef,
      dotSongRef,
      isDragSongRef.current
    );
  };

  const handleMouseDownVolume = (e) => {
    isDragVolumeRef.current = true;
    handleChangeProgressVolume(
      e,
      progressVolumeRef,
      rangeVolumeRef,
      dotVolumeRef,
      isDragVolumeRef.current
    );
  };

  const handleMouseUp = (e) => {
    isDragSongRef.current = false;
    isDragVolumeRef.current = false;
  };

  const handleMouseMove = (e) => {
    handleChangeProgressSong(
      e,
      progressSongRef,
      rangeSongRef,
      dotSongRef,
      isDragSongRef.current
    );
    handleChangeProgressVolume(
      e,
      progressVolumeRef,
      rangeVolumeRef,
      dotVolumeRef,
      isDragVolumeRef.current
    );
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

  const handleTimeUpdate = () => {
    const seconds = Math.floor(audioRef.current.currentTime);
    const percent = (seconds / duration) * 100;
    rangeSongRef.current.style.width = percent + "%";
    dotSongRef.current.style.left = `calc(${percent + "%"} - 5px)`;
    setCurrentTime(seconds);
  };

  const handleEnded = () => {
    if (isRepeat) {
      console.log("end");
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
    setFavorite(!favorite)
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={songs[currentIndex].src}
        onEnded={() => handleEnded()}
        onLoadedMetadata={() => handleLoadMetadata()}
        onTimeUpdate={() => handleTimeUpdate()}
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
                ref={rangeSongRef}
                className="play-music__range-current range-current__song"
              ></div>
              <div
                ref={dotSongRef}
                className="play-music__range-dot dot__song"
              ></div>
            </div>
            <span className="play-music__time time-duration">
              {duration && !isNaN(duration) && formatTime(duration)}
            </span>
          </div>
        </div>
        <div className="play-music__right">
          <div className="play-music__action">
            <div onClick={() => handleFavorite()} className={`play-music__icon icon__heart ${favorite ? 'active' : ''}`}>
           { favorite ? <i className='bx bxs-heart' ></i> : <i className="bx bx-heart"></i>}
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
                ref={rangeVolumeRef}
                className="play-music__range-current range-current__volume"
              ></div>
              <div
                ref={dotVolumeRef}
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
      />
    </>
  );
};

const PlayMusicMobile = ({currentIndex, isPlaying, handlePlay, handleNext, favorite, handleFavorite}) => (
  <>
    <div className="play-music-mobile">
      <div className="play-music-mobile__left">
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
        <div onClick={() => handleFavorite()} className={`play-music-mobile__icon icon__heart ${favorite ? 'active' : ''}`}>
          {
            favorite ? <i className='bx bxs-heart' ></i> : <i className="bx bx-heart"></i>
          }
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



PlayMusic.propTypes = {};


export default PlayMusic;
