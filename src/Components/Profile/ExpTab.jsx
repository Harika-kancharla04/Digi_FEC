import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const ExperienceTab = ({ profile = { experiences: [] }, setProfile, isEditing }) => {
  if (!profile) return <p>Loading...</p>;

  const handleExperienceAdd = () => {
    setProfile(prevProfile => ({
      ...prevProfile,
      experiences: [
        ...(prevProfile.experiences || []),
        {
          company: 'New Company',
          position: 'Position Title',
          startDate: '',
          endDate: '',
          description: 'Job description'
        }
      ]
    }));
  };

  const handleExperienceChange = (index, field, value) => {
    setProfile(prevProfile => {
      const updatedExperiences = [...(prevProfile.experiences || [])];
      updatedExperiences[index] = {
        ...updatedExperiences[index],
        [field]: value
      };
      return { ...prevProfile, experiences: updatedExperiences };
    });
  };

  const handleExperienceRemove = (index) => {
    setProfile(prevProfile => {
      const updatedExperiences = [...(prevProfile.experiences || [])];
      updatedExperiences.splice(index, 1);
      return { ...prevProfile, experiences: updatedExperiences };
    });
  };

  return (
    <div className="profile-experience">
      <h2>Professional Experience</h2>
      {(profile.experiences || []).map((exp, index) => (
        <div key={index} className="experience-item">
          {isEditing ? (
            <>
              <div className="edit-header">
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                  className="edit-input title-input"
                  placeholder="Position Title"
                />
                <button 
                  className="remove-btn" 
                  onClick={() => handleExperienceRemove(index)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                className="edit-input company-input"
                placeholder="Company Name"
              />
              <label>Start Date:</label>
              <input
                type="date"
                value={exp.startDate}
                onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                className="edit-input duration-input"
              />
              <label>End Date:</label>
              <input
                type="date"
                value={exp.endDate}
                onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                className="edit-input duration-input"
              />
              <textarea
                value={exp.description}
                onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                className="edit-textarea"
                placeholder="Job description and responsibilities"
              />
            </>
          ) : (
            <>
              <div className="experience-header">
                <h3>{exp.position || "Position Title"}</h3>
                <span className="experience-duration">
                  {exp.startDate && exp.endDate 
                    ? `${exp.startDate} - ${exp.endDate}`
                    : "Duration not specified"}
                </span>
              </div>
              <p className="experience-company">{exp.company || "Company Name"}</p>
              <p>{exp.description || "Job description"}</p>
            </>
          )}
        </div>
      ))}
      {isEditing && (
        <button 
          className="add-btn experience-add" 
          onClick={handleExperienceAdd}
        >
          <Plus size={16} /> Add Experience
        </button>
      )}
    </div>
  );
};

export default ExperienceTab;
