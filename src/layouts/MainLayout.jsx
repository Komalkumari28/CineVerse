import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';

const MainLayout = () => {
  return (
    <div className="main-layout d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1" style={{ paddingTop: '70px', paddingBottom: '70px' }}>
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default MainLayout;
