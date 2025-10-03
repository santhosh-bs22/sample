import React, { useEffect, useState } from 'react';
import { useContentApi } from '../hooks/useContentApi';
import { ContentCard } from '../components/ContentCard';

export const Top10 = ({ onContentSelect }) => {
  const { fetchData, loading, error } = useContentApi();
  const [top10, setTop10] = useState([]);

  useEffect(() => {
    const load = async () => {
      // get popular movies (or discover sorted by vote_average & with vote_count threshold)
      const endpoint = `/discover/movie?sort_by=vote_average.desc&vote_count.gte=500`;
      const data = await fetchData(endpoint);
      if (data?.results) {
        // sort by vote_average then pick top 10
        const sorted = data.results
          .filter(r => r.poster_path)
          .sort((a,b) => b.vote_average - a.vote_average)
          .slice(0,10);
        setTop10(sorted);
      } else setTop10([]);
    };
    load();
  }, [fetchData]);

  return (
    <main className="main-content">
      <h2 className="section-title">Top 10 Movies</h2>
      {error && <div className="alert-error">{error}</div>}
      {loading && <div className="loading-indicator"><span className="spinner"></span> Loading Top 10...</div>}

      <div className="top10-grid">
        {top10.map((item, idx) => (
          <div key={item.id} className="top10-card" onClick={() => onContentSelect(item.id, 'movie')}>
            <div className="top10-rank">#{idx+1}</div>
            <ContentCard item={{...item, media_type:'movie'}} onSelect={() => onContentSelect(item.id,'movie')} />
          </div>
        ))}
      </div>
    </main>
  );
};
