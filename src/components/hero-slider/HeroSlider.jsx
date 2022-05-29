import React, { useRef } from "react";
import PropTypes from "prop-types";
import LoadingSkeleton from "../loading-skeleton/LoadingSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import "./hero-slider.scss";
SwiperCore.use([Navigation]);
const HeroSlider = ({ banner }) => {
  const nextSlideRef = useRef(null);
  const prevSlideRef = useRef(null);

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
        freeMode={true}
        spaceBetween={50}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          200: {
            slidesPerView: 1,
            spaceBetweenSlides: 30,
          },
          // when window width is <= 999px
          600: {
            slidesPerView: 2,
            spaceBetweenSlides: 40,
          },
          1023: {
            slidesPerView: 3,
            spaceBetweenSlides: 50,
          },
        }}
      >
        {banner.length > 0 ? (
          <>
            {banner.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="slide">
                  <img src={item.banner} alt="" />
                </div>
              </SwiperSlide>
            ))}
          </>
        ) : (
          <>
            {Array(3)
              .fill()
              .map((item, index) => (
                <SwiperSlide key={index}>
                  <SlideLoading />
                </SwiperSlide>
              ))}
          </>
        )}
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

const SlideLoading = () => (
  <div className="slide">
    <div className="slide__item">
      <LoadingSkeleton style={{ paddingTop: "100%" }} />
    </div>
  </div>
);

HeroSlider.propTypes = {
  banner: PropTypes.array,
};

export default HeroSlider;
