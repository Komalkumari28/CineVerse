import React from 'react';

const GenreFilter = ({ genres = [], selectedGenre, onGenreSelect }) => {
  return (
    <div className="d-flex gap-2 overflow-x-auto pb-3 no-scrollbar mb-4">
      <button
        onClick={() => onGenreSelect(null)}
        className={`btn rounded-pill px-4 py-2 text-nowrap transition-smooth ${
          selectedGenre === null 
          ? 'btn-primary shadow-lg' 
          : 'btn-outline-secondary text-white border-secondary'
        }`}
        style={{ 
          backgroundColor: selectedGenre === null ? 'var(--primary-purple) !important' : 'transparent',
          borderColor: selectedGenre === null ? 'var(--primary-purple) !important' : 'rgba(255,255,255,0.2)'
        }}
      >
        All Genres
      </button>
      
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onGenreSelect(genre.id)}
          className={`btn rounded-pill px-4 py-2 text-nowrap transition-smooth ${
            selectedGenre === genre.id 
            ? 'btn-primary shadow-lg' 
            : 'btn-outline-secondary text-white border-secondary'
          }`}
          style={{ 
            backgroundColor: selectedGenre === genre.id ? 'var(--primary-purple) !important' : 'transparent',
            borderColor: selectedGenre === genre.id ? 'var(--primary-purple) !important' : 'rgba(255,255,255,0.2)'
          }}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;
