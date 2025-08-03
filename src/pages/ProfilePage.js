import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { User, Mail, Lock, Edit2, LogOut } from 'lucide-react';

const ProfilePage = ({ user, setUser, setIsLoggedIn, setCurrentPage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setUser({
      name: formData.name,
      email: formData.email,
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({});
    setCurrentPage('home');
  };

  if (!user.email) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600">Please log in to view your profile.</p>
          <button onClick={() => setCurrentPage('login')} className="mt-4 btn-primary">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>
      <div className="max-w-md mx-auto">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">{user.name}</h2>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Edit2 className="w-5 h-5" />
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="input-field pl-10"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="input-field pl-10"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="New Password (optional)"
                  className="input-field pl-10"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  className="input-field pl-10"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex space-x-3">
                <button type="submit" className="flex-1 btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail className="w-5 h-5" />
                <span>{user.email}</span>
              </div>
              <button
                onClick={() => setCurrentPage('orders')}
                className="w-full btn-secondary flex items-center justify-center space-x-2"
              >
                <span>View Order History</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full btn-secondary flex items-center justify-center space-x-2 text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Define PropTypes
ProfilePage.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default ProfilePage;