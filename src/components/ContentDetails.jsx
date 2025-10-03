import React, { useEffect, useState } from 'react';
import { useContentApi } from '../hooks/useContentApi';
import { useContentFormatters } from '../hooks/useContentFormatters';

export const ContentDetails = ({ itemId, mediaType, onBack }) => {
  const { fetchData, loading, error } = useContentApi();
  const { 
    getImageUrl, 
    BACKDROP_SIZE, 
    POSTER_SIZE,
    formatList, 
    formatCurrency, 
    formatRuntime, 
    formatTVStats 
  } = useContentFormatters();
  const [item, setItem] = useState(null);
  const [externalIds, setExternalIds] = useState(null); 

  useEffect(() => {
    const load = async () => {
      // 1. Fetch details and credits
      const detailsData = await fetchData(`/${mediaType}/${itemId}?append_to_response=credits`);
      
      // 2. Fetch external IDs (to get IMDb ID)
      const externalData = await fetchData(`/${mediaType}/${itemId}/external_ids`);
      
      if(detailsData) setItem(detailsData);
      if(externalData) setExternalIds(externalData);

    };
    load();
  }, [itemId, mediaType, fetchData]);

  if(loading) return <div className="details-page-overlay">Loading details...</div>;
  if(error || !item) return <div className="details-page-overlay alert-error">Error loading details: {error}</div>;

  const title = item.title || item.name;
  const tagline = item.tagline;
  const runtime = mediaType==='movie'?formatRuntime(item.runtime):formatTVStats(item);
  const backdrop = getImageUrl(item.backdrop_path, BACKDROP_SIZE);
  const poster = getImageUrl(item.poster_path, POSTER_SIZE);
  const cast = item.credits?.cast?.slice(0, 5) || [];
  const releaseDate = item.release_date || item.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
  const status = item.status;
  const budget = item.budget > 0 ? formatCurrency(item.budget) : 'N/A';
  const revenue = item.revenue > 0 ? formatCurrency(item.revenue) : 'N/A';
  const originalLanguage = item.original_language?.toUpperCase() || 'N/A';
  
  // IMDb Logic
  const imdbId = externalIds?.imdb_id;
  const imdbUrl = imdbId ? `https://www.imdb.com/title/${imdbId}` : null;
  const imdbRating = item.vote_average; 

  return (
    <div className="details-page-overlay">
      <div className="details-header" style={{backgroundImage:`url(${backdrop})`}}>
        <div className="header-overlay"></div>
      </div>
      
      <main className="details-content-container">
        <button className="back-button" onClick={onBack}>← Back</button>
        
        <div className="main-details-layout">
          {/* Poster and Sidebar Info */}
          <div className="details-sidebar">
            <img src={poster} alt={title} className="details-poster-image" />
            <div className="meta-info">
              <h3>Metadata</h3>
              <div className="meta-row"><span className="meta-label">Original Language:</span> <span className="meta-value">{originalLanguage}</span></div>
              <div className="meta-row"><span className="meta-label">Status:</span> <span className="meta-value">{status}</span></div>
              {mediaType === 'movie' && (
                <>
                  <div className="meta-row"><span className="meta-label">Budget:</span> <span className="meta-value">{budget}</span></div>
                  <div className="meta-row"><span className="meta-label">Revenue:</span> <span className="meta-value">{revenue}</span></div>
                </>
              )}
            </div>
          </div>

          {/* Detailed Info */}
          <div className="details-info-section">
            <h2 className="details-title">{title} ({year})</h2>
            {tagline && <p className="details-tagline">{tagline}</p>}

            {/* Stats Grid */}
            <div className="details-grid">
              <div className="stat-box">
                <div className="stat-label">TMDb Rating</div>
                <div className="stat-value">{item.vote_average ? item.vote_average.toFixed(1) : 'N/A'} / 10</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Runtime/Seasons</div>
                <div className="stat-value">{runtime}</div>
              </div>
              <div className="stat-box">
                <div className="stat-label">Genres</div>
                <div className="stat-value">{formatList(item.genres)}</div>
              </div>
              
              {/* IMDb Link */}
              {imdbUrl && (
                <a href={imdbUrl} target="_blank" rel="noopener noreferrer" className="imdb-link-box stat-box">
                    <div className="stat-label">View on IMDb</div>
                    <div className="stat-value">IMDb Link →</div>
                </a>
              )}
              
            </div>

            {/* Overview / Synopsis */}
            <div className="synopsis-box">
              <h3 className="synopsis-title">Overview</h3>
              <p className="synopsis-text">{item.overview || 'No overview available.'}</p>
            </div>
            
            {/* Cast Information */}
            {cast.length > 0 && (
                <div className="cast-box">
                    <h3 className="synopsis-title">Top Cast</h3>
                    <div className="cast-list">
                        {cast.map(c => (
                            <span key={c.id} className="cast-member">{c.name} as {c.character}</span>
                        ))}
                    </div>
                </div>
            )}
            
          </div>
        </div>
      </main>
    </div>
  );
};