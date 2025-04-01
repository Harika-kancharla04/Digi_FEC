import React from 'react';
import { Plus, Trash2, Globe } from 'lucide-react';

const ProjectsTab = ({ profile = { projects: [] }, setProfile, isEditing }) => {
  if (!profile) return <p>Loading...</p>;

  const handleProjectAdd = () => {
    setProfile(prevProfile => ({
      ...prevProfile,
      projects: [
        ...(prevProfile.projects || []),
        {
          title: '',
          description: '',
          link: ''
        }
      ]
    }));
  };

  const handleProjectChange = (index, field, value) => {
    setProfile(prevProfile => {
      const updatedProjects = [...(prevProfile.projects || [])];
      updatedProjects[index] = {
        ...updatedProjects[index],
        [field]: value
      };
      return { ...prevProfile, projects: updatedProjects };
    });
  };

  const handleProjectRemove = (index) => {
    setProfile(prevProfile => {
      const updatedProjects = [...(prevProfile.projects || [])];
      updatedProjects.splice(index, 1);
      return { ...prevProfile, projects: updatedProjects };
    });
  };

  return (
    <div className="profile-projects">
      <h2>Projects</h2>
      {(profile.projects || []).map((project, index) => (
        <div key={index} className="project-item">
          {isEditing ? (
            <>
              <div className="edit-header">
                <input
                  type="text"
                  value={project.title || ""}
                  onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                  className="edit-input title-input"
                  placeholder="Project Title"
                />
                <button 
                  className="remove-btn" 
                  onClick={() => handleProjectRemove(index)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <textarea
                value={project.description || ""}
                onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                className="edit-textarea"
                placeholder="Project description"
              />
              <input
                type="text"
                value={project.link || ""}
                onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                className="edit-input link-input"
                placeholder="Project Link"
              />
            </>
          ) : (
            <>
              <h3>{project.title || "Project Title"}</h3>
              <p>{project.description || "Project description"}</p>
              {project.link && (
                <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
                  <Globe size={16} /> View Project
                </a>
              )}
            </>
          )}
        </div>
      ))}
      {isEditing && (
        <button 
          className="add-btn project-add" 
          onClick={handleProjectAdd}
        >
          <Plus size={16} /> Add Project
        </button>
      )}
    </div>
  );
};

export default ProjectsTab;
