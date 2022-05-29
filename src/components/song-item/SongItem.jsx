import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LoadingSkeleton from "../loading-skeleton/LoadingSkeleton";
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
} from "../../redux/music/musicSlice";
import {
  updateItemMenuAction,
  menuActionToggle,
} from "../../redux/men-action/menuActionSlice";
import formatTime from "../../utils/formatTime";
import "./song-item.scss";
const SongItem = ({
  song,
  songs,
  indexSong,
  selected,
  onSelected,
  hiddenInput,
}) => {
  const dispatch = useDispatch();
  const isPlay = useSelector((state) => state.audio.isPlay);
  const currentSongPlay = useSelector((state) => state.music.currentSong);
  const activeMenuAction = useSelector((state) => state.menuAction.active);

  const [playSong, setPlaySong] = useState(true);
  const [favorite, setFavorite] = useState(false);

  const handleFavorite = () => {
    setFavorite(!favorite);
  };



  const handlePlaySong = () => {
    dispatch(currentSong(song));
    dispatch(index(indexSong));
    dispatch(list(songs));
    dispatch(playing(playSong));
    setPlaySong(!playSong);
  };

  // call api stream
  useEffect(() => {
    if (currentSongPlay?.id !== song.id) {
      setPlaySong(true);
    }
  }, [currentSongPlay]);

  const handleShowMenuAction = (song) => {
    dispatch(updateItemMenuAction(song));
    dispatch(menuActionToggle(!activeMenuAction));
  };

  return (
    <div
      onDoubleClick={() => handlePlaySong()}
      className={`song-item ${selected ? "selected" : ""} ${
        currentSongPlay?.encodeId === song.encodeId ? "playing" : ""
      } `}
    >
      <div className="song-item__left">
        {hiddenInput ? null : (
          <>
            <div
              onClick={() => onSelected(song.encodeId)}
              className="song-item__checkbox-custom"
            ></div>
            <div className="song-item__left__icon">
              <i className="bx bx-music"></i>
            </div>
          </>
        )}

        <div className="song-item__left__content">
          <div onClick={() => handlePlaySong()} className="song-item__thumb">
            <div
              className="song-item__thumb__img"
              style={{
                background: `url(${song.thumbnail}) center right / cover no-repeat`,
              }}
            ></div>
            <div className="song-item__thumb__overlay"></div>
            <div className="song-item__thumb__action">
              {isPlay && currentSongPlay?.encodeId === song.encodeId ? (
                <>
                  <div className="song-item__thumb__wave">
                    <div>
                      <div className="wave"></div>
                      <div className="wave"></div>
                      <div className="wave"></div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="song-item__thumb__icon">
                    <i className="bx bx-play"></i>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="song-item__info">
            <div className="song-item__title">{song.title}</div>
            <div className="song-item__singers">
              {song?.artists?.map((item, index) => (
                <React.Fragment key={index}>
                  <Link to="#" className="song-item__singer">
                    {item.name}
                  </Link>
                  {index >= 0 && index !== song?.artists?.length - 1 && ", "}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="song-item__center">
        <div className="song-item__album">
          <Link
            to={`/album/${song?.album?.encodeId}`}
            className="song-item__album__link"
          >
            {song?.album?.title}
          </Link>
        </div>
      </div>
      <div className="song-item__right">
        <div className="song-item__right__hide">
          <div
            onClick={() => handleFavorite()}
            className={`song-item__right__icon icon--heart ${
              favorite ? "active" : ""
            }`}
          >
            {favorite ? (
              <i className="bx bxs-heart"></i>
            ) : (
              <i className="bx bx-heart"></i>
            )}
          </div>
          <div className="song-item__duration">{formatTime(song.duration)}</div>
        </div>
        <div className="song-item__right__hover">
          <div
            onClick={() => handleFavorite()}
            className={`song-item__right__icon icon--heart ${
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
          <div
            onClick={() => handleShowMenuAction(song)}
            className="song-item__right__icon icon--dot"
          >
            <i className="bx bx-dots-horizontal-rounded"></i>
            <span className="tooltip-text">Khác</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Loading = ({ hiddenInput }) => (
  <div className={`song-item`}>
    <div className="song-item__left">
      {hiddenInput ? null : (
        <>
          <LoadingSkeleton style={{ height: "16px", width: "16px" }} />
        </>
      )}
      <div className="song-item__left__content">
        <div className="song-item__thumb">
          <LoadingSkeleton style={{ paddingTop: "100%" }} />
        </div>
        <div className="song-item__info">
          <div className="song-item__title">
            <LoadingSkeleton style={{ height: "16px", width: "100px" }} />
          </div>
          <div className="song-item__singers">
            <LoadingSkeleton style={{ height: "13px" }} />
          </div>
        </div>
      </div>
    </div>
    <div className="song-item__center">
      <div className="song-item__album">
        <div className="song-item__album__link">
          <LoadingSkeleton style={{ height: "16px", width: "100px" }} />
        </div>
      </div>
    </div>
    <div className="song-item__right">
      <div className="song-item__right__hide">
        <div className="song-item__duration">
          <LoadingSkeleton style={{ height: "13px" }} />
        </div>
      </div>
    </div>
  </div>
);

SongItem.Loading = Loading;

SongItem.propTypes = {};

export default SongItem;
