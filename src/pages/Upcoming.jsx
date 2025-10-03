import React, { useEffect, useState } from 'react';
import { useContentApi } from '../hooks/useContentApi';
import { MainContentGrid } from '../components/MainContentGrid';

export const Upcoming = ({ onContentSelect }) => {
  const { fetchData, loading, error } = useContentApi();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      const endpoint = `/movie/upcoming`;
      const data = await fetchData(endpoint);
      if (data?.results) {
        // FIXED: Map results to explicitly include media_type: 'movie'
        setItems(data.results.filter(i => i.poster_path).map(i => ({ ...i, media_type: 'movie' })));
      } else setItems([]);
    };
    load();
  }, [fetchData]);

  return (
    <MainContentGrid
      items={items}
      loading={loading}
      error={error}
      isSearching={false}
      query=""
      onContentSelect={onContentSelect}
    />
  );
};