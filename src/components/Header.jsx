import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const LANGS = ['english','tamil','hindi','telugu','malayalam'];

export const Header = () => {
  const { language, setLanguage } = useLanguage();
  return (
    <header className="header-bar">
      <h1 className="app-title"><Link to="/">MY NOIR MOVIE</Link></h1>
      <nav className="nav-links">
        <NavLink to="/movies">Movies</NavLink>
        <NavLink to="/anime">Anime</NavLink>
        <NavLink to="/top10">Top 10</NavLink>
        <NavLink to="/upcoming">Upcoming</NavLink>
        <NavLink to="/languages">Languages</NavLink>
      </nav>
      <select value={language} onChange={e => setLanguage(e.target.value)}>
        {LANGS.map(l => <option key={l} value={l}>{l[0].toUpperCase() + l.slice(1)}</option>)}
      </select>
    </header>
  );
};