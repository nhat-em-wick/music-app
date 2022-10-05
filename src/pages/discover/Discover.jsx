import React, { memo, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import HeroSlider from "../../components/hero-slider/HeroSlider";
import Section, { SectionTitle } from "../../components/section/Section";
import Song from "../../components/song/Song";
import CardAlbum from "../../components/card-album/CardAlbum";
import Helmet from "../../components/helmet/Helmet";
import { useSelector, useDispatch } from "react-redux";

import { songsTest, albumTest } from "../../constant";
import {
  list,
  currentSong,
  index,
  repeat,
  random,
  listPlayed,
  clearListPlayed,
} from "../../redux/music/musicSlice";

import zingApi from "../../api/zingApi";

import "./discover.scss";

const Discover = (props) => {
  const [topSongs, setTopSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState([]);
  const [playListToday, setPlaylistToday] = useState([]);
  const [playListRecommend, setPlayListRecommend] = useState([]);

  const dispatch = useDispatch();
  const timerID = useRef(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await zingApi.home();
        const bannerResponse = res.data.items[0].items;
        const recommendResponse = res.data.items[3].items[0].album;
        console.log(recommendResponse)
        const todayResponse = res.data.items[4].items;
        timerID.current = setTimeout(() => {
          setBanner(bannerResponse);
          setPlayListRecommend(
            recommendResponse.length > 10
              ? recommendResponse.slice(0, 10)
              : recommendResponse
          );
          setPlaylistToday(
            todayResponse.length > 10 ? todayResponse.slice(0, 9) : todayResponse
          );
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
    return clearTimeout(timerID.current);
  }, []);

  return (
    <Helmet title="Khám phá">
      <HeroSlider banner={banner} />
      <Section>
        <SectionTitle title="có thể bạn muốn nghe" />
        <div className="grid">
          {playListRecommend.length > 0 ? (
            <>
              <div className="row">
                {playListRecommend.map((item, index) => (
                  <div key={index} className="col l-2-4 m-3 c-6">
                    <CardAlbum album={item} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="row">
              {Array(10)
                .fill()
                .map((item, index) => (
                  <div key={index} className="col l-2-4 m-3 c-6">
                    <CardAlbum.Loading />
                  </div>
                ))}
            </div>
          )}
        </div>
      </Section>
      <Section>
        <SectionTitle title="nổi bật trong tuần" />
        <div className="grid">
          <div className="row">
            {playListToday.length > 0 ? (
              <>
                {playListToday.map((item, index) => (
                  <div key={index} className="col l-2-4 m-3 c-6">
                    <CardAlbum album={item} indexAlbum={index} />
                  </div>
                ))}
              </>
            ) : (
              <>
                {Array(10)
                  .fill()
                  .map((item, index) => (
                    <div key={index} className="col l-2-4">
                      <CardAlbum.Loading />
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
      </Section>
    </Helmet>
  );
};

Discover.propTypes = {};

export default memo(Discover);
