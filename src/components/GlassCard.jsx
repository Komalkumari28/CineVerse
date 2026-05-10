import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Play, Plus, Info } from 'lucide-react';
import { IMAGES } from '../services/tmdbApi';
import { motion } from 'framer-motion';

const GlassCard = ({ item, type }) => {
  const isMovie = type === 'movie' || item.media_type === 'movie';
  const id = item.id;
  const title = item.title || item.name;
  const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
  const posterPath = item.poster_path;

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.3 }}
      className="glass-card position-relative overflow-hidden h-100"
      style={{ minWidth: '180px' }}
    >
      <Link to={`/${isMovie ? 'movie' : 'tv'}/${id}`} className="text-decoration-none">
        <div className="card-image-wrapper position-relative">
          <img
            src={posterPath ? IMAGES.poster(posterPath) : 'https://via.placeholder.com/500x750?text=No+Image'}
            alt={title}
            className="img-fluid rounded-top"
            loading="lazy"
          />
          
          {/* Overlay on Hover */}
          <div className="card-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-3 opacity-0 hover-opacity-100 transition-smooth"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)' }}>
            <div className="d-flex justify-content-center gap-2 mb-2">
              <button className="btn btn-primary rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                <Play size={16} fill="white" />
              </button>
              <button className="btn btn-outline-light rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '36px', height: '36px' }}>
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Rating Badge */}
          <div className="position-absolute top-0 end-0 m-2 glass-effect px-2 py-1 rounded d-flex align-items-center gap-1 shadow-sm">
            <Star size={12} className="text-warning fill-warning" />
            <span className="small fw-bold text-white" style={{ fontSize: '10px' }}>{rating}</span>
          </div>
        </div>

        <div className="p-2">
          <h6 className="text-white text-truncate mb-1 small fw-bold">{title}</h6>
          <p className="text-secondary small m-0" style={{ fontSize: '10px' }}>
            {item.release_date ? item.release_date.split('-')[0] : item.first_air_date ? item.first_air_date.split('-')[0] : 'N/A'}
          </p>
        </div>
      </Link>
      
      <style>{`
        .card-overlay {
          transition: opacity 0.3s ease;
          background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
        }
        .glass-card:hover .card-overlay {
          opacity: 1 !important;
        }
        .hover-white:hover {
          color: white !important;
        }
      `}</style>
    </motion.div>
  );
};

export default GlassCard;
