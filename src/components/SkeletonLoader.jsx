import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonLoader = ({ count = 1, type = 'card' }) => {
  if (type === 'card') {
    return (
      <div className="row g-3">
        {Array(count).fill(0).map((_, i) => (
          <div key={i} className="col-6 col-md-4 col-lg-2">
            <div className="glass-card h-100 p-0 border-0 overflow-hidden">
              <Skeleton height={280} borderRadius={12} />
              <div className="p-2">
                <Skeleton width="80%" height={15} className="mb-2" />
                <Skeleton width="40%" height={10} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'hero') {
    return (
      <div className="w-100" style={{ height: '80vh', backgroundColor: '#1a1a1a' }}>
        <div className="container h-100 d-flex flex-column justify-content-center">
          <Skeleton width="40%" height={40} className="mb-3" />
          <Skeleton width="60%" height={20} count={3} className="mb-4" />
          <div className="d-flex gap-3">
            <Skeleton width={120} height={45} borderRadius={25} />
            <Skeleton width={120} height={45} borderRadius={25} />
          </div>
        </div>
      </div>
    );
  }

  return <Skeleton count={count} />;
};

export default SkeletonLoader;
