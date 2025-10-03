// /src/pages/Home.jsx

import React, { useEffect, useState } from 'react';
import { useContentApi } from '../hooks/useContentApi'; 
import { MainContentGrid } from '../components/MainContentGrid'; 
// REMOVED: import of ContentDetails (now in App.jsx)

const Home = ({ onContentSelect }) => {
  const { fetchData, loading, error } = useContentApi(); 
  
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    const load = async () => {
      // Fetch trending content for the day (popular default endpoint)
      const endpoint = `/trending/all/day`; 
      const data = await fetchData(endpoint);
      if (data?.results) {
        // Filter out items without a poster AND ensure media_type is not 'person'
        setItems(data.results.filter(i => i.poster_path && i.media_type !== 'person'));
      } else {
        setItems([]);
      }
    };
    load();
  }, [fetchData]);

  return (
    <main className="main-content">
      <MainContentGrid
          items={items}
          loading={loading}
          error={error}
          isSearching={false}
          query="Trending Content" 
          onContentSelect={onContentSelect} // Use the global handler
      />
    </main>
  );
};

export default Home;