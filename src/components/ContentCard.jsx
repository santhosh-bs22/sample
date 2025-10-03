import React, { useRef, useEffect } from 'react';
import { useContentFormatters } from '../hooks/useContentFormatters';

export const ContentCard = ({ item, onSelect }) => {
  const cardRef = useRef(null);
  const { getImageUrl, POSTER_SIZE } = useContentFormatters();

  useEffect(() => {
    if(cardRef.current){
      setTimeout(() => { cardRef.current.style.opacity = 1; cardRef.current.style.transform = 'translateY(0)'; }, 50);
    }
  }, []);

  const title = item.title || item.name;
  const releaseDate = item.release_date || item.first_air_date;
  const poster = getImageUrl(item.poster_path, POSTER_SIZE);

  return (
    <div ref={cardRef} className="content-card" onClick={() => onSelect(item.id, item.media_type)}>
      <img src={poster} alt={title} className="card-image" />
      <div className="card-overlay">
        <h3>{title}</h3>
        <p>{releaseDate ? new Date(releaseDate).getFullYear() : 'N/A'}</p>
      </div>
    </div>
  );
};
