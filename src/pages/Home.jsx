import React, { useState, useEffect } from 'react';
import tmdbApi, { endpoints } from '../services/tmdbApi';
import HeroBanner from '../components/HeroBanner';
import MovieRow from '../components/MovieRow';
import SkeletonLoader from '../components/SkeletonLoader';

const Home = () => {
  const [heroMovie, setHeroMovie] = useState(null);
  const [rows, setRows] = useState({
    trending: [],
    popular: [],
    topRated: [],
    upcoming: [],
    tvShows: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trending, popular, topRated, upcoming, tvShows] = await Promise.all([
          tmdbApi.get(endpoints.trending),
          tmdbApi.get(endpoints.popular),
          tmdbApi.get(endpoints.topRated),
          tmdbApi.get(endpoints.upcoming),
          tmdbApi.get(endpoints.tvPopular)
        ]);

        setRows({
          trending: trending.data.results,
          popular: popular.data.results,
          topRated: topRated.data.results,
          upcoming: upcoming.data.results,
          tvShows: tvShows.data.results
        });

        // Set a random movie from trending as hero
        const randomHero = trending.data.results[Math.floor(Math.random() * trending.data.results.length)];
        setHeroMovie(randomHero);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching home data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-dark min-vh-100">
        <SkeletonLoader type="hero" />
        <div className="container mt-5">
          <SkeletonLoader count={6} />
          <div className="mt-5"><SkeletonLoader count={6} /></div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page bg-dark pb-5">
      <HeroBanner movie={heroMovie} />
      
      <div className="container-fluid px-0 mt-n5 position-relative z-2">
        <MovieRow title="Trending Now" items={rows.trending} />
        <MovieRow title="Popular Movies" items={rows.popular} />
        <MovieRow title="Top Rated" items={rows.topRated} />
        <MovieRow title="Upcoming Releases" items={rows.upcoming} />
        <MovieRow title="TV Shows" items={rows.tvShows} type="tv" />
      </div>
    </div>
  );
};

export default Home;
