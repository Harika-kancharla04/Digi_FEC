import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileTabs from './ProfileTab';
import AboutTab from './AboutTab';
import ExperienceTab from './ExpTab';
import EducationTab from './EducationTab';
import ProjectsTab from './ProjTab';
import './Profile.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [profile, setProfile] = useState(null); // Initially null to handle loading state
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userId = localStorage.getItem('userId');
  
        if (userId === 'guest') {
          setProfile({
            name: 'Guest User',
            email: 'guest@example.com',
            phone: 'N/A',
            location: 'Worldwide',
            summary: 'You are currently logged in as a guest. Create your own profile to personalize!',
            experience: [],
            education: [],
            projects: [],
            skills: [],
          });
          setLoading(false);
          return;
        }
  
        const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setProfile(userData);
        } else {
          console.error('Error fetching user data from backend');
        }
      } catch (error) {
        console.error('Backend connection error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);
  
  const handleSaveToBackend = async () => {
    if (!profile._id) {
      console.error('No user ID found. Cannot update profile.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/user/${profile._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        setShowSaveConfirmation(true);
        setTimeout(() => {
          setShowSaveConfirmation(false);
          navigate('/home');
        }, 1500);
      } else {
        console.error('Failed to update profile');
      }
    } catch (err) {
      console.error('Error saving to backend:', err);
    }
  };


  const handleEditToggle = () => {
    if (isEditing) {
      handleSaveToBackend();
    }
    setIsEditing(!isEditing);
  };

  const renderContent = () => {
    if (!profile) return null;
    switch (activeTab) {
      case 'about':
        return <AboutTab profile={profile} setProfile={setProfile} isEditing={isEditing} />;
      case 'experience':
        return <ExperienceTab profile={profile} setProfile={setProfile} isEditing={isEditing} />;
      case 'education':
        return <EducationTab profile={profile} setProfile={setProfile} isEditing={isEditing} />;
      case 'projects':
        return <ProjectsTab profile={profile} setProfile={setProfile} isEditing={isEditing} />;
      default:
        return null;
    }
  };

  if (loading) return <div>Loading Profile...</div>;

  return (
    <div className="profile-container">
      {showSaveConfirmation && (
        <div className="save-confirmation">
          Profile saved successfully! Redirecting...
        </div>
      )}

      <ProfileHeader
        profile={profile}
        setProfile={setProfile}
        isEditing={isEditing}
        handleEditToggle={handleEditToggle}
      />

      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="profile-content">{renderContent()}</div>

      <div className="profile-actions">
        {!isEditing && (
          <button
            className="view-dashboard-btn"
            onClick={() => navigate('/home')} style={{backgroundColor:"#111827"}}
          >
            Go to Home page
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
