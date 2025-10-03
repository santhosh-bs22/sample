import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const LANGS = ['english','tamil','hindi','telugu','malayalam'];

export const Header = () => {
  const { language, setLanguage } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to the /search route with the query parameter
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(''); // Clear input after search
    }
  };

  return (
    <header className="header-bar">
      <h1 className="app-title"><Link to="/">MY NOIR MOVIE</Link></h1>
      
      {/* ADDED: Search Form */}
      <form onSubmit={handleSearch} className="search-form">
        <input 
          type="text" 
          placeholder="Search movies, series, anime..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">🔍</button>
      </form>
      
      <nav className="nav-links">
        <NavLink to="/movies">Movies</NavLink>
        <NavLink to="/anime">Anime</NavLink>
        <NavLink to="/top10">Top 10</NavLink>
        <NavLink to="/upcoming">Upcoming</NavLink>
        <NavLink to="/languages">Languages</NavLink>
      </nav>
      
    </header>
  );
};