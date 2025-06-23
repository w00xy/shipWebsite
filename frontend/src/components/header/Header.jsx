import React from 'react';
import styles from './header.module.css';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.logo}>
      <h1>ООО</h1>
      <img src="anchor.svg" alt="" className={styles.anchor}/>
      <h1>ЮКО</h1>
    </div>
    <nav className={styles.nav}>
      <a href="#works">Наши работы</a>
      <a href="#contacts">Контакты</a>
      <a href="#about">О нас</a>
    </nav>
  </header>
);

export default Header;
