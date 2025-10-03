import React, { useEffect, useState } from 'react';
import { useContentApi } from '../hooks/useContentApi';
import { MainContentGrid } from '../components/MainContentGrid';

export const Anime = ({ onContentSelect }) => {
  const { fetchData, loading, error } = useContentApi();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      // TMDB doesn't have an "anime" type but many anime are categorized under "tv" and have keyword "anime"
      // we use search with keyword 'anime' or /discover/tv with with_genres=16 (Animation) + query keyword
      const endpoint = `/search/multi?query=anime`;
      const data = await fetchData(endpoint);
      if (data?.results) {
        // keep movies & tv only and those with poster
        setItems(data.results.filter(i => (i.media_type === 'tv' || i.media_type === 'movie') && i.poster_path));
      } else {
        setItems([]);
      }
    };
    load();
  }, [fetchData]);

  return (
    <MainContentGrid
      items={items}
      loading={loading}
      error={error}
      isSearching={false}
      query="anime"
      onContentSelect={onContentSelect}
    />
  );
};
