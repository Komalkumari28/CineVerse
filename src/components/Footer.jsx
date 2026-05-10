import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Mail, Globe, MessageCircle, Camera } from 'lucide-react';

const Footer = () => {
  // Social Icons as simple SVG components for compatibility
  const SocialIcon = ({ children }) => (
    <a href="#" className="text-secondary hover-white transition-smooth">
      {children}
    </a>
  );

  return (
    <footer className="bg-dark text-secondary py-5 mt-auto border-top border-secondary">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4">
            <Link to="/" className="text-decoration-none d-flex align-items-center gap-2 mb-3">
              <div className="bg-primary p-1 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '28px', height: '28px', backgroundColor: 'var(--primary-purple) !important' }}>
                <Play size={16} fill="white" color="white" />
              </div>
              <span className="fw-bold text-white fs-5">Cine<span style={{ color: 'var(--primary-purple)' }}>Verse</span></span>
            </Link>
            <p className="small mb-4">
              The ultimate destination for all your cinematic needs. Stream thousands of movies and TV shows anytime, anywhere. Experience the best in entertainment with CineVerse.
            </p>
            <div className="d-flex gap-3">
              <SocialIcon>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </SocialIcon>
              <SocialIcon>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </SocialIcon>
              <SocialIcon>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </SocialIcon>
              <SocialIcon>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </SocialIcon>
            </div>
          </div>
          
          <div className="col-sm-6 col-lg-2">
            <h6 className="text-white fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><Link to="/" className="text-decoration-none text-secondary hover-white small">Home</Link></li>
              <li><Link to="/movies" className="text-decoration-none text-secondary hover-white small">Movies</Link></li>
              <li><Link to="/tv-shows" className="text-decoration-none text-secondary hover-white small">TV Shows</Link></li>
              <li><Link to="/trending" className="text-decoration-none text-secondary hover-white small">Trending</Link></li>
            </ul>
          </div>
          
          <div className="col-sm-6 col-lg-2">
            <h6 className="text-white fw-bold mb-3">Account</h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><Link to="/profile" className="text-decoration-none text-secondary hover-white small">My Profile</Link></li>
              <li><Link to="/watchlist" className="text-decoration-none text-secondary hover-white small">Watchlist</Link></li>
              <li><Link to="/login" className="text-decoration-none text-secondary hover-white small">Login</Link></li>
              <li><Link to="/signup" className="text-decoration-none text-secondary hover-white small">Sign Up</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-4">
            <h6 className="text-white fw-bold mb-3">Subscribe to Newsletter</h6>
            <p className="small mb-3">Get latest updates about new releases and exclusive content.</p>
            <div className="input-group mb-3">
              <input type="email" className="form-control bg-transparent border-secondary text-white shadow-none" placeholder="Email Address" />
              <button className="btn btn-primary" type="button">Join</button>
            </div>
          </div>
        </div>
        
        <hr className="my-5 border-secondary" />
        
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
          <p className="small m-0">&copy; {new Date().getFullYear()} CineVerse. All rights reserved.</p>
          <div className="d-flex gap-4">
            <a href="#" className="text-decoration-none text-secondary small hover-white">Privacy Policy</a>
            <a href="#" className="text-decoration-none text-secondary small hover-white">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
