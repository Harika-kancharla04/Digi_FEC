import React, { useEffect, useState } from "react";
import './ResumeTemplate2.css';

const ResumeTemplate2 = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem("userId");

      if (userId === "guest") {
        setProfile({
          name: "Guest User",
          email: "guest@example.com",
          phone: "0000000000",
          experiences: [
            {
              company: "Guest Company",
              position: "Intern",
              startDate: "Jan 2024",
              endDate: "June 2024",
              description: "Worked on UI and React components.",
            },
          ],
          education: [
            { institution: "Sample University", degree: "B.Tech", year: "2024" },
          ],
          projects: [
            {
              title: "Guest Project",
              description: "A sample project by guest user.",
              link: "https://github.com",
            },
          ],
        });
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="resume-wrapper">
      <div className="resume-header">
        <h1>{profile.name}</h1>
        <a href={`mailto:${profile.email}`}>{profile.email}</a> | <a href={`tel:${profile.phone}`}>{profile.phone}</a>
      </div>

      <div className="resume-content">
        <div className="left-column">
          <h2>Experience</h2>
          {profile.experiences?.map((exp, index) => (
            <div key={index}>
              <p>
                <strong>{exp.position}</strong> at <strong>{exp.company}</strong> <br />
                ({exp.startDate} - {exp.endDate})
              </p>
              <p>{exp.description}</p>
            </div>
          ))}

          <h2>Education</h2>
          {profile.education?.map((edu, index) => (
            <div key={index}>
              <p>
                <strong>{edu.institution}</strong> - {edu.degree} ({edu.year})
              </p>
            </div>
          ))}
        </div>

        <div className="right-column">
          <h2>Projects</h2>
          {profile.projects?.map((proj, index) => (
            <div key={index}>
              <p>
                <strong>{proj.title}</strong> <br />
                {proj.description}
              </p>
              {proj.link && (
                <p>
                  Project Link: <a href={proj.link}>{proj.link}</a>
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplate2;
