import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import Section, { SectionTitle } from "../../components/section/Section";
import CardAlbum from "../../components/card-album/CardAlbum";
import SongItem from "../../components/song-item/SongItem";
import Playlist from "../../components/playlist/Playlist";
import Helmet from "../../components/helmet/Helmet";
import LoadingSkeleton from "../../components/loading-skeleton/LoadingSkeleton";
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
  albumPlay
} from "../../redux/music/musicSlice";
import zingApi from "../../api/zingApi";

import "./detail-album.scss";
const DetailAlbum = (props) => {
  const { albumId } = useParams();
  const timerID = useRef(null);
  const dispatch = useDispatch();
  const isPlay = useSelector((state) => state.audio.isPlay);
  const currentAlbumPlay = useSelector((state) => state.music.currentAlbum)
  const [detailAlbum, setDetailAlbum] = useState();
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [care, setCare] = useState()

  const handlePlay = () => {
    dispatch(playing(!isPlay));
    dispatch(list(playlist));
    dispatch(albumPlay(albumId))
    dispatch(index(0))
  };

  useEffect(() => {
    const fetchDetailAlbum = async () => {
      try {
        const response1 = await zingApi.getDetailPlaylist({ id: albumId });
        const response2 = await zingApi.getSectionBottom({ id: albumId })
        setPlaylist([...response1.data.song.items]);
        setDetailAlbum(response1.data);
        setCare(response2.data[1] && response2.data[1].items.length > 10 ? response2.data[1].items.slice(0, 10) : response2.data[1].items)
        timerID.current = setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        setLoading(true);
        console.log(error);
      }
    };
    fetchDetailAlbum();
    return () => clearTimeout(timerID.current);
  }, [albumId]);



  return (
    <Helmet title={detailAlbum?.title}>
      <div className="detail-album grid">
        <div className="row">
          {
            loading ? <Loading /> :  <div className="col l-4 m-12 c-12">
            <div className="detail-album__thumbnail">
              <div className="detail-album__thumbnail__cd">
                <div
                  className={`detail-album__thumbnail__img ${
                    isPlay && currentAlbumPlay === albumId ? "playing" : ""
                  }`}
                  style={{
                    background: `url(${detailAlbum?.thumbnailM}) center right / cover no-repeat`,
                  }}
                ></div>

                <div className="detail-album__thumbnail__action">
                  {isPlay ? (
                    <div
                      onClick={() => handlePlay()}
                      className="detail-album__thumbnail__wave"
                    >
                      <div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                        <div className="wave"></div>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => handlePlay()}
                      className="detail-album__thumbnail__action__icon"
                    >
                      <i className="bx bx-play"></i>
                    </div>
                  )}
                </div>
              </div>
              <div className="detail-album__thumbnail__content">
                <h2 className="detail-album__thumbnail__title">
                  {detailAlbum?.title}
                </h2>
                <div className="detail-album__thumbnail__update-time">
                  Cập nhật: 05/05/2022
                </div>
                <div className="detail-album__thumbnail__artists">
                  {detailAlbum?.artists?.map((item, index) => (
                    <React.Fragment key={index}>
                      <Link
                        to="#"
                        className="detail-album__thumbnail__artists__item"
                      >
                        {item.name}
                      </Link>
                      {index >= 0 &&
                        index !== detailAlbum?.artists?.length - 1 &&
                        ", "}
                    </React.Fragment>
                  ))}
                </div>
                <div
                  onClick={() => handlePlay()}
                  className="detail-album__thumbnail__btn"
                >
                  <div className="detail-album__thumbnail__btn__icon">
                    {isPlay ? (
                      <i className="bx bx-pause"></i>
                    ) : (
                      <i className="bx bx-play"></i>
                    )}
                  </div>
                  <div className="detail-album__thumbnail__btn__text">
                    {isPlay && currentAlbumPlay === albumId  ? "tạm dừng phát" : "phát nhạc"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          }
         
          <div className="col l-8 m-12 c-12">
            <Playlist list={playlist} loading={loading} />
          </div>
        </div>
      </div>
      <Section>
        <SectionTitle title="có thể bạn quan tâm" />
          {
            loading ? <div className="row">
              {
                Array(5).fill().map((item, index) => (
                  <div key={index} className="col l-2-4 m-4 c-6">
                    <CardAlbum.Loading />
                  </div>
                ))
              }
            </div> : <div className="row">
              {
                care?.map((item, index) => (
                  <div key={index} className="col l-2-4 m-4 c-6">
                    <CardAlbum album={item} />
                  </div>
                ))
              }
            </div>
          }
      </Section>
    </Helmet>
  );
};

const Loading = () => {
  return (
    <>
      <div className="col l-4 m-12 c-12">
        <div className="detail-album__thumbnail">
          <div className="detail-album__thumbnail__cd">
            <LoadingSkeleton style={{ paddingTop: "100%" }} />
          </div>
        </div>
        <div className="detail-album__thumbnail__content">
          <h2 className="detail-album__thumbnail__title">
            <LoadingSkeleton style={{ height: "20px", width: "150px", marginBottom: "10px" }} />
          </h2>
          <div className="detail-album__thumbnail__update-time">
            <LoadingSkeleton style={{ height: "20px",width: "150px", marginBottom: "10px" }} />
          </div>
          <div className="detail-album__thumbnail__artists">
            <LoadingSkeleton style={{ height: "20px", marginBottom: "10px" }} />
          </div>
            <LoadingSkeleton style={{ height: "30px",width: "150px", borderRadius: "25px" }} />
        </div>
      </div>
    </>
  );
};

DetailAlbum.propTypes = {};

export default DetailAlbum;
