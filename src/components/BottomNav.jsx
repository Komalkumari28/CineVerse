import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Film, Tv, Search, Heart, User } from 'lucide-react';

const BottomNav = () => {
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Movies', path: '/movies', icon: Film },
    { name: 'TV', path: '/tv-shows', icon: Tv },
    { name: 'Search', path: '/search', icon: Search },
    { name: 'Watchlist', path: '/watchlist', icon: Heart },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="d-lg-none fixed-bottom glass-effect border-top border-secondary py-2 z-3 shadow-lg">
      <div className="container d-flex justify-content-between align-items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => 
              `d-flex flex-column align-items-center text-decoration-none transition-smooth px-2 ${isActive ? 'text-primary' : 'text-secondary'}`
            }
            style={({ isActive }) => ({
              color: isActive ? 'var(--primary-purple)' : 'inherit',
              transform: isActive ? 'scale(1.1)' : 'scale(1)'
            })}
          >
            <item.icon size={22} />
            <span style={{ fontSize: '10px', marginTop: '4px', fontWeight: '500' }}>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
