import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { LanguageProvider } from './contexts/LanguageContext';
import Home from './pages/Home';
import { Movies } from './pages/Movies';
import { Anime } from './pages/Anime';
import { Top10 } from './pages/Top10';
import { Upcoming } from './pages/Upcoming';
// Ensure these two components are imported from the correct single file
import { Languages, LanguagePage } from './pages/Languages'; 

function App() {
  const handleContentSelect = (id, type) => {};
  return (
    <LanguageProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home onContentSelect={handleContentSelect} />} />
          <Route path="/movies" element={<Movies onContentSelect={handleContentSelect} />} />
          <Route path="/anime" element={<Anime onContentSelect={handleContentSelect} />} />
          <Route path="/top10" element={<Top10 onContentSelect={handleContentSelect} />} />
          <Route path="/upcoming" element={<Upcoming onContentSelect={handleContentSelect} />} />
          <Route path="/languages" element={<Languages />} />
          <Route path="/languages/:lang" element={<LanguagePage onContentSelect={handleContentSelect} />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;