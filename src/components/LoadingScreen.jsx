import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-primary">
      <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem', color: 'var(--primary-purple)' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
