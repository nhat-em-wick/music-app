import React, { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import PlayMusic from "../play-music/PlayMusic";
import Footer from "../footer/Footer";

import "./layout.scss";
import { list, currentSong, index, repeat, random, listPlayed, clearListPlayed } from "../../redux/music/musicSlice";
import { playing, updateCurrentTime, updateDuration, mute } from "../../redux/audio/audioSlice";

const Layout = (props) => {
  const location = useLocation();
  const dispatch = useDispatch()
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
  
  
  const audioRef = useRef(null);
  const [favorite, setFavorite] = useState(false);

  // selector

  const music = useSelector(state => state.music)
  const audio = useSelector(state => state.audio)

  const currentIndex = useSelector(state => state.music.currentIndexSong)
  
  const songs = useSelector(state => state.music.list)
  const isPlaying = useSelector(state => state.audio.isPlay)
  const currentTime = useSelector(state => state.audio.currentTime)
  const duration = useSelector(state => state.audio.duration)
  const isMute = useSelector(state => state.audio.isMute)
  const isRepeat = useSelector(state => state.music.isRepeat)
  const isRandom = useSelector(state => state.music.isRandom)
  const songsPlayed = useSelector(state => state.music.songsPlayed)

  // call api
  useEffect(() => {
    
  }, [])

  const handlePlay = () => {
    dispatch(playing(!isPlaying))
  };

  const handleRandom = () => {
    dispatch(random(!isRandom))
  }

  const handleRepeat = () => {
    dispatch(repeat(!isRepeat))
  }

  const updateCurrentTimeMouseTouch = (value) => {
    dispatch(updateCurrentTime(value));
  };

  const handleRangeUpdate = (currentTimeRef, currentCircle) => {
    const seconds = currentTime;
    const percent = (seconds / duration) * 100;
    currentTimeRef.current.style.width = percent + "%";
    currentCircle.current.style.left = `calc(${percent + "%"} - 5px)`;
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      dispatch(currentSong(songs[currentIndex]))
    } else {
      audioRef.current.pause();
    }
  }, [currentIndex, isPlaying]);

  useEffect(() => {
    if (isRandom) {
      dispatch(listPlayed(currentIndex))
    } else {
      dispatch(clearListPlayed())
    }
  }, [currentIndex, isRandom]);

  const checkRandomNextSong = () => {
    if(songsPlayed.length >= songs.length) {
      dispatch(clearListPlayed())
    }else {
      handleRandomSongs();
    }
  }

  // change song
  const nextSong = () => {
    if (isRandom) {
      checkRandomNextSong()
    } else {
      dispatch(index(currentIndex + 1 >= songs.length ? 0 : currentIndex + 1));
    }
    dispatch(playing(true))
  };

  const prevSong = () => {
    if (isRandom) {
      checkRandomNextSong()
    } else {
      dispatch(index(
        currentIndex - 1 < 0 ? songs.length - 1 : currentIndex - 1
      ));
    }
    dispatch(playing(true))
  };

  // event audio
  const handleLoadMetadata = () => {
    const seconds = Math.floor(audioRef.current.duration);
    dispatch(updateDuration(seconds));
  };

  const handleOnTimeAudio = () => {
    const seconds = Math.floor(audioRef.current.currentTime);
    dispatch(updateCurrentTime(seconds));
  };

  const handleEnded = () => {
    if (isRepeat) {
      audioRef.current.play();
    } else if (isRandom && songsPlayed.length === songs.length) {
      dispatch(playing(false))
    } else if (!isRandom && currentIndex === songs.length - 1) {
      dispatch(playing(false))
    } else {
      nextSong();
    }
  };

  const handleMute = () => {
    audioRef.current.muted = !isMute;
    dispatch(mute(!isMute));
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
    } while (
      newIndex === currentIndex ||
      songsPlayed.includes(newIndex)
    );
    dispatch(index(newIndex));
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
          songs={songs}
          audioRef={audioRef}
          currentIndex={currentIndex}
          currentTime={formatTime(currentTime)}
          duration={formatTime(duration)}
          favorite={favorite}
          isRandom={isRandom}
          isRepeat={isRepeat}
          isPlaying={isPlaying}
          isMute={isMute}
          onMute={handleMute}
          onPlay={handlePlay}
          onRandom={handleRandom}
          onRepeat={handleRepeat}
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
          src={songs[currentIndex]?.src}
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
