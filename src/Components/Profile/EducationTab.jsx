import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const EducationTab = ({ profile = { education: [] }, setProfile, isEditing }) => {
  if (!profile) return <p>Loading...</p>;

  const handleEducationAdd = () => {
    setProfile(prevProfile => ({
      ...prevProfile,
      education: [
        ...(prevProfile.education || []),
        {
          institution: 'New Institution',
          degree: 'Degree Title',
          year: 'Year'
        }
      ]
    }));
  };

  const handleEducationChange = (index, field, value) => {
    setProfile(prevProfile => {
      const updatedEducation = [...(prevProfile.education || [])];
      updatedEducation[index] = {
        ...updatedEducation[index],
        [field]: value
      };
      return { ...prevProfile, education: updatedEducation };
    });
  };

  const handleEducationRemove = (index) => {
    setProfile(prevProfile => {
      const updatedEducation = [...(prevProfile.education || [])];
      updatedEducation.splice(index, 1);
      return { ...prevProfile, education: updatedEducation };
    });
  };

  return (
    <div className="profile-education">
      <h2>Education</h2>
      {(profile.education || []).map((edu, index) => (
        <div key={index} className="education-item">
          {isEditing ? (
            <>
              <div className="edit-header">
                <input
                  type="text"
                  value={edu.degree || ""}
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                  className="edit-input degree-input"
                  placeholder="Degree Title"
                />
                <button 
                  className="remove-btn" 
                  onClick={() => handleEducationRemove(index)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <input
                type="text"
                value={edu.institution || ""}
                onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                className="edit-input institution-input"
                placeholder="Institution Name"
              />
              <input
                type="text"
                value={edu.year || ""}
                onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                className="edit-input year-input"
                placeholder="Graduation Year"
              />
            </>
          ) : (
            <>
              <h3>{edu.degree || "Degree Title"}</h3>
              <p>{edu.institution || "Institution Name"}</p>
              <span className="education-year">{edu.year || "Year"}</span>
            </>
          )}
        </div>
      ))}
      {isEditing && (
        <button 
          className="add-btn education-add" 
          onClick={handleEducationAdd}
        >
          <Plus size={16} /> Add Education
        </button>
      )}
    </div>
  );
};

export default EducationTab;
