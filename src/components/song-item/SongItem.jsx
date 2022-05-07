import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './song-item.scss'
const SongItem = props => {

  const [selected, setSelected] = useState(false)
  const [playing, setPlaying] = useState(false)

  const handleSelect = () => {
    setSelected(!selected)
  }

  return (
    <div className={`song-item ${selected ? 'selected' : ''} ${playing ? 'playing' : ''}` }>
      <div className="song-item__left">
        <div onClick={() => handleSelect()} className="song-item__checkbox-custom">
          <input type="checkbox" name="" id="" />
          <label htmlFor=""></label>
        </div>
        <div className="song-item__left__icon">
          <i className='bx bx-music' ></i>
        </div>
        <div className="song-item__left__content">
          <div className="song-item__thumb">
            <div className="song-item__thumb__img"
              style={{
                background: `url(https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/2/3/d/3/23d3bfa1656027dcf914d9c3bae263eb.jpg) center right / cover no-repeat`,
              }}
            >
            </div>
            <div className="song-item__thumb__overlay"></div>
            <div className="song-item__thumb__action">
              {
                playing ? <>
                <div className="song-item__thumb__wave">
                <div>
                  <div className="wave"></div>
                  <div className="wave"></div>
                  <div className="wave"></div>
                </div>
              </div>
                </> : <>
                <div className="song-item__thumb__icon">
                <i className="bx bx-play"></i>
              </div>
                </>
              }
            </div>
          </div>
          <div className="song-item__info">
            <div className="song-item__title">
              Phai chi luc truoc anh sai Phai chi luc truoc anh sai
            </div>
            <div className="song-item__singers">
              <Link to="#" className="song-item__singer">
                Mr.Siro
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="song-item__center">
        <div className="song-item__album">
          <Link to="#" className='song-item__album__link'>
            Phai chi luc truoc anh sai Phai chi luc truoc anh sai
          </Link>
        </div>
      </div>
      <div className="song-item__right">
        <div className="song-item__right__hide">
          <div className="song-item__right__icon icon--heart">
            <i className="bx bx-heart"></i>
          </div>
          <div className="song-item__duration">
            04:00
          </div>
        </div>
        <div className="song-item__right__hover">
          <div className="song-item__right__icon icon--heart">
            <i className="bx bx-heart"></i>
            <span className="tooltip-text">Yêu thích</span>
          </div>
          <div className="song-item__right__icon icon--dot">
            <i className='bx bx-dots-horizontal-rounded'></i>
            <span className="tooltip-text">Khác</span>
          </div>
        </div>
      </div>
    </div>
  )
}

SongItem.propTypes = {}

export default SongItem