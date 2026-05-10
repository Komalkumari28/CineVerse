import React from 'react';
import useWatchlist from '../hooks/useWatchlist';
import GlassCard from '../components/GlassCard';
import { Heart, Trash2 } from 'lucide-react';

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <div className="watchlist-page bg-dark py-5 min-vh-100">
      <div className="container mt-4">
        <div className="text-center mb-5">
          <h2 className="text-white fw-bold mb-3">My <span className="text-gradient">Watchlist</span></h2>
          <p className="text-secondary">Keep track of movies and shows you want to watch</p>
        </div>

        {watchlist.length === 0 ? (
          <div className="d-flex flex-column align-items-center justify-content-center py-5">
            <div className="glass-effect p-4 rounded-circle mb-4">
              <Heart size={64} className="text-secondary opacity-50" />
            </div>
            <h4 className="text-secondary mb-3">Your watchlist is empty</h4>
            <p className="text-secondary mb-4">Start adding movies and shows to see them here!</p>
            <a href="/movies" className="btn btn-primary rounded-pill px-5 py-3 fw-bold">Explore Movies</a>
          </div>
        ) : (
          <div className="row g-4">
            {watchlist.map((item) => (
              <div key={item.id} className="col-6 col-md-4 col-lg-3 col-xl-2 position-relative">
                <GlassCard item={item} type={item.media_type} />
                <button 
                  className="btn btn-danger btn-sm rounded-circle position-absolute top-0 end-0 m-3 z-3 shadow-lg p-2 border-0"
                  style={{ backgroundColor: 'rgba(220, 53, 69, 0.8)' }}
                  onClick={(e) => {
                    e.preventDefault();
                    removeFromWatchlist(item.id);
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
