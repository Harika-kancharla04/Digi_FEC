import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css'


const Settings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  const [loading, setLoading] = useState(true);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [settings, setSettings] = useState({
    Account: {
      name: '',
      email: '',
      phone: '',
      password: '',
      newPassword: ''
    },
    Preferences: {
      theme: 'light',
      language: 'english'
    }
  });

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('https://digi-be.onrender.com/api/current-user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch user settings');
        }

        const userData = await response.json();

        setSettings({
          Account: {
            name: userData.name || '',
            email: userData.email || '',
            phone: userData.phone || '',
            password: '',
            newPassword: ''
          },
          Preferences: {
            theme: userData.theme || 'light',
            language: userData.language || 'english'
          }
        });
      } catch (error) {
        console.error('Error fetching settings:', error);
        alert('Failed to load user settings');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [navigate]);

  useEffect(() => {
    const applyTheme = () => {
      const themePreference = settings.Preferences.theme;
      if (themePreference === 'system') {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.className = systemPrefersDark ? 'dark-theme' : 'light-theme';
      } else {
        document.body.className = themePreference === 'dark' ? 'dark-theme' : 'light-theme';
      }
    };
  
    applyTheme();
  
    // Watch for system preference changes if 'system' theme is selected
    const systemThemeListener = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = () => {
      if (settings.Preferences.theme === 'system') {
        applyTheme();
      }
    };
  
    systemThemeListener.addEventListener('change', handleSystemChange);
  
    return () => {
      systemThemeListener.removeEventListener('change', handleSystemChange);
    };
  }, [settings.Preferences.theme]);
  

  const updateSettings = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const validateSettings = () => {
    const { email, phone, password, newPassword } = settings.Account;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return false;
    }

    if (phone && !/^\+?[\d\s-]{10,}$/.test(phone)) {
      alert('Please enter a valid phone number');
      return false;
    }

    // If password is provided, new password must also be provided
    if ((password && !newPassword) || (!password && newPassword)) {
      alert('To change password, provide both current and new passwords');
      return false;
    }

    if (newPassword && newPassword.length < 6) {
      alert('New password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateSettings()) return;

    try {
      const token = localStorage.getItem('token');
      
      const updateData = {
        name: settings.Account.name,
        email: settings.Account.email,
        phone: settings.Account.phone,
        theme: settings.Preferences.theme,
        language: settings.Preferences.language
      };

      // Only add password fields if both are provided
      if (settings.Account.password && settings.Account.newPassword) {
        updateData.currentPassword = settings.Account.password;
        updateData.newPassword = settings.Account.newPassword;
      }

      const response = await fetch('https://digi-be.onrender.com/api/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to save settings');
      }

      setShowSaveConfirmation(true);
      setTimeout(() => {
        setShowSaveConfirmation(false);
        navigate('/home');
      }, 2000);
    } catch (error) {
      console.error('Save failed:', error);
      alert(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('https://digi-be.onrender.com/api/user/delete', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
        
      const responseData = await response.json();

      if (response.ok) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        alert(responseData.message || 'Failed to delete account');
      }
    } catch (error) {
      console.error('Delete account error:', error);
      alert('Network error. Please try again.');
    }
  };

  if (loading) return <div className="loading">Loading Settings...</div>;

  return (
    <div className="settings-container">
      {showSaveConfirmation && (
        <div className="notification success">Settings saved! Redirecting...</div>
      )}

      <div className="settings-tabs">
        <button 
          className={`tab-button ${activeTab === 'account' ? 'active' : ''}`} 
          onClick={() => setActiveTab('account')}
        >
          Account
        </button>
        <button 
          className={`tab-button ${activeTab === 'preferences' ? 'active' : ''}`} 
          onClick={() => setActiveTab('preferences')}
        >
          Preferences
        </button>
      </div>
      <div className="settings-content">
        {activeTab === 'account' && (
          <>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                id="name"
                type="text" 
                placeholder='Enter your name'
                value={settings.Account.name}
                onChange={(e) => updateSettings("Account", "name", e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                id="email"
                type="email" 
                placeholder='Enter email'
                value={settings.Account.email}
                onChange={(e) => updateSettings("Account", "email", e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input 
                id="phone"
                type="tel" 
                placeholder='Enter phone number'
                value={settings.Account.phone}
                onChange={(e) => updateSettings("Account", "phone", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="current-password">Current Password</label>
              <input 
                id="current-password"
                type="password" 
                placeholder='Enter current password'
                value={settings.Account.password}
                onChange={(e) => updateSettings("Account", "password", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="new-password">New Password</label>
              <input 
                id="new-password"
                type="password" 
                placeholder='Enter new password (optional)'
                value={settings.Account.newPassword}
                onChange={(e) => updateSettings("Account", "newPassword", e.target.value)}
              />
            </div>
            <button 
              className="delete-account" 
              onClick={() => setShowDeleteConfirmation(true)}
            >
              Delete Account
            </button>
          </>
        )}

        {activeTab === 'preferences' && (
          <>
            <div className="form-group">
              <label htmlFor="theme">Theme</label>
              <select 
                id="theme"
                value={settings.Preferences.theme}
                onChange={(e) => updateSettings("Preferences", "theme", e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="language">Language</label>
              <select 
                id="language"
                value={settings.Preferences.language}
                onChange={(e) => updateSettings("Preferences", "language", e.target.value)}
              >
                <option value="english">English</option>
              </select>
            </div>
          </>
        )}
      </div>

      <div className="actions">
        <button onClick={handleSave} className="save-button" style={{backgroundColor:"#111827"}}>Save Changes</button>
        <button onClick={() => navigate('/home')} className="cancel-button">
          Back to Dashboard
        </button>
      </div>

      {showDeleteConfirmation && (
        <div className="overlay">
          <div className="confirmation-dialog">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete your account? This action is irreversible.</p>
            <div className="dialog-actions">
              <button onClick={() => setShowDeleteConfirmation(false)}>Cancel</button>
              <button 
                className="confirm-delete" 
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
      
  );
};

export default Settings;