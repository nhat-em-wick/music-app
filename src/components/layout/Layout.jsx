import React, { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import PlayMusic from "../play-music/PlayMusic";
import Footer from "../footer/Footer";
import { songs } from "../../constant";

import "./layout.scss";
const Layout = (props) => {
  const location = useLocation();
  const [activeSidebar, setActiveSidebar] = useState(true);
  const [activeSidebarMobile, setActiveSidebarMobile] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false)

  const handleActiveSidebar = useCallback(() => {
    setActiveSidebar(prev => !prev);
    setActiveSidebarMobile(prev => !prev);
  }, []);

  const themeToggle = useCallback(() => {
    setDarkTheme(prev => !prev);
  }, []);
  
  const themeRef = useRef(null);
  const audioRef = useRef(null);
  const songsPlayed = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMute, setIsMute] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const updateCurrentTimeMouseTouch = (value) => {
    setCurrentTime(value);
  };

  const handleRangeUpdate = (currentTimeRef, currentCircle) => {
    const seconds = Math.floor(currentTime);
    const percent = (seconds / duration) * 100;
    currentTimeRef.current.style.width = percent + "%";
    currentCircle.current.style.left = `calc(${percent + "%"} - 5px)`;
  };

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
    } else {
      while (songsPlayed.current.length > 0) {
        songsPlayed.current.pop();
      }
    }
  }, [currentIndex]);

  // change song
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

  // event audio
  const handleLoadMetadata = () => {
    const seconds = Math.floor(audioRef.current.duration);
    setDuration(seconds);
  };

  const handleOnTimeAudio = () => {
    const seconds = Math.floor(audioRef.current.currentTime);
    setCurrentTime(seconds);
  };

  const handleEnded = () => {
    if (isRepeat) {
      audioRef.current.play();
    } else if (isRandom && songsPlayed.current.length === songs.length) {
      setIsPlaying(false);
    } else if (currentIndex === songs.length - 1) {
      setIsPlaying(false);
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
      <div className={`app ${darkTheme ? "dark-theme" : "light-theme"}`}>
        <Header onActiveSidebar={handleActiveSidebar} />
        <div className="main">
          <div className={`main__sidebar ${activeSidebar ? "active" : ""}`}>
            <Sidebar changeTheme={themeToggle} />
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
              changeTheme={themeToggle}
            />
          </div>
          <div className={`main__content ${activeSidebar ? "shrink" : ""}`}>
            <Outlet />
          </div>
        </div>
        <Footer shrink={activeSidebar} />
        <PlayMusic
          audioRef={audioRef}
          currentIndex={currentIndex}
          currentTime={formatTime(currentTime)}
          duration={formatTime(duration)}
          favorite={favorite}
          isRandom={isRandom}
          isRepeat={isRepeat}
          isPlaying={isPlaying}
          isMute={isMute}
          onMute={() => handleMute()}
          onPlay={handlePlay}
          onRandom={() => setIsRandom(!isRandom)}
          onRepeat={() => setIsRepeat(!isRepeat)}
          onPrevSong={prevSong}
          onNextSong={nextSong}
          onFavorite={() => setFavorite(!favorite)}
          updateCurrentTimeMouseTouch={(value) =>
            updateCurrentTimeMouseTouch(value)
          }
          onRangeUpdate={(currentTimeRef, currentCircleRef) =>
            handleRangeUpdate(currentTimeRef, currentCircleRef)
          }
        />
        <audio
          ref={audioRef}
          src={songs[currentIndex].src}
          onEnded={() => handleEnded()}
          onLoadedMetadata={() => handleLoadMetadata()}
          onTimeUpdate={() => handleOnTimeAudio()}
        ></audio>
      </div>
    </>
  );
};

Layout.propTypes = {};

export default Layout;
