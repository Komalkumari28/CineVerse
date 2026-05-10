import React from 'react';
import { X } from 'lucide-react';

const TrailerModal = ({ isOpen, onClose, videoId }) => {
  if (!isOpen) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 vh-100 z-index-modal d-flex align-items-center justify-content-center p-3"
      style={{ backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 1060 }}>
      
      <div className="position-relative w-100 shadow-lg overflow-hidden rounded-4 glass-effect" 
        style={{ maxWidth: '1000px', aspectRatio: '16/9' }}>
        
        <button 
          className="btn btn-dark rounded-circle position-absolute top-0 end-0 m-3 z-3 glass-effect border-secondary"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {videoId ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="h-100 d-flex align-items-center justify-content-center text-white">
            <h4>No Trailer Available</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrailerModal;
