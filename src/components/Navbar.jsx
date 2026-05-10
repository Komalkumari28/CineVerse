import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Play, Search, Heart, User, LogIn, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setIsMenuOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Movies', path: '/movies' },
    { name: 'TV Shows', path: '/tv-shows' },
    { name: 'Trending', path: '/trending' }, // Trending as a section or page
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar navbar-expand-lg fixed-top transition-smooth ${isScrolled ? 'glass-effect py-2 shadow-lg' : 'bg-transparent py-3'}`}>
      <div className="container">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2 m-0 p-0">
          <div className="bg-primary p-1 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', backgroundColor: 'var(--primary-purple) !important' }}>
            <Play size={18} fill="white" color="white" />
          </div>
          <span className="fw-bold text-white fs-4 d-none d-sm-block">Cine<span style={{ color: 'var(--primary-purple)' }}>Verse</span></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="collapse navbar-collapse justify-content-center d-none d-lg-flex" id="navbarNav">
          <ul className="navbar-nav gap-3">
            {navLinks.map((link) => (
              <li key={link.name} className="nav-item">
                <Link 
                  to={link.path} 
                  className={`nav-link fw-semibold ${isActive(link.path) ? 'text-white border-bottom border-2' : 'text-secondary'}`}
                  style={{ borderBottomColor: isActive(link.path) ? 'var(--primary-purple) !important' : 'transparent' }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="d-flex align-items-center gap-3">
          {/* Search Form (Desktop) */}
          <form className="d-none d-md-flex position-relative" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control bg-dark border-0 text-white rounded-pill px-4 ps-5 shadow-none"
              placeholder="Search..."
              style={{ width: '200px', backgroundColor: 'rgba(255,255,255,0.1) !important' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="position-absolute translate-middle-y top-50 ms-3 text-secondary" size={18} />
          </form>

          {/* Icons */}
          <Link to="/watchlist" className="text-secondary hover-white d-none d-sm-block">
            <Heart size={22} className={isActive('/watchlist') ? 'text-white' : ''} />
          </Link>

          {!user ? (
            <Link to="/login" className="btn btn-primary d-none d-md-flex align-items-center gap-2 rounded-pill px-4">
              <LogIn size={18} />
              <span>Login</span>
            </Link>
          ) : (
            <div className="d-none d-md-flex align-items-center gap-3">
              <Link to="/profile" className="text-secondary hover-white d-flex align-items-center gap-2 text-decoration-none">
                <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="rounded-circle w-100 h-100" />
                  ) : (
                    <User size={18} className="text-white" />
                  )}
                </div>
                <span className="text-white small fw-bold d-none d-xl-block">{user.displayName || user.email.split('@')[0]}</span>
              </Link>
              <button onClick={handleLogout} className="btn btn-outline-danger btn-sm rounded-circle p-2 d-flex align-items-center justify-content-center" title="Logout">
                <LogOut size={16} />
              </button>
            </div>
          )}

          {/* Hamburger (Tablet/Mobile fallback) */}
          <button 
            className="btn text-white p-0 d-lg-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Overlay) */}
      {isMenuOpen && (
        <div className="position-fixed top-0 start-0 w-100 vh-100 glass-effect d-flex flex-column align-items-center justify-content-center gap-4 z-index-modal d-lg-none">
          <button className="btn position-absolute top-0 end-0 m-4 text-white" onClick={() => setIsMenuOpen(false)}>
            <X size={32} />
          </button>
          
          <form className="w-75 mb-4" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control bg-dark border-0 text-white rounded-pill py-3 px-4 shadow-none"
              placeholder="Search Movies..."
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className="text-white text-decoration-none fs-2 fw-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="d-flex gap-4 mt-4">
            {!user ? (
              <Link to="/login" className="btn btn-primary btn-lg rounded-pill px-5" onClick={() => setIsMenuOpen(false)}>Login</Link>
            ) : (
              <button className="btn btn-outline-danger btn-lg rounded-pill px-5" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>Logout</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
