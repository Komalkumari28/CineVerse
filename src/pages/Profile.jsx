import React from 'react';
import { User, Mail, Shield, Settings, Bell, LogOut, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="profile-page bg-dark py-5 min-vh-100">
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="glass-card overflow-hidden">
              {/* Header/Cover */}
              <div className="h-25 w-100" style={{ height: '150px', background: 'linear-gradient(45deg, var(--primary-purple), var(--secondary-purple))' }}></div>
              
              <div className="px-4 pb-4 position-relative">
                {/* Profile Pic */}
                <div className="position-relative d-inline-block" style={{ marginTop: '-60px' }}>
                  <img 
                    src={user.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"} 
                    className="rounded-circle border border-5 border-dark shadow-lg" 
                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    alt="Profile"
                  />
                  <button className="btn btn-primary rounded-circle position-absolute bottom-0 end-0 p-2 shadow-lg border-2 border-dark">
                    <Camera size={16} />
                  </button>
                </div>

                <div className="mt-3">
                  <h3 className="text-white fw-bold m-0">{user.displayName || "User"}</h3>
                  <p className="text-secondary mb-4">Member • {user.email}</p>
                </div>

                <div className="row g-4">
                  <div className="col-md-6">
                    <div className="p-3 rounded-3 bg-dark border border-secondary">
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <Mail className="text-primary" size={20} />
                        <div>
                          <p className="text-secondary small m-0">Email Address</p>
                          <p className="text-white fw-bold m-0">{user.email}</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <Shield className="text-primary" size={20} />
                        <div>
                          <p className="text-secondary small m-0">Account Status</p>
                          <p className="text-white fw-bold m-0">{user.emailVerified ? 'Verified' : 'Unverified'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="p-3 rounded-3 bg-dark border border-secondary d-flex flex-column gap-3">
                      <button className="btn btn-outline-light d-flex align-items-center justify-content-between w-100 py-2 glass-effect">
                        <div className="d-flex align-items-center gap-2">
                          <Settings size={18} />
                          <span>Settings</span>
                        </div>
                        <span className="small">&rsaquo;</span>
                      </button>
                      <button className="btn btn-outline-light d-flex align-items-center justify-content-between w-100 py-2 glass-effect">
                        <div className="d-flex align-items-center gap-2">
                          <Bell size={18} />
                          <span>Notifications</span>
                        </div>
                        <span className="badge bg-primary">0</span>
                      </button>
                    </div>
                  </div>
                </div>

                <hr className="my-5 border-secondary" />

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="text-white fw-bold m-0">Subscription Plan</h5>
                  <span className="badge bg-primary px-3 py-2">Free Plan</span>
                </div>
                
                <div className="p-4 rounded-4 glass-effect border-primary mb-5" style={{ borderColor: 'var(--primary-purple) !important' }}>
                  <div className="row align-items-center">
                    <div className="col-md-8">
                      <h6 className="text-white fw-bold">Upgrade to Premium</h6>
                      <p className="text-secondary m-0">Get access to 4K streaming and offline downloads.</p>
                    </div>
                    <div className="col-md-4 text-md-end mt-3 mt-md-0">
                      <button className="btn btn-primary rounded-pill px-4">See Plans</button>
                    </div>
                  </div>
                </div>

                <button onClick={handleLogout} className="btn btn-outline-danger w-100 py-3 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2 mt-4">
                  <LogOut size={20} />
                  <span>Logout from Account</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
