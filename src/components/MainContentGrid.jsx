import React from 'react';
import { ContentCard } from './ContentCard';

export const MainContentGrid = ({ items, loading, error, query, onContentSelect }) => (
  <main className="main-content">
    {error && <div className="alert-error">{error}</div>}
    <h2>{query ? `Results for "${query}"` : 'Trending Content'}</h2>
    {loading && <div className="loading-indicator">Loading...</div>}
    <div className="content-grid">
      {items?.map(item => <ContentCard key={item.id} item={item} onSelect={onContentSelect} />)}
    </div>
  </main>
);
