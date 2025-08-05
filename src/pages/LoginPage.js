import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';

const LoginPage = ({ setIsLoggedIn, setUser, setCurrentPage }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const userData = {
      name: isLogin ? 'John Doe' : formData.name,
      email: formData.email,
    };
    
    setIsLoggedIn(true);
    setUser(userData);
    setCurrentPage('profile');
    setIsLoading(false);
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoggedIn(true);
    setUser({ 
      name: `${provider} User`, 
      email: `user@${provider.toLowerCase()}.com` 
    });
    setCurrentPage('profile');
    setIsLoading(false);
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    if (password.length < 6) return { strength: 25, label: 'Weak', color: 'bg-red-500' };
    if (password.length < 8) return { strength: 50, label: 'Fair', color: 'bg-yellow-500' };
    if (password.length < 12) return { strength: 75, label: 'Good', color: 'bg-blue-500' };
    return { strength: 100, label: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // Properly encoded SVG data URL
  const gridPattern = `data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ backgroundImage: `url("${gridPattern}")` }}
      ></div>
      
      <div className="relative w-full max-w-md z-10">
        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer"></div>
          
          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-500 rounded-2xl blur-lg opacity-60 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-purple-500 to-blue-600 p-5 rounded-2xl shadow-lg">
                <User className="w-8 h-8 text-white" />
                <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-300 animate-bounce" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
              {isLogin ? 'Welcome Back' : 'Join the Future'}
            </h1>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              {isLogin 
                ? 'Your digital shopping experience awaits' 
                : 'Create your account and unlock infinite possibilities'}
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <div className={`relative group transition-all duration-300 ${focusedField === 'name' ? 'scale-105' : ''}`}>
                  <User className={`absolute left-4 top-4 w-5 h-5 transition-all duration-300 ${
                    focusedField === 'name' ? 'text-purple-400' : 'text-gray-400'
                  }`} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className={`w-full pl-12 pr-4 py-4 bg-white/10 border-2 rounded-2xl transition-all duration-300 focus:outline-none text-white placeholder-gray-400 backdrop-blur-sm ${
                      errors.name 
                        ? 'border-red-400 focus:border-red-400' 
                        : focusedField === 'name'
                        ? 'border-purple-400 bg-white/20 shadow-lg shadow-purple-500/25'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField('')}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-400 text-sm ml-2 animate-fadeIn">{errors.name}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <div className={`relative group transition-all duration-300 ${focusedField === 'email' ? 'scale-105' : ''}`}>
                <Mail className={`absolute left-4 top-4 w-5 h-5 transition-all duration-300 ${
                  focusedField === 'email' ? 'text-purple-400' : 'text-gray-400'
                }`} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className={`w-full pl-12 pr-4 py-4 bg-white/10 border-2 rounded-2xl transition-all duration-300 focus:outline-none text-white placeholder-gray-400 backdrop-blur-sm ${
                    errors.email 
                      ? 'border-red-400 focus:border-red-400' 
                      : focusedField === 'email'
                      ? 'border-purple-400 bg-white/20 shadow-lg shadow-purple-500/25'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm ml-2 animate-fadeIn">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className={`relative group transition-all duration-300 ${focusedField === 'password' ? 'scale-105' : ''}`}>
                <Lock className={`absolute left-4 top-4 w-5 h-5 transition-all duration-300 ${
                  focusedField === 'password' ? 'text-purple-400' : 'text-gray-400'
                }`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  className={`w-full pl-12 pr-12 py-4 bg-white/10 border-2 rounded-2xl transition-all duration-300 focus:outline-none text-white placeholder-gray-400 backdrop-blur-sm ${
                    errors.password 
                      ? 'border-red-400 focus:border-red-400' 
                      : focusedField === 'password'
                      ? 'border-purple-400 bg-white/20 shadow-lg shadow-purple-500/25'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                  value={formData.password}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {!isLogin && formData.password && (
                <div className="ml-2">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-400">Password Strength</span>
                    <span className={`font-medium ${
                      passwordStrength.strength >= 75 ? 'text-green-400' :
                      passwordStrength.strength >= 50 ? 'text-blue-400' :
                      passwordStrength.strength >= 25 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${passwordStrength.color}`}
                      style={{ width: `${passwordStrength.strength}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {errors.password && (
                <p className="text-red-400 text-sm ml-2 animate-fadeIn">{errors.password}</p>
              )}
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <div className={`relative group transition-all duration-300 ${focusedField === 'confirmPassword' ? 'scale-105' : ''}`}>
                  <ShieldCheck className={`absolute left-4 top-4 w-5 h-5 transition-all duration-300 ${
                    focusedField === 'confirmPassword' ? 'text-purple-400' : 'text-gray-400'
                  }`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className={`w-full pl-12 pr-4 py-4 bg-white/10 border-2 rounded-2xl transition-all duration-300 focus:outline-none text-white placeholder-gray-400 backdrop-blur-sm ${
                      errors.confirmPassword 
                        ? 'border-red-400 focus:border-red-400' 
                        : focusedField === 'confirmPassword'
                        ? 'border-purple-400 bg-white/20 shadow-lg shadow-purple-500/25'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => setFocusedField('')}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm ml-2 animate-fadeIn">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center cursor-pointer group">
                  <input type="checkbox" className="sr-only" />
                  <div className="relative">
                    <div className="w-5 h-5 bg-white/20 border-2 border-white/40 rounded group-hover:border-purple-400 transition-colors duration-200"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    </div>
                  </div>
                  <span className="ml-3 text-gray-300 group-hover:text-white transition-colors duration-200">Remember me</span>
                </label>
                <button type="button" className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200">
                  Forgot password?
                </button>
              </div>
            )}

            <button 
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full relative overflow-hidden bg-gradient-to-r from-purple-500 to-blue-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center space-x-3">
                {isLoading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </div>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gradient-to-r from-transparent via-slate-900 to-transparent text-gray-300 font-medium">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              disabled={isLoading}
              className="flex items-center justify-center space-x-3 py-4 px-4 bg-white/10 border-2 border-white/20 rounded-2xl hover:border-white/40 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 backdrop-blur-sm group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">🔍</span>
              <span className="font-medium text-white">Google</span>
            </button>
            
            <button
              type="button"
              onClick={() => handleSocialLogin('Facebook')}
              disabled={isLoading}
              className="flex items-center justify-center space-x-3 py-4 px-4 bg-white/10 border-2 border-white/20 rounded-2xl hover:border-white/40 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 backdrop-blur-sm group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">📘</span>
              <span className="font-medium text-white">Facebook</span>
            </button>
          </div>

          {/* Toggle */}
          <div className="text-center">
            <p className="text-gray-300">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button 
                type="button" 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-purple-400 hover:text-purple-300 ml-2 font-semibold transition-colors duration-200 underline-offset-4 hover:underline"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Define propTypes for the props
LoginPage.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default LoginPage;