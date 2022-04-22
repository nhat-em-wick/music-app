import React from "react";
import PropTypes from "prop-types";
import HeroSlider from "../../components/hero-slider/HeroSlider";
import Section, {SectionTitle} from "../../components/section/Section";
import Song from "../../components/song/Song";
import Card from "../../components/card/Card";


import "./discover.scss";

const Discover = (props) => {
  return (
    <>
      <HeroSlider/>
      <Section>
        <SectionTitle title="có thể bạn muốn nghe"/>
        <div className="grid">
          <div className="row">
            <div className="col l-2-4">
              <Card/>
            </div>
            <div className="col l-2-4">
              <Card/>
            </div>
            <div className="col l-2-4">
              <Card/>
            </div>
            <div className="col l-2-4">
              <Card/>
            </div>
            <div className="col l-2-4">
              <Card/>
            </div>
          </div>
        </div>
      </Section>
      <Section>
        <SectionTitle title="nổi bật trong tuần"/>
        <div className="grid">
          <div className="row">
            <div className="col l-2-4">
              <Card/>
            </div>
            <div className="col l-2-4">
              <Card/>
            </div>
            <div className="col l-2-4">
              <Card/>
            </div>
            <div className="col l-2-4">
              <Card/>
            </div>
            <div className="col l-2-4">
              <Card/>
            </div>
          </div>
        </div>
      </Section>
      <Section>
        <SectionTitle title="Top bài hát nghe nhiều"/>
        <Song />
        <Song />
      </Section>
    </>
  );
};

const SlideItem = (props) => (
  <>
    <div
      className="slide__item"
      style={{
        background: `url('https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/d/a/c/6/dac69cd1300a635c193c0f03e8d6d617.jpg') top center / cover no-repeat`,
      }}
    ></div>
  </>
);

Discover.propTypes = {};

export default Discover;
