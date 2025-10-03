// src/pages/Search.jsx

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useContentApi } from '../hooks/useContentApi';
import { MainContentGrid } from '../components/MainContentGrid';

export const Search = ({ onContentSelect }) => {
  // Hook to read the 'q' parameter from the URL
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const { fetchData, loading, error } = useContentApi();
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Only run the search if a query exists
    if (!query) {
        setItems([]);
        return;
    }

    const load = async () => {
      // Use the multi-search endpoint to find movies, TV shows, and anime.
      const endpoint = `/search/multi?query=${encodeURIComponent(query)}`;
      const data = await fetchData(endpoint);
      
      if (data?.results) {
        // Filter out people (media_type !== 'person') and items without posters
        setItems(data.results.filter(i => i.media_type !== 'person' && i.poster_path));
      } else {
        setItems([]);
      }
    };
    load();
  }, [fetchData, query]); // Re-run effect whenever the query changes

  return (
    <MainContentGrid
      items={items}
      loading={loading}
      error={error}
      isSearching={!!query}
      query={query} // Pass query for display purposes
      onContentSelect={onContentSelect}
    />
  );
};