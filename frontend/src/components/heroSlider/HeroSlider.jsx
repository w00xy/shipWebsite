import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import styles from './HeroSlider.module.css';

const slides = [
  {
    image: '/image_1.png',
    title: 'Электромонтажные работы',
    description: 'Электромонтажные работы'
  },
  {
    image: '/image_2.png',
    title: 'Сборка ЭРУ и автоматики',
    description: 'Мы занимаемся монтажем электроники на судах'
  },
  {
    image: '/image_3.png',
    title: 'Пусконаладочные работы',
    description: 'Мы строим корабли'
  },

];

const HeroSlider = () => (
  <div className={styles.hero}>
    <div className={styles.heroBlock}>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
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
              <div className={styles.textContainer}>
                <h1 className={styles.title}>{slide.title}</h1>
                <h3 className={styles.description}>{slide.description}</h3>
              </div>
            </div> 
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>
);

export default HeroSlider;