import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../utils/ThemeContext';

const Settings = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { theme, setThemeMode } = useTheme();
  
  // State for different settings
  const [notifications, setNotifications] = useState({
    posts: true,
    comments: true,
    likes: true,
    follows: true,
    messages: true,
    email: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowMessages: 'everyone'
  });

  const [appearance, setAppearance] = useState({
    fontSize: 'medium'
  });

  const [activeTab, setActiveTab] = useState('account');

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrivacyChange = (key, value) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  const handleAppearanceChange = (key, value) => {
    setAppearance(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-6">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="text-blue-400 hover:text-blue-300 flex items-center gap-2 mb-4 transition-colors"
          >
            <span className="text-xl">←</span> Back
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-md border border-gray-700/50 rounded-xl p-2">
              <button
                onClick={() => setActiveTab('account')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                  activeTab === 'account' 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' 
                    : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                <span className="text-xl">👤</span>
                <span className="font-medium">Account</span>
              </button>
              
              <button
                onClick={() => setActiveTab('privacy')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 mt-2 ${
                  activeTab === 'privacy' 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' 
                    : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                <span className="text-xl">🔒</span>
                <span className="font-medium">Privacy</span>
              </button>
              
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 mt-2 ${
                  activeTab === 'notifications' 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' 
                    : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                <span className="text-xl">🔔</span>
                <span className="font-medium">Notifications</span>
              </button>
              
              <button
                onClick={() => setActiveTab('appearance')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 mt-2 ${
                  activeTab === 'appearance' 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' 
                    : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                <span className="text-xl">🎨</span>
                <span className="font-medium">Appearance</span>
              </button>
              
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 mt-2 ${
                  activeTab === 'security' 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' 
                    : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                <span className="text-xl">🛡️</span>
                <span className="font-medium">Security</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-md border border-gray-700/50 rounded-xl p-6">
              
              {/* Account Tab */}
              {activeTab === 'account' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span>👤</span> Account Information
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Profile Picture */}
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500">
                        {user?.photoUrl ? (
                          <img src={user.photoUrl} alt={user.firstname} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-3xl">👤</div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">
                          {user?.firstname} {user?.lastname}
                        </h3>
                        <p className="text-gray-400">@{user?.firstname?.toLowerCase() || 'user'}</p>
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Email Address</label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-3 text-white disabled:opacity-50 cursor-not-allowed"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Phone Number</label>
                      <input
                        type="tel"
                        value={user?.phone || 'Not provided'}
                        disabled
                        className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-3 text-white disabled:opacity-50 cursor-not-allowed"
                      />
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Gender</label>
                      <input
                        type="text"
                        value={user?.gender || 'Not specified'}
                        disabled
                        className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-3 text-white disabled:opacity-50 cursor-not-allowed"
                      />
                    </div>

                    {/* Age */}
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block">Age</label>
                      <input
                        type="text"
                        value={user?.age || 'Not specified'}
                        disabled
                        className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-3 text-white disabled:opacity-50 cursor-not-allowed"
                      />
                    </div>

                    <button 
                      onClick={() => navigate('/Profile')}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span>🔒</span> Privacy Settings
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Profile Visibility */}
                    <div>
                      <label className="text-white font-medium mb-3 block">Profile Visibility</label>
                      <select
                        value={privacy.profileVisibility}
                        onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                        className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none"
                      >
                        <option value="public">Public - Anyone can view</option>
                        <option value="connections">Connections Only</option>
                        <option value="private">Private - Only me</option>
                      </select>
                    </div>

                    {/* Show Email */}
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div>
                        <h3 className="text-white font-medium">Show Email Address</h3>
                        <p className="text-gray-400 text-sm">Display your email on your profile</p>
                      </div>
                      <button
                        onClick={() => handlePrivacyChange('showEmail', !privacy.showEmail)}
                        className={`w-14 h-7 rounded-full transition-all ${
                          privacy.showEmail ? 'bg-blue-500' : 'bg-gray-600'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-all ${
                          privacy.showEmail ? 'ml-8' : 'ml-1'
                        }`}></div>
                      </button>
                    </div>

                    {/* Show Phone */}
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div>
                        <h3 className="text-white font-medium">Show Phone Number</h3>
                        <p className="text-gray-400 text-sm">Display your phone number on your profile</p>
                      </div>
                      <button
                        onClick={() => handlePrivacyChange('showPhone', !privacy.showPhone)}
                        className={`w-14 h-7 rounded-full transition-all ${
                          privacy.showPhone ? 'bg-blue-500' : 'bg-gray-600'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-all ${
                          privacy.showPhone ? 'ml-8' : 'ml-1'
                        }`}></div>
                      </button>
                    </div>

                    {/* Allow Messages */}
                    <div>
                      <label className="text-white font-medium mb-3 block">Who can send you messages?</label>
                      <select
                        value={privacy.allowMessages}
                        onChange={(e) => handlePrivacyChange('allowMessages', e.target.value)}
                        className="w-full bg-white/5 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 outline-none"
                      >
                        <option value="everyone">Everyone</option>
                        <option value="connections">Connections Only</option>
                        <option value="nobody">Nobody</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span>🔔</span> Notification Preferences
                  </h2>
                  
                  <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                        <div>
                          <h3 className="text-white font-medium capitalize">
                            {key === 'email' ? 'Email Notifications' : `${key} Notifications`}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {key === 'posts' && 'Get notified when someone posts in your fandoms'}
                            {key === 'comments' && 'Get notified when someone comments on your posts'}
                            {key === 'likes' && 'Get notified when someone likes your content'}
                            {key === 'follows' && 'Get notified when someone follows you'}
                            {key === 'messages' && 'Get notified when you receive messages'}
                            {key === 'email' && 'Receive notifications via email'}
                          </p>
                        </div>
                        <button
                          onClick={() => handleNotificationToggle(key)}
                          className={`w-14 h-7 rounded-full transition-all ${
                            value ? 'bg-blue-500' : 'bg-gray-600'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-all ${
                            value ? 'ml-8' : 'ml-1'
                          }`}></div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === 'appearance' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span>🎨</span> Appearance
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Theme */}
                    <div>
                      <label className="text-white font-medium mb-3 block">Theme</label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => setThemeMode('light')}
                          className={`p-6 rounded-lg border-2 transition-all ${
                            theme === 'light'
                              ? 'border-blue-500 bg-blue-500/10 scale-105'
                              : 'border-gray-700 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div className="text-5xl mb-3">☀️</div>
                          <div className="text-white font-medium text-lg">Light Mode</div>
                          <p className="text-gray-400 text-xs mt-2">Bright & clean interface</p>
                        </button>
                        
                        <button
                          onClick={() => setThemeMode('dark')}
                          className={`p-6 rounded-lg border-2 transition-all ${
                            theme === 'dark'
                              ? 'border-blue-500 bg-blue-500/10 scale-105'
                              : 'border-gray-700 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div className="text-5xl mb-3">🌙</div>
                          <div className="text-white font-medium text-lg">Dark Mode</div>
                          <p className="text-gray-400 text-xs mt-2">Easy on the eyes</p>
                        </button>
                      </div>
                      <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <p className="text-blue-300 text-sm flex items-center gap-2">
                          <span>ℹ️</span>
                          <span>Current theme: <strong>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</strong></span>
                        </p>
                      </div>
                    </div>

                    {/* Font Size */}
                    <div>
                      <label className="text-white font-medium mb-3 block">Font Size</label>
                      <div className="grid grid-cols-3 gap-4">
                        <button
                          onClick={() => handleAppearanceChange('fontSize', 'small')}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            appearance.fontSize === 'small'
                              ? 'border-blue-500 bg-blue-500/10'
                              : 'border-gray-700 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div className="text-white font-medium text-sm">Small</div>
                        </button>
                        
                        <button
                          onClick={() => handleAppearanceChange('fontSize', 'medium')}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            appearance.fontSize === 'medium'
                              ? 'border-blue-500 bg-blue-500/10'
                              : 'border-gray-700 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div className="text-white font-medium text-base">Medium</div>
                        </button>
                        
                        <button
                          onClick={() => handleAppearanceChange('fontSize', 'large')}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            appearance.fontSize === 'large'
                              ? 'border-blue-500 bg-blue-500/10'
                              : 'border-gray-700 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div className="text-white font-medium text-lg">Large</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span>🛡️</span> Security
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Change Password */}
                    <div className="p-6 bg-white/5 rounded-lg border border-gray-700">
                      <h3 className="text-white font-semibold text-lg mb-2 flex items-center gap-2">
                        🔑 Change Password
                      </h3>
                      <p className="text-gray-400 mb-4">Update your password to keep your account secure</p>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-all">
                        Change Password
                      </button>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="p-6 bg-white/5 rounded-lg border border-gray-700">
                      <h3 className="text-white font-semibold text-lg mb-2 flex items-center gap-2">
                        📱 Two-Factor Authentication
                      </h3>
                      <p className="text-gray-400 mb-4">Add an extra layer of security to your account</p>
                      <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-all">
                        Enable 2FA
                      </button>
                    </div>

                    {/* Active Sessions */}
                    <div className="p-6 bg-white/5 rounded-lg border border-gray-700">
                      <h3 className="text-white font-semibold text-lg mb-2 flex items-center gap-2">
                        💻 Active Sessions
                      </h3>
                      <p className="text-gray-400 mb-4">Manage devices where you're currently logged in</p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">🖥️</span>
                            <div>
                              <p className="text-white font-medium">Windows PC</p>
                              <p className="text-gray-400 text-sm">Current session</p>
                            </div>
                          </div>
                          <span className="text-green-400 text-sm">Active</span>
                        </div>
                      </div>
                    </div>

                    {/* Delete Account */}
                    <div className="p-6 bg-red-500/10 rounded-lg border border-red-500/50">
                      <h3 className="text-red-400 font-semibold text-lg mb-2 flex items-center gap-2">
                        ⚠️ Danger Zone
                      </h3>
                      <p className="text-gray-400 mb-4">Permanently delete your account and all data</p>
                      <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-all">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
