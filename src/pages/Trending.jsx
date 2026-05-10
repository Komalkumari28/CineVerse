import React, { useState, useEffect } from 'react';
import tmdbApi, { endpoints } from '../services/tmdbApi';
import GlassCard from '../components/GlassCard';
import SkeletonLoader from '../components/SkeletonLoader';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { TrendingUp } from 'lucide-react';

const Trending = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const fetchItems = async (isNew = false) => {
    try {
      const currentPage = isNew ? 1 : page;
      const response = await tmdbApi.get('/trending/all/week', {
        params: { page: currentPage }
      });
      const newItems = response.data.results.filter(r => r.media_type !== 'person');
      
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
      console.error('Error fetching trending:', error);
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
    fetchItems(true);
  }, []);

  return (
    <div className="trending-page bg-dark py-5 min-vh-100">
      <div className="container mt-4">
        <div className="text-center mb-5">
          <div className="d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill glass-effect border-secondary mb-3">
            <TrendingUp size={20} className="text-primary" />
            <span className="text-white fw-bold">Currently Hot</span>
          </div>
          <h2 className="text-white display-4 fw-bold">Trending <span className="text-gradient">This Week</span></h2>
          <p className="text-secondary">The most watched movies and shows globally right now</p>
        </div>

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
                <GlassCard item={item} type={item.media_type} />
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

export default Trending;
