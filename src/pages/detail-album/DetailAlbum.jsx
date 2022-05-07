import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { albumTest } from "../../constant";
import Section, {SectionTitle} from '../../components/section/Section'
import CardAlbum from '../../components/card-album/CardAlbum'
import SongItem from "../../components/song-item/SongItem";
import "./detail-album.scss";
const DetailAlbum = (props) => {

  const handlePlay = () => {
    console.log('play')
  }

  return (
    <>
    <div className="detail-album grid">
      <div className="row">
        <div className="col l-4 m-12 c-12">
          <div className="detail-album__thumbnail">
            <div
              className="detail-album__thumbnail__cd"
              
            >
              <div className="detail-album__thumbnail__img playing" style={{
                background: `url(https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/2/3/d/3/23d3bfa1656027dcf914d9c3bae263eb.jpg) center right / cover no-repeat`,
              }}>

              </div>
              
              <div className="detail-album__thumbnail__action">
                {/* <div onClick={() => handlePlay()} className="detail-album__thumbnail__action__icon">
                  <i className="bx bx-play"></i>
                </div> */}
                <div onClick={() => handlePlay()}  className="detail-album__thumbnail__wave">
                  <div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="detail-album__thumbnail__content">
              <h2 className="detail-album__thumbnail__title">
                Những bài hát hay nhất của Mr.Siro
              </h2>
              <div className="detail-album__thumbnail__update-time">
                Cập nhật: 05/05/2022
              </div>
              <Link to="#" className="detail-album__thumbnail__singer">Mr.Siro</Link>
              <div className="detail-album__thumbnail__btn">
                <div className="detail-album__thumbnail__btn__icon">
                  <i className="bx bx-play"></i>
                </div>
                <div className="detail-album__thumbnail__btn__text">
                  tiếp tục phát
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col l-8 m-12 c-12">
            <SongItem></SongItem>
            <SongItem></SongItem>
            <SongItem></SongItem>
            <SongItem></SongItem>
            <SongItem></SongItem>
            <SongItem></SongItem>
            <SongItem></SongItem>
            <SongItem></SongItem>
            <SongItem></SongItem>
            <SongItem></SongItem>
            <SongItem></SongItem>
            <SongItem></SongItem>
            <SongItem></SongItem>
        </div>
      </div>
    </div>
    <Section>
      <SectionTitle title="có thể bạn quan tâm"/>
    </Section>
    </>
  );
};

DetailAlbum.propTypes = {};

export default DetailAlbum;
