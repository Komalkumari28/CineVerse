import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, Eye, EyeOff } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../services/firebase';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        await updateProfile(userCredential.user, {
          displayName: formData.name
        });
        navigate('/');
      } catch (error) {
        console.error('Signup error:', error);
        setErrors({ auth: error.message });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="signup-form">
      <h3 className="text-white fw-bold mb-1">Create Account</h3>
      <p className="text-secondary small mb-4">Join CineVerse and start streaming today</p>
      
      {errors.auth && (
        <div className="alert alert-danger py-2 small border-0 bg-danger bg-opacity-10 text-danger mb-4">
          {errors.auth}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label text-white-50 small fw-bold">FULL NAME</label>
          <div className="position-relative">
            <input
              type="text"
              className={`form-control bg-dark border-secondary text-white ps-5 py-3 shadow-none ${errors.name ? 'border-danger' : ''}`}
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ backgroundColor: 'rgba(0,0,0,0.3) !important' }}
            />
            <User className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" size={20} />
          </div>
          {errors.name && <div className="text-danger small mt-1">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label text-white-50 small fw-bold">EMAIL ADDRESS</label>
          <div className="position-relative">
            <input
              type="email"
              className={`form-control bg-dark border-secondary text-white ps-5 py-3 shadow-none ${errors.email ? 'border-danger' : ''}`}
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{ backgroundColor: 'rgba(0,0,0,0.3) !important' }}
            />
            <Mail className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" size={20} />
          </div>
          {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <label className="form-label text-white-50 small fw-bold">PASSWORD</label>
            <div className="position-relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className={`form-control bg-dark border-secondary text-white ps-5 py-3 shadow-none ${errors.password ? 'border-danger' : ''}`}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={{ backgroundColor: 'rgba(0,0,0,0.3) !important' }}
              />
              <Lock className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" size={20} />
            </div>
            {errors.password && <div className="text-danger small mt-1">{errors.password}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label text-white-50 small fw-bold">CONFIRM</label>
            <div className="position-relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className={`form-control bg-dark border-secondary text-white ps-5 py-3 shadow-none ${errors.confirmPassword ? 'border-danger' : ''}`}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                style={{ backgroundColor: 'rgba(0,0,0,0.3) !important' }}
              />
              <Lock className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" size={20} />
            </div>
            {errors.confirmPassword && <div className="text-danger small mt-1">{errors.confirmPassword}</div>}
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100 py-3 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2 mb-4">
          <UserPlus size={20} />
          <span>Create My Account</span>
        </button>
      </form>
      
      <div className="text-center">
        <p className="text-secondary small">Already have an account? <Link to="/login" className="text-primary text-decoration-none fw-bold" style={{ color: 'var(--primary-purple) !important' }}>Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
