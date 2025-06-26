import React, { useEffect, useState } from 'react';
import styles from './WorksGrid.module.css';
import API_URL from '../../config';

const WorksGrid = ({ categoryId, type = 'default' }) => {
  const [works, setWorks] = useState([]);
  const [visibleCount, setVisibleCount] = useState(type === 'panels' ? 3 : 4);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await fetch(`${API_URL}/api/works/${categoryId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWorks(data);
      } catch (e) {
        console.error("Failed to fetch works:", e);
        setError("Не удалось загрузить работы. Пожалуйста, проверьте консоль для деталей.");
      }
    };

    fetchWorks();
  }, [categoryId]);

  const showMore = () => {
    setVisibleCount(works.length);
  };

  const containerClass = `${styles.worksGridContainer} ${type === 'panels' ? styles.panelsContainer : ''}`;
  const cardClass = `${styles.card} ${type === 'panels' ? styles.panelCard : ''}`;

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <div className={containerClass}>
      <div className={styles.grid}>
        {works.slice(0, visibleCount).map(work => (
          <div key={work.id} className={cardClass}>
            <img src={`${API_URL}/${work.photo}`} alt={work.title} className={styles.cardImage} />
            {type === 'default' && (
              <>
                <div className={styles.cardOverlay} />
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{work.title}</h3>
                  <p className={styles.cardDescription}>{work.description}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      {works.length > visibleCount && (
        <button onClick={showMore} className={styles.moreButton}>
          Еще
        </button>
      )}
    </div>
  );
};

export default WorksGrid; 