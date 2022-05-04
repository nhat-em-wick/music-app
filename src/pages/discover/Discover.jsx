import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import HeroSlider from "../../components/hero-slider/HeroSlider";
import Section, { SectionTitle } from "../../components/section/Section";
import Song from "../../components/song/Song";
import CardAlbum from "../../components/card-album/CardAlbum";
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

import "./discover.scss";

const Discover = (props) => {
  const [topSongs, setTopSongs] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setTopSongs(songsTest);
  }, []);

  return (
    <>
      <HeroSlider />
      <Section>
        <SectionTitle title="có thể bạn muốn nghe" />
        <div className="grid">
          <div className="row">
            {albumTest.map((item, index) => (
              <div key={index} className="col l-2-4">
                <CardAlbum album={item} />
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section>
        <SectionTitle title="nổi bật trong tuần" />
        <div className="grid">
          <div className="row">
            {albumTest.map((item, index) => (
              <div key={index} className="col l-2-4">
                <CardAlbum album={item} indexAlbum={index} />
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section>
        <SectionTitle title="Top bài hát nghe nhiều" />
        {topSongs.map((item, index) => (
          <Song
            key={item.id}
            song={item}
            indexSong={index}
            songs={topSongs ? topSongs : []}
          />
        ))}
      </Section>
    </>
  );
};

Discover.propTypes = {};

export default Discover;
