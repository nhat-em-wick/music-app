import React, { useRef } from "react";
import PropTypes from "prop-types";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore,{ Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import './hero-slider.scss'
SwiperCore.use([Navigation])
const HeroSlider = (props) => {

  const nextSlideRef = useRef(null)
  const prevSlideRef = useRef(null)

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={3}
        navigation={{
          prevEl: prevSlideRef.current,
          nextEl: nextSlideRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevSlideRef.current;
          swiper.params.navigation.nextEl = nextSlideRef.current;
        }}
        loop={true}
        spaceBetween={50}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          600: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
      >
        <SwiperSlide>
          <div className="slide">
            <div
              className="slide__item"
              style={{
                background: `url('https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/d/a/c/6/dac69cd1300a635c193c0f03e8d6d617.jpg') center right / cover no-repeat`,
              }}
            ></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide">
            <div
              className="slide__item"
              style={{
                background: `url('https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/d/a/c/6/dac69cd1300a635c193c0f03e8d6d617.jpg') top center / cover no-repeat`,
              }}
            ></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide">
            <div
              className="slide__item"
              style={{
                background: `url('https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_webp/cover/d/a/c/6/dac69cd1300a635c193c0f03e8d6d617.jpg') top center / cover no-repeat`,
              }}
            ></div>
          </div>
        </SwiperSlide>
        <div ref={prevSlideRef} className="swiper-btn-prev">
          <i className="bx bx-chevron-left"></i>
        </div>
        <div ref={nextSlideRef} className="swiper-btn-next">
          <i className="bx bx-chevron-right"></i>
        </div>
      </Swiper>
    </>
  );
};

HeroSlider.propTypes = {};

export default HeroSlider;
