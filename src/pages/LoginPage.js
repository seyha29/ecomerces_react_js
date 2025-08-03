import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const LoginPage = ({ setIsLoggedIn, setUser, setCurrentPage }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    const userData = {
      name: isLogin ? 'John Doe' : formData.name,
      email: formData.email,
    };
    setIsLoggedIn(true);
    setUser(userData);
    setCurrentPage('profile');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="card p-8">
          <div className="text-center mb-8">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
            <p className="text-gray-600 mt-2">
              {isLogin ? 'Sign in to your account to continue shopping' : 'Join us today and start your shopping journey'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full input-field pl-10"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full input-field pl-10"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                className="w-full input-field pl-10 pr-10"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {!isLogin && (
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="w-full input-field pl-10"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>
                <button type="button" className="text-blue-600 hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            <button type="submit" className="w-full btn-primary">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="btn-secondary flex items-center justify-center space-x-2"
                onClick={() => {
                  setIsLoggedIn(true);
                  setUser({ name: 'Google User', email: 'user@gmail.com' });
                  setCurrentPage('profile');
                }}
              >
                <span>🔍</span>
                <span>Google</span>
              </button>
              <button
                type="button"
                className="btn-secondary flex items-center justify-center space-x-2"
                onClick={() => {
                  setIsLoggedIn(true);
                  setUser({ name: 'Facebook User', email: 'user@facebook.com' });
                  setCurrentPage('profile');
                }}
              >
                <span>📘</span>
                <span>Facebook</span>
              </button>
            </div>
          </div>

          {/* Toggle between login and signup */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-blue-600 hover:underline ml-1 font-medium">
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Define PropTypes
LoginPage.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default LoginPage;