import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { Play, Plus, Star, Clock, Calendar, Globe, Share2, Heart } from 'lucide-react';
import tmdbApi, { endpoints, IMAGES } from '../services/tmdbApi';
import MovieRow from '../components/MovieRow';
import TrailerModal from '../components/TrailerModal';
import SkeletonLoader from '../components/SkeletonLoader';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import useWatchlist from '../hooks/useWatchlist';

const MovieDetails = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const type = pathname.includes('/tv/') ? 'tv' : 'movie';
  
  const [data, setData] = useState(null);
  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const { user } = useAuth();
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const navigate = useNavigate();

  const handleWatchlist = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (isInWatchlist(data.id)) {
      removeFromWatchlist(data.id);
    } else {
      addToWatchlist({ ...data, media_type: type });
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const [details, credits, vids, sim] = await Promise.all([
          tmdbApi.get(type === 'movie' ? endpoints.movieDetails(id) : endpoints.tvDetails(id)),
          tmdbApi.get(endpoints.credits(id, type)),
          tmdbApi.get(endpoints.videos(id, type)),
          tmdbApi.get(endpoints.similar(id, type))
        ]);

        setData(details.data);
        setCast(credits.data.cast.slice(0, 10));
        setVideos(vids.data.results);
        setSimilar(sim.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching details:', error);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, type]);

  const trailer = videos.find(v => v.type === 'Trailer') || videos[0];

  if (loading) return <SkeletonLoader type="hero" />;

  return (
    <div className="movie-details bg-dark text-white pb-5">
      {/* Dynamic Banner */}
      <div className="detail-hero position-relative vh-100"
        style={{
          backgroundImage: `linear-gradient(to top, var(--dark-bg) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%), url(${IMAGES.backdrop(data.backdrop_path)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        
        <div className="container h-100 d-flex flex-column justify-content-end pb-5">
          <div className="row align-items-end gy-4">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-lg-3 d-none d-lg-block"
            >
              <img src={IMAGES.poster(data.poster_path)} className="img-fluid rounded-4 shadow-lg border border-secondary" alt={data.title} />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="col-lg-9"
            >
              <div className="d-flex gap-2 mb-3">
                {data.genres?.map(g => (
                  <span key={g.id} className="badge rounded-pill glass-effect border-secondary px-3 py-2 small">{g.name}</span>
                ))}
              </div>
              
              <h1 className="display-3 fw-bold mb-3">{data.title || data.name}</h1>
              
              <div className="d-flex flex-wrap align-items-center gap-4 mb-4 text-white-50">
                <div className="d-flex align-items-center gap-2">
                  <Star size={20} className="text-warning fill-warning" />
                  <span className="fw-bold text-white fs-5">{data.vote_average?.toFixed(1)}</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Calendar size={18} />
                  <span>{data.release_date || data.first_air_date}</span>
                </div>
                {data.runtime && (
                  <div className="d-flex align-items-center gap-2">
                    <Clock size={18} />
                    <span>{Math.floor(data.runtime / 60)}h {data.runtime % 60}m</span>
                  </div>
                )}
                {data.status && <span className="badge bg-success opacity-75">{data.status}</span>}
              </div>

              <p className="lead text-white-50 mb-5 fs-5" style={{ maxWidth: '800px' }}>{data.overview}</p>

              <div className="d-flex flex-wrap gap-3">
                <button className="btn btn-primary btn-lg rounded-pill px-5 py-3 d-flex align-items-center gap-2" onClick={() => setShowTrailer(true)}>
                  <Play fill="white" size={24} />
                  <span className="fw-bold">Watch Trailer</span>
                </button>
                <button 
                  className={`btn btn-lg rounded-pill px-5 py-3 d-flex align-items-center gap-2 glass-effect ${isInWatchlist(data.id) ? 'btn-primary' : 'btn-outline-light'}`}
                  style={isInWatchlist(data.id) ? { backgroundColor: 'var(--primary-purple) !important', borderColor: 'var(--primary-purple) !important' } : {}}
                  onClick={handleWatchlist}
                >
                  <Heart size={24} fill={isInWatchlist(data.id) ? "white" : "none"} />
                  <span className="fw-bold">{isInWatchlist(data.id) ? 'In Watchlist' : 'Watchlist'}</span>
                </button>
                <button className="btn btn-dark btn-lg rounded-circle p-3 glass-effect border-secondary">
                  <Share2 size={24} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="container mt-5 pt-5">
        <h3 className="fw-bold mb-4">Top <span className="text-gradient">Cast</span></h3>
        <div className="d-flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {cast.map(person => (
            <div key={person.id} className="text-center" style={{ minWidth: '140px' }}>
              <div className="mb-2 overflow-hidden rounded-circle mx-auto border border-secondary" style={{ width: '120px', height: '120px' }}>
                <img src={person.profile_path ? IMAGES.cast(person.profile_path) : 'https://via.placeholder.com/185x278?text=N/A'} 
                  className="img-fluid w-100 h-100 object-fit-cover transition-smooth hover-scale" alt={person.name} />
              </div>
              <h6 className="m-0 fw-bold small">{person.name}</h6>
              <p className="text-secondary small">{person.character}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats/Details */}
      <div className="container mt-5">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="glass-card p-4 h-100">
              <h5 className="fw-bold mb-4 border-bottom border-secondary pb-2">Production Info</h5>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Original Language</span>
                  <span className="text-uppercase fw-bold">{data.original_language}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Budget</span>
                  <span className="fw-bold">${data.budget?.toLocaleString() || 'N/A'}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Revenue</span>
                  <span className="fw-bold">${data.revenue?.toLocaleString() || 'N/A'}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-secondary">Homepage</span>
                  <a href={data.homepage} target="_blank" className="text-primary text-decoration-none">Visit Site <Globe size={14} /></a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="glass-card p-4 h-100">
              <h5 className="fw-bold mb-4 border-bottom border-secondary pb-2">Production Companies</h5>
              <div className="d-flex flex-wrap gap-3 align-items-center justify-content-center">
                {data.production_companies?.map(company => (
                  <div key={company.id} className="bg-white p-2 rounded glass-effect" style={{ height: '50px' }}>
                    {company.logo_path ? (
                      <img src={`https://image.tmdb.org/t/p/w200${company.logo_path}`} alt={company.name} className="h-100 object-fit-contain" />
                    ) : (
                      <span className="text-dark fw-bold small">{company.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Content */}
      <div className="mt-5 pt-5">
        <MovieRow title={`Similar ${type === 'movie' ? 'Movies' : 'TV Shows'}`} items={similar} type={type} />
      </div>

      {/* Trailer Modal */}
      <TrailerModal 
        isOpen={showTrailer} 
        onClose={() => setShowTrailer(false)} 
        videoId={trailer?.key} 
      />

      <style>{`
        .detail-hero { min-height: 800px; margin-top: -70px; }
        .hover-scale:hover { transform: scale(1.1); }
      `}</style>
    </div>
  );
};

export default MovieDetails;
