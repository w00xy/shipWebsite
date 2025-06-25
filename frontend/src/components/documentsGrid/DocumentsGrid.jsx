import React, { useEffect, useState } from 'react';
import styles from './DocumentsGrid.module.css';

const DocumentsGrid = () => {
  const [docs, setDocs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/documents');
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
            <img src={`http://localhost:8000/${doc.photo}`} alt="Документ" className={styles.cardImage} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentsGrid; 