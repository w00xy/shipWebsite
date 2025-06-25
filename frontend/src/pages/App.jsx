import React from 'react'
import Header from '../components/header/Header'
import HeroSlider from '../components/heroSlider/HeroSlider'
import WorksGrid from '../components/worksGrid/WorksGrid'
import DocumentsGrid from '../components/documentsGrid/DocumentsGrid'
import Footer from '../components/footer/Footer'
import styles from './App.module.css'

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <div className="container">
        <Header/>
      </div>
      <HeroSlider />
      <div className='container'>
        <div className={styles.info_section}>
          <h2 className={styles.info_section__header}>
            Компания ООО «ЮКО» имеет признание РМРС, свидетельство РКО на рынке судостроения (реновация) и судоремонта с 2007 года.
          </h2>

          <div className={styles.statsContainer}>
            <div className={styles.statItem}>
              <h4 className={styles.statTitle}>18 Лет</h4>
              <p className={styles.statSubtitle}>Мы уже совсем взрослые!</p>
            </div>
            <div className={styles.statItem}>
              <h4 className={styles.statTitle}>15+ Проектов</h4>
              <p className={styles.statSubtitle}>Мы уже очень опытные!</p>
            </div>
            <div className={styles.statItem}>
              <h4 className={styles.statTitle}>5 регионов</h4>
              <p className={styles.statSubtitle}>Мы уже много где!</p>
            </div>
          </div>

          <div id="works" className={styles.worksSection}>
            <h2 className={styles.worksTitle}>Наши работы</h2>
            <p className={styles.worksSubtitle}>Образцы</p>
            <p className={styles.worksSubtitle}>Постройки и ремонта судов</p>
            <WorksGrid categoryId={1} />
          </div>

          <div id="works2" className={styles.worksSection}>
            <p className={styles.worksSubtitle}>Образцы</p>
            <p className={styles.worksSubtitle}>Сборки электрораспределительных щитов</p>
            <WorksGrid categoryId={2} type="panels" />
          </div>

          <div id="works3" className={styles.worksSection}>
            <p className={styles.worksSubtitle}>Образцы</p>
            <p className={styles.worksSubtitle}>Электромонтажных работ</p>
            <WorksGrid categoryId={3} type="panels" />
          </div>
        </div>

        <div className={styles.docsSection}>
          <h2 className={styles.docsTitle}>Лицензии и сертификаты</h2>
          <DocumentsGrid />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
