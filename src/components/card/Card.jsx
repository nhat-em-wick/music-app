import React from "react";
import PropTypes from "prop-types";

import "./card.scss";

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

const Card = (props) => {
  return (
    <div className="card">
      <div className="card__thumb">
        <div
          className="card__img"
          style={{
            background: `url('https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/d/a/c/6/dac69cd1300a635c193c0f03e8d6d617.jpg') center right / cover no-repeat`,
          }}
        ></div>
        <div className="card__overlay"></div>
        <div className="card__action">
          <span className="card__action-icon icon__heart">
            <i className='bx bx-heart' ></i>
            <span className="tooltip-text">
              Yêu thích
            </span>
          </span>
          <span className="card__action-icon icon__play">
            <i className='bx bx-play-circle'></i>
          </span>
          <span className="card__action-icon icon__dot">
            <i className='bx bx-dots-horizontal-rounded' ></i>
            <span className="tooltip-text">
              Khác
            </span>
          </span>
        </div>
      </div>

      <div className="card__information">
        <div className="card__name">nhac phim viet nam nhac phim viet nam</div>
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

Card.propTypes = {};

export default Card;
