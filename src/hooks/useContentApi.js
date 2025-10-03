import { useState, useCallback } from 'react';

const API_KEY = "231e48f082594b3296ccf5cbd7cea491";
const API_BASE_URL = "https://api.themoviedb.org/3";

export const useContentApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (endpoint) => {
    setLoading(true); setError(null);
    const separator = endpoint.includes("?") ? "&" : "?";
    const url = `${API_BASE_URL}${endpoint}${separator}api_key=${API_KEY}&language=en-US`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally { setLoading(false); }
  }, []);

  return { fetchData, loading, error, setError };
};
