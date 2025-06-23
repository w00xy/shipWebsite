import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import styles from './HeroSlider.module.css';

const slides = [
  {
  image: '/image_1.png',
  title: 'Электромонтажные работы',
  },
  {
    image: '/image_2.png',
    title: 'Проектирование судовых систем',
  },
  {
    image: '/image_3.png',
    title: 'Пусконаладочные работы',
  },

];

const HeroSlider = () => (
  <div className={styles.hero}>
    <Swiper
      modules={[Autoplay]}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 7000, disableOnInteraction: false }}
      speed={800}
      effect="slide"
      allowTouchMove={true}
      style={{ height: '100vh' }}
    >
      {slides.map((slide, idx) => (
        <SwiperSlide key={idx}>
          <div
            className={styles.slide}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className={styles.overlay} />
            <h1 className={styles.title}>{slide.title}</h1>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default HeroSlider;