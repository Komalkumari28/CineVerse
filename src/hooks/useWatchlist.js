import { useState, useEffect } from 'react';

const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('cineverse_watchlist');
    if (saved) {
      setWatchlist(JSON.parse(saved));
    }
  }, []);

  const addToWatchlist = (item) => {
    const exists = watchlist.find(i => i.id === item.id);
    if (!exists) {
      const updated = [...watchlist, item];
      setWatchlist(updated);
      localStorage.setItem('cineverse_watchlist', JSON.stringify(updated));
    }
  };

  const removeFromWatchlist = (id) => {
    const updated = watchlist.filter(i => i.id !== id);
    setWatchlist(updated);
    localStorage.setItem('cineverse_watchlist', JSON.stringify(updated));
  };

  const isInWatchlist = (id) => {
    return watchlist.some(i => i.id === id);
  };

  return { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist };
};

export default useWatchlist;
