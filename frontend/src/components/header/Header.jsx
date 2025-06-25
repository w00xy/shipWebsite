import React, { useEffect, useState } from 'react';
import styles from './header.module.css';

const Header = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setShow(true);
        setLastScrollY(window.scrollY);
        return;
      }
      if (window.scrollY > lastScrollY) {
        setShow(false); // скроллим вниз — скрыть
      } else {
        setShow(true); // скроллим вверх — показать
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Закрывать меню при изменении ширины окна или скролле
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 700) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Блокировка прокрутки body при открытом меню
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Не применять transformY, если меню открыто
  const wrapperClass = [
    styles.headerWrapper,
    !show && !menuOpen ? styles.hide : '',
  ].join(' ');

  return (
    <>
      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}
      <div className={wrapperClass}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <h1>ООО</h1>
            <img src="anchor.svg" alt="" className={styles.anchor}/>
            <h1>ЮКО</h1>
          </div>
          <button
            className={styles.burger}
            aria-label="Открыть меню"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
            <span className={styles.burgerLine}></span>
          </button>
          <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
            <a href="#works" onClick={() => setMenuOpen(false)}>Наши работы</a>
            <a href="#contacts" onClick={() => setMenuOpen(false)}>Контакты</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>О нас</a>
          </nav>
        </header>
      </div>
    </>
  );
};

export default Header;
