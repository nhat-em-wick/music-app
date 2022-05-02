import React, {memo} from "react";
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
        {
          Array(6).fill(0).map((item, index) => (
            <Song key={index}/>
          ))
        }
      </Section>
    </>
  );
};



Discover.propTypes = {};

export default Discover;
