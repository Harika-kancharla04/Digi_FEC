import React from 'react';
import { Briefcase, Award, Book, Code } from 'lucide-react';

const ProfileTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'about', label: 'About', icon: <Award size={16} /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase size={16} /> },
    { id: 'education', label: 'Education', icon: <Book size={16} /> },
    { id: 'projects', label: 'Projects', icon: <Code size={16} /> }
  ];

  return (
    <div className="profile-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ProfileTabs;
