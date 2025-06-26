import React, { useEffect, useState } from 'react';
import styles from './DocumentsGrid.module.css';
import API_URL from '../../config';

const DocumentsGrid = () => {
  const [docs, setDocs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const response = await fetch(`${API_URL}/api/documents`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDocs(data);
      } catch (e) {
        setError('Не удалось загрузить документы.');
        console.error(e);
      }
    };
    fetchDocs();
  }, []);

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <div className={styles.docsGridContainer}>
      <div className={styles.grid}>
        {docs.map(doc => (
          <div key={doc.id} className={styles.card}>
            <img src={`${API_URL}/${doc.photo}`} alt="Документ" className={styles.cardImage} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentsGrid; 