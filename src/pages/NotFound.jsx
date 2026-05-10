import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="vh-100 d-flex flex-column align-items-center justify-content-center bg-dark text-white p-3">
      <div className="glass-effect p-5 rounded-4 text-center shadow-lg border-secondary" style={{ maxWidth: '500px' }}>
        <div className="mb-4 d-inline-block p-4 rounded-circle bg-danger bg-opacity-10">
          <AlertCircle size={64} className="text-danger" />
        </div>
        <h1 className="display-1 fw-bold mb-0 text-gradient">404</h1>
        <h2 className="fw-bold mb-4">Page Not Found</h2>
        <p className="text-secondary mb-5 fs-5">
          Oops! The page you're looking for doesn't exist or has been moved to a different universe.
        </p>
        <Link to="/" className="btn btn-primary btn-lg rounded-pill px-5 py-3 d-flex align-items-center justify-content-center gap-2 mx-auto shadow-lg">
          <Home size={20} />
          <span className="fw-bold">Back to Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
