import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // <-- Link MUST be imported here
import { useContentApi } from '../hooks/useContentApi';
import { MainContentGrid } from '../components/MainContentGrid';
import { LANGUAGE_CODES } from '../utils/language';

// NEW COMPONENT: Languages index page
export const Languages = () => {
  // Get the list of languages from the utility file keys
  const languageKeys = Object.keys(LANGUAGE_CODES);

  return (
    <main className="main-content">
      <h2 className="section-title">Browse by Original Language</h2>
      {/* Simple grid to display language links, using inline style for brevity */}
      <div className="language-list-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '1rem',
        marginTop: '2rem'
      }}>
        {languageKeys.map(lang => (
          <Link to={`/languages/${lang}`} key={lang} style={{
            textDecoration: 'none',
            padding: '1rem',
            borderRadius: '8px',
            backgroundColor: 'var(--card)', 
            color: 'var(--text)', 
            textAlign: 'center',
            fontWeight: '600',
            transition: 'transform 0.2s',
          }}
          // Basic hover effect for better UX
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {/* Capitalize first letter for display */}
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </Link>
        ))}
      </div>
    </main>
  );
};


// EXISTING COMPONENT: Logic for language-specific movies
export const LanguagePage = ({ onContentSelect }) => {
  const { lang } = useParams();
  const { fetchData, loading, error } = useContentApi();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      const code = LANGUAGE_CODES[lang] || 'en';
      const data = await fetchData(`/discover/movie?with_original_language=${code}`);
      setItems(data?.results || []);
    };
    load();
  }, [lang, fetchData]);

  return <MainContentGrid items={items} loading={loading} error={error} onContentSelect={onContentSelect} query={lang} />;
};