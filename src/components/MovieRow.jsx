import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GlassCard from './GlassCard';

const MovieRow = ({ title, items = [], type = 'movie' }) => {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!items.length) return null;

  return (
    <div className="movie-row-container mb-5 position-relative">
      <div className="container d-flex align-items-center justify-content-between mb-3">
        <h4 className="text-white fw-bold m-0">{title}</h4>
        <div className="d-flex gap-2">
          <button 
            className="btn btn-dark rounded-circle p-1 d-flex align-items-center justify-content-center glass-effect border-secondary"
            onClick={() => scroll('left')}
            style={{ width: '32px', height: '32px' }}
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            className="btn btn-dark rounded-circle p-1 d-flex align-items-center justify-content-center glass-effect border-secondary"
            onClick={() => scroll('right')}
            style={{ width: '32px', height: '32px' }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div 
        ref={rowRef}
        className="d-flex gap-3 overflow-x-auto px-lg-5 no-scrollbar"
        style={{ scrollPaddingLeft: '1rem', scrollPaddingRight: '1rem' }}
      >
        {items.map((item) => (
          <div key={item.id} style={{ minWidth: '200px' }}>
            <GlassCard item={item} type={type} />
          </div>
        ))}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default MovieRow;
