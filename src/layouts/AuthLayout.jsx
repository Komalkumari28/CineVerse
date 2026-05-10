import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Play } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="auth-layout vh-100 d-flex align-items-center justify-content-center p-3" 
      style={{ 
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&q=80&w=1600")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
      
      <div className="auth-card glass-effect p-4 p-md-5 rounded-4 shadow-lg w-100" style={{ maxWidth: '450px' }}>
        <div className="text-center mb-4">
          <Link to="/" className="text-decoration-none d-inline-flex align-items-center gap-2 mb-3">
            <div className="bg-primary p-2 rounded-circle d-flex align-items-center justify-content-center" style={{ backgroundColor: 'var(--primary-purple) !important' }}>
              <Play size={24} fill="white" color="white" />
            </div>
            <h2 className="m-0 fw-bold text-white">Cine<span style={{ color: 'var(--primary-purple)' }}>Verse</span></h2>
          </Link>
        </div>
        
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
