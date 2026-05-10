import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import tmdbApi, { endpoints } from '../services/tmdbApi';
import GlassCard from '../components/GlassCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const performSearch = async () => {
      setLoading(true);
      try {
        const response = await tmdbApi.get(endpoints.search, {
          params: { query }
        });
        setResults(response.data.results.filter(r => r.media_type !== 'person'));
        setLoading(false);
      } catch (error) {
        console.error('Search error:', error);
        setLoading(false);
      }
    };

    const timeout = setTimeout(performSearch, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="search-page bg-dark py-5 min-vh-100">
      <div className="container mt-4">
        <div className="mb-5 text-center">
          <h2 className="text-white fw-bold mb-3">
            {query ? (
              <>Results for <span className="text-gradient">"{query}"</span></>
            ) : (
              <>Search <span className="text-gradient">CineVerse</span></>
            )}
          </h2>
          <p className="text-secondary">Discover your next favorite movie or show</p>
        </div>

        {!query && (
          <div className="d-flex flex-column align-items-center justify-content-center py-5">
            <div className="glass-effect p-4 rounded-circle mb-4">
              <SearchIcon size={64} className="text-secondary opacity-50" />
            </div>
            <h4 className="text-secondary">Type something to start searching...</h4>
          </div>
        )}

        {loading ? (
          <SkeletonLoader count={12} />
        ) : query && results.length > 0 ? (
          <div className="row g-4">
            {results.map((item) => (
              <div key={item.id} className="col-6 col-md-4 col-lg-3 col-xl-2">
                <GlassCard item={item} type={item.media_type} />
              </div>
            ))}
          </div>
        ) : query && (
          <div className="text-center py-5">
            <h4 className="text-secondary">No results found for "{query}"</h4>
            <p className="text-secondary small">Try different keywords or check for typos.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
