import React, { useState, useEffect, useRef } from 'react';
import styles from './HeroSlider.module.css';

const slides = [
  {
    image: 'image_1.png',
    title: 'Электромонтажные работы',
  },
  {
    image: 'image_2.png',
    title: 'Проектирование судовых систем',
  },
  {
    image: 'image_3.png',
    title: 'Пусконаладочные работы',
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  return (
    <div className={styles.hero}>
      <div
        className={styles.sliderTrack}
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide, idx) => (
          <div
            className={styles.slide}
            key={idx}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className={styles.overlay} />
            <h1 className={styles.title}>{slide.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;