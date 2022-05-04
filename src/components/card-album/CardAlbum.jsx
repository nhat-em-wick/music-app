import React, { useState } from "react";
import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";
import { playing, updateCurrentTime, updateDuration, mute } from "../../redux/audio/audioSlice";
import { list, currentSong, index, repeat, random, listPlayed, clearListPlayed, albumPlay } from "../../redux/music/musicSlice";

import "./card-album.scss";

const singers = [
  {
    id:1,
    name: 'chi dan'
  },
  {
    id:2,
    name:"son tung mtp"
  },
  {
    id:3,
    name:"trinh thang binh"
  },
  {
    id:4,
    name:"cuong toi"
  },
  
]

const CardAlbum = ({album, indexAlbum}) => {

  const dispatch = useDispatch()
  const [playAlbum, setPlayAlbum] = useState(false)

  const songs = album.songs
  const isPlay = useSelector(state => state.audio.isPlay)
  const currentAlbum = useSelector(state => state.music.currentAlbum)
  const music = useSelector(state => state.music)
  // console.log(music)  
  const handlePlayAlbum = (idAlbum) => {
    dispatch(list(songs))
    dispatch(albumPlay(idAlbum))
    dispatch(playing(true))
    setPlayAlbum(true)
  }
  const handleEndedAlbum = () => {
    dispatch(albumPlay(null))
    dispatch(playing(false))
    setPlayAlbum(false)
  }

  return (
    <div className="card">
      <div className={`card__thumb ${currentAlbum === album.id ? 'active' : ''}`}>
        <div
          className="card__img"
          style={{
            background: `url(${album.thumb}) center right / cover no-repeat`,
          }}
        ></div>
        <div className="card__overlay"></div>
        <div className="card__action">
          <span className="card__action-icon icon--heart">
            <i className='bx bx-heart' ></i>
            <span className="tooltip-text">
              Yêu thích
            </span>
          </span>
          <span onClick={() => handlePlayAlbum(album.id)} className="card__action-icon icon--play">
            {
              (currentAlbum === album.id) ? <div className="card__wave-animate">
              <span className="wave"></span>
              <span className="wave"></span>
              <span className="wave"></span>
            </div> :  <i className='bx bx-play'></i>
            }
          </span>
          <span className="card__action-icon icon--dot">
            <i className='bx bx-dots-horizontal-rounded' ></i>
            <span className="tooltip-text">
              Khác
            </span>
          </span>
        </div>
      </div>

      <div className="card__information">
        <div className="card__name">{album.name}</div>
        <ul className="card__singers">
          {
            singers.map((item, index) => (
              <>
                <li key={index} className="card__singer__item">
                  <a href="#" className="card__singer__link">{item.name}</a>
                </li>
                {index >= 0 && index !== singers.length - 1 && ', '}
              </>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

CardAlbum.propTypes = {
  album: PropTypes.object
};

export default CardAlbum;
