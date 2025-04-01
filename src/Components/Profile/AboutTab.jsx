import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const AboutTab = ({ profile = { skills: [], summary: "" }, setProfile, isEditing }) => {
  if (!profile) return <p>Loading...</p>;

  const handleSkillAdd = () => {
    setProfile(prevProfile => ({
      ...prevProfile,
      skills: [...(prevProfile.skills || []), 'New Skill']
    }));
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...(profile.skills || [])];
    updatedSkills[index] = value;
    setProfile(prevProfile => ({
      ...prevProfile,
      skills: updatedSkills
    }));
  };

  const handleSkillRemove = (index) => {
    const updatedSkills = [...(profile.skills || [])];
    updatedSkills.splice(index, 1);
    setProfile(prevProfile => ({
      ...prevProfile,
      skills: updatedSkills
    }));
  };

  return (
    <div className="profile-about">
      <h2>About Me</h2>
      {isEditing ? (
        <textarea
          value={profile.summary || ""}
          onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
          className="edit-textarea"
          placeholder="Write your professional summary here..."
        />
      ) : (
        <p>{profile.summary || "No summary provided"}</p>
      )}

      <div className="skills-section">
        <h3>Core Skills</h3>
        <div className="skills-grid">
          {(profile.skills || []).map((skill, index) => (
            <div key={index} className="skill-tag">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    className="edit-input skill-input"
                  />
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => handleSkillRemove(index)}
                  >
                    <Trash2 size={14} />
                  </button>
                </>
              ) : (
                <span>{skill}</span>
              )}
            </div>
          ))}
          {isEditing && (
            <button
              type="button"
              className="add-btn skill-add"
              onClick={handleSkillAdd}
            >
              <Plus size={16} /> Add Skill
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutTab;
