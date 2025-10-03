import React, { useEffect, useState } from 'react';
import { useContentApi } from '../hooks/useContentApi';
import { MainContentGrid } from '../components/MainContentGrid';
import { useLanguage } from '../contexts/LanguageContext';
import { LANGUAGE_CODES } from "../utils/language";

export const Movies = ({ onContentSelect }) => {
  const { fetchData, loading, error } = useContentApi();
  const { language } = useLanguage();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      // TMDB discover movies — filter by original language
      const langCode = LANGUAGE_CODES[language] || 'en';
      const endpoint = `/discover/movie?sort_by=popularity.desc&with_original_language=${langCode}`;
      const data = await fetchData(endpoint);
      if (data?.results) {
        // FIXED: Map results to explicitly include media_type: 'movie'
        setItems(data.results.filter(i => i.poster_path).map(i => ({ ...i, media_type: 'movie' })));
      } else {
        setItems([]);
      }
    };
    load();
  }, [fetchData, language]);

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