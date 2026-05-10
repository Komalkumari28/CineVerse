import React, { useState, useEffect } from 'react';
import tmdbApi from '../services/tmdbApi';
import GlassCard from '../components/GlassCard';
import GenreFilter from '../components/GenreFilter';
import SkeletonLoader from '../components/SkeletonLoader';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const TVShows = () => {
  const [items, setItems] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  // Fetch TV Genres
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await tmdbApi.get('/genre/tv/list');
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, []);

  // Fetch TV Items
  const fetchItems = async (isNew = false) => {
    try {
      const currentPage = isNew ? 1 : page;
      const params = {
        page: currentPage,
        with_genres: selectedGenre || undefined
      };
      
      const response = await tmdbApi.get('/discover/tv', { params });
      const newItems = response.data.results;
      
      if (isNew) {
        setItems(newItems);
      } else {
        setItems((prev) => [...prev, ...newItems]);
      }
      
      setHasMore(currentPage < response.data.total_pages);
      setPage(currentPage + 1);
      setLoading(false);
      setIsFetching(false);
    } catch (error) {
      console.error('Error fetching TV shows:', error);
      setLoading(false);
      setIsFetching(false);
    }
  };

  const loadMore = () => {
    if (hasMore && !isFetching) {
      setIsFetching(true);
      fetchItems();
    }
  };

  const [isFetching, setIsFetching, lastElementRef] = useInfiniteScroll(loadMore);

  useEffect(() => {
    setLoading(true);
    setPage(1);
    fetchItems(true);
  }, [selectedGenre]);

  return (
    <div className="tv-shows-page bg-dark py-5 min-vh-100">
      <div className="container mt-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2 className="text-white fw-bold">Explore <span className="text-gradient">TV Shows</span></h2>
          <span className="text-secondary small">{items.length} series found</span>
        </div>

        <GenreFilter 
          genres={genres} 
          selectedGenre={selectedGenre} 
          onGenreSelect={setSelectedGenre} 
        />

        {loading ? (
          <SkeletonLoader count={12} />
        ) : (
          <div className="row g-4">
            {items.map((item, index) => (
              <div 
                key={`${item.id}-${index}`} 
                className="col-6 col-md-4 col-lg-3 col-xl-2"
                ref={index === items.length - 1 ? lastElementRef : null}
              >
                <GlassCard item={item} type="tv" />
              </div>
            ))}
          </div>
        )}

        {isFetching && (
          <div className="mt-5">
            <SkeletonLoader count={6} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TVShows;
