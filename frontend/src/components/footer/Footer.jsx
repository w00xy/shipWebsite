import React from 'react';
import styles from './Footer.module.css';
import logo from '../../../public/anchor.svg'; // Убедитесь, что путь к логотипу верный

const Footer = () => {
  return (
    <footer id="contacts" className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.logoSection}>
          <img src={logo} alt="ЮКО" className={styles.logo} />
          <span className={styles.companyName}>ООО «ЮКО»</span>
        </div>
        <div className={styles.linksSection}>
          <div id="contacts-block" className={styles.column}>
            <h3 className={styles.title}>Контакты</h3>
            <a href="tel:+70000000000" className={styles.link}>+7 000 000-00-00</a>
            <a href="mailto:oooyuko@yandex.ru" className={styles.link}>oooyuko@yandex.ru</a>
            <p className={styles.address}>346720, Ростовская область, Аксай, Промышленная, 2в</p>
          </div>
          <div className={styles.column}>
            <h3 className={styles.title}>Наши работы</h3>
            <a href="#works" className={styles.link}>Постройка и ремонт судов</a>
            <a href="#works2" className={styles.link}>Сборка электрораспределительных щитов</a>
            <a href="#works3" className={styles.link}>Электромонтажные работы</a>
          </div>
          <div className={`${styles.column} ${styles.aboutColumn}`}>
            <h3 id="about" className={styles.title}>О компании</h3>
            <p className={styles.aboutText}>
              ООО «ЮКО» производит широкий спектр электромонтажных работ, начиная от изготовления проектной документации, проведения электроремонтных работ, электромонтажных работ на вновь строящихся судах и на судах проходящих глубокую модернизацию. А так же выполняем пусконаладочные и сдаточные работы с участием в ходовых испытаниях.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 