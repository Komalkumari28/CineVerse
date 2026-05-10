import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        navigate('/');
      } catch (error) {
        console.error('Login error:', error);
        setErrors({ auth: 'Invalid email or password' });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="login-form">
      <h3 className="text-white fw-bold mb-1">Welcome Back</h3>
      <p className="text-secondary small mb-4">Login to your account to continue</p>
      
      {errors.auth && (
        <div className="alert alert-danger py-2 small border-0 bg-danger bg-opacity-10 text-danger mb-4">
          {errors.auth}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
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

        <div className="mb-4">
          <div className="d-flex justify-content-between">
            <label className="form-label text-white-50 small fw-bold">PASSWORD</label>
            <a href="#" className="text-primary text-decoration-none small fw-bold" style={{ color: 'var(--primary-purple) !important' }}>Forgot?</a>
          </div>
          <div className="position-relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className={`form-control bg-dark border-secondary text-white ps-5 pe-5 py-3 shadow-none ${errors.password ? 'border-danger' : ''}`}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={{ backgroundColor: 'rgba(0,0,0,0.3) !important' }}
            />
            <Lock className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary" size={20} />
            <button 
              type="button" 
              className="btn position-absolute top-50 end-0 translate-middle-y me-2 text-secondary p-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <div className="text-danger small mt-1">{errors.password}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100 py-3 rounded-3 fw-bold d-flex align-items-center justify-content-center gap-2 mb-4">
          <LogIn size={20} />
          <span>Login to Account</span>
        </button>
      </form>
      
      <div className="text-center">
        <p className="text-secondary small">Don't have an account? <Link to="/signup" className="text-primary text-decoration-none fw-bold" style={{ color: 'var(--primary-purple) !important' }}>Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;
