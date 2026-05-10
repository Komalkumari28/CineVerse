import React from 'react';
import { Play, Info, Plus, Check, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { IMAGES } from '../services/tmdbApi';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import useWatchlist from '../hooks/useWatchlist';

const HeroBanner = ({ movie }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  if (!movie) return null;

  const handleWatchlist = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist({ ...movie, media_type: movie.media_type || 'movie' });
    }
  };

  return (
    <div className="hero-banner position-relative w-100 vh-80 d-flex align-items-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%), url(${IMAGES.backdrop(movie.backdrop_path)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 20%',
        minHeight: '600px',
        marginTop: '-70px' // Offset navbar height
      }}>
      
      <div className="container position-relative z-1 pt-5">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="col-12 col-md-8 col-lg-6"
        >
          <span className="badge bg-primary mb-3 px-3 py-2 rounded-pill" style={{ backgroundColor: 'var(--primary-purple) !important' }}>
            Featured
          </span>
          <h1 className="display-3 fw-bold text-white mb-3 text-shadow">
            {movie.title || movie.name}
          </h1>
          
          <div className="d-flex align-items-center gap-3 mb-4 text-white-50">
            <span className="fw-bold text-warning d-flex align-items-center gap-1">
              ⭐ {movie.vote_average?.toFixed(1)}
            </span>
            <span>|</span>
            <span>{movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0]}</span>
            <span>|</span>
            <span className="text-uppercase small border border-secondary px-2 rounded">HD</span>
          </div>

          <p className="lead text-white-50 mb-5 line-clamp-3 fs-5" style={{ maxWidth: '600px' }}>
            {movie.overview}
          </p>

          <div className="d-flex flex-wrap gap-3">
            <button 
              className="btn btn-primary btn-lg rounded-pill px-5 py-3 d-flex align-items-center gap-2 shadow-lg scale-hover"
              onClick={() => navigate(`/${movie.media_type || 'movie'}/${movie.id}`)}
            >
              <Play fill="white" size={24} />
              <span className="fw-bold">Watch Now</span>
            </button>
            <button 
              className={`btn btn-lg rounded-pill px-5 py-3 d-flex align-items-center gap-2 glass-effect scale-hover ${isInWatchlist(movie.id) ? 'btn-primary' : 'btn-outline-light'}`}
              style={isInWatchlist(movie.id) ? { backgroundColor: 'var(--primary-purple) !important', borderColor: 'var(--primary-purple) !important' } : {}}
              onClick={handleWatchlist}
            >
              {isInWatchlist(movie.id) ? <Check size={24} /> : <Plus size={24} />}
              <span className="fw-bold">{isInWatchlist(movie.id) ? 'In Watchlist' : 'Watchlist'}</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="position-absolute bottom-0 start-0 w-100 h-25" 
        style={{ background: 'linear-gradient(to top, var(--dark-bg), transparent)' }}>
      </div>

      <style>{`
        .vh-80 { height: 80vh; }
        .text-shadow { text-shadow: 2px 2px 10px rgba(0,0,0,0.5); }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .scale-hover { transition: transform 0.2s ease; }
        .scale-hover:hover { transform: scale(1.05); }
      `}</style>
    </div>
  );
};

export default HeroBanner;
