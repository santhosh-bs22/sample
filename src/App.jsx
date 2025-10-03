import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { LanguageProvider } from './contexts/LanguageContext';
import Home from './pages/Home';
import { Movies } from './pages/Movies';
import { Anime } from './pages/Anime';
import { Top10 } from './pages/Top10';
import { Upcoming } from './pages/Upcoming';
import { Languages, LanguagePage } from './pages/Languages'; 
import { Search } from './pages/Search';
import { ContentDetails } from './components/ContentDetails'; // <-- ADDED: Import ContentDetails

function App() {
  // MOVED: State to manage which content item is selected for details view
  const [selectedContent, setSelectedContent] = useState(null);

  // UPDATED: Centralized handler for selecting content
  const handleContentSelect = (id, type) => {
    setSelectedContent({ id, type });
  };
  
  const handleBack = () => setSelectedContent(null); // Handler to dismiss details view

  return (
    <LanguageProvider>
      <Router>
        <Header />
        
        {/* CONDITIONAL RENDERING: Show details or show the main app content */}
        {selectedContent ? (
          <ContentDetails
            itemId={selectedContent.id}
            mediaType={selectedContent.type}
            onBack={handleBack}
          />
        ) : (
          <Routes>
            <Route path="/" element={<Home onContentSelect={handleContentSelect} />} />
            <Route path="/movies" element={<Movies onContentSelect={handleContentSelect} />} />
            <Route path="/anime" element={<Anime onContentSelect={handleContentSelect} />} />
            <Route path="/top10" element={<Top10 onContentSelect={handleContentSelect} />} />
            <Route path="/upcoming" element={<Upcoming onContentSelect={handleContentSelect} />} />
            {/* Languages component now receives and passes the handler down */}
            <Route path="/languages/*" element={<Languages onContentSelect={handleContentSelect} />} /> 
            <Route path="/languages/:lang" element={<LanguagePage onContentSelect={handleContentSelect} />} />
            <Route path="/search" element={<Search onContentSelect={handleContentSelect} />} />
          </Routes>
        )}
      </Router>
    </LanguageProvider>
  );
}

export default App;