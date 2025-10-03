import React, { useEffect, useState } from 'react';
import { useParams, Link, Routes, Route, useNavigate } from 'react-router-dom'; // <-- ADDED: useNavigate
import { useContentApi } from '../hooks/useContentApi';
import { MainContentGrid } from '../components/MainContentGrid';
import { LANGUAGE_CODES } from '../utils/language';

// Component to display the default movies (e.g., English) and the language selection links
const DefaultLanguageView = ({ onContentSelect }) => {
    const defaultLang = 'english';
    const defaultCode = LANGUAGE_CODES[defaultLang] || 'en';

    const { fetchData, loading, error } = useContentApi();
    const [defaultItems, setDefaultItems] = useState([]);

    useEffect(() => {
        const load = async () => {
            // Fetch popular movies for the default language (English/en)
            const endpoint = `/discover/movie?sort_by=popularity.desc&with_original_language=${defaultCode}`;
            const data = await fetchData(endpoint);
            // Map results to explicitly include media_type: 'movie'
            setDefaultItems(data?.results?.filter(i => i.poster_path).map(i => ({ ...i, media_type: 'movie' })) || []);
        };
        load();
    }, [fetchData]);

    const languageKeys = Object.keys(LANGUAGE_CODES);

    return (
        <>
            <h2 className="section-title">Select Language Filter</h2>
            <div className="language-list-grid">
                {languageKeys.map(lang => (
                    // Uses the .language-card class for the desired design/corner effect
                    <Link to={`/languages/${lang}`} key={lang} className="language-card">
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </Link>
                ))}
            </div>

            {/* Display the default content grid */}
            <MainContentGrid
                items={defaultItems}
                loading={loading}
                error={error}
                onContentSelect={onContentSelect}
                query={`Popular Movies (Default: ${defaultLang.charAt(0).toUpperCase() + defaultLang.slice(1)})`}
            />
        </>
    );
};


// EXISTING COMPONENT: Logic for language-specific movies
export const LanguagePage = ({ onContentSelect }) => {
  const { lang } = useParams();
  const { fetchData, loading, error } = useContentApi();
  const [items, setItems] = useState([]);
  const navigate = useNavigate(); // <-- ADDED: Initialize navigator

  useEffect(() => {
    const load = async () => {
      const code = LANGUAGE_CODES[lang] || 'en';
      const data = await fetchData(`/discover/movie?sort_by=popularity.desc&with_original_language=${code}`);
      
      // Map results to explicitly include media_type: 'movie'
      setItems(data?.results?.filter(i => i.poster_path).map(i => ({ ...i, media_type: 'movie' })) || []);
    };
    load();
  }, [lang, fetchData]);

  // Capitalize first letter of the language name for display
  const displayLang = lang.charAt(0).toUpperCase() + lang.slice(1);
  
  return (
    <>
        {/* ADDED: Button to go back to the language selection index page */}
        <button 
            onClick={() => navigate('/languages')} 
            className="back-to-filter-button" 
        >
            ← Change Language Filter
        </button>
        <MainContentGrid 
            items={items} 
            loading={loading} 
            error={error} 
            onContentSelect={onContentSelect} 
            query={`Movies in ${displayLang}`} 
        />
    </>
  );
};


// Main Languages Router Component
export const Languages = ({ onContentSelect }) => {
  return (
    <main className="main-content">
      <Routes>
        {/* Route for the list of languages (the index view) - NOW SHOWS DEFAULT CONTENT */}
        <Route path="/" element={<DefaultLanguageView onContentSelect={onContentSelect} />} />
        
        {/* Route for the specific language page */}
        <Route path=":lang" element={<LanguagePage onContentSelect={onContentSelect} />} />
      </Routes>
    </main>
  );
};