import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SkeletonTheme } from 'react-loading-skeleton';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import { AuthProvider } from './context/AuthContext';

// Components
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';
import ProtectedRoute from './components/ProtectedRoute';

// Pages (Lazy Loading)
const Home = lazy(() => import('./pages/Home'));
const Movies = lazy(() => import('./pages/Movies'));
const TVShows = lazy(() => import('./pages/TVShows'));
const Search = lazy(() => import('./pages/Search'));
const Watchlist = lazy(() => import('./pages/Watchlist'));
const Profile = lazy(() => import('./pages/Profile'));
const Trending = lazy(() => import('./pages/Trending'));
const MovieDetails = lazy(() => import('./pages/MovieDetails'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <AuthProvider>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <Router>
        <ScrollToTop />
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>

            {/* Main App Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/tv-shows" element={<TVShows />} />
              <Route path="/search" element={<Search />} />
              <Route path="/watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/tv/:id" element={<MovieDetails />} />
              
              {/* Fallback */}
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </SkeletonTheme>
    </AuthProvider>
  );
}

export default App;
