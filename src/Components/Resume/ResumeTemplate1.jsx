import React, { useEffect, useState } from "react";
import "./ResumeTemplate1.css";

const generateSummaryFromSkills = (skills) => {
  if (!skills || skills.length === 0)
    return "A passionate learner with a strong technical foundation and adaptability to new technologies.";

  return `A highly motivated and detail-oriented engineering graduate skilled in ${skills.join(", ")}. Experienced in building user-friendly web applications and collaborating effectively in team environments. Continuously eager to learn and adapt to new technologies, with a focus on delivering impactful solutions.`;
};

const ResumeTemplate1 = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem("userId");

      if (userId === "guest") {
        // Guest fallback
        setProfile({
          name: "Guest User",
          email: "guest@example.com",
          phone: "0000000000",
          location: "Guest City",
          title: "Aspiring Developer",
          website: "https://example.com",
          socialLinks: {
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com",
            github: "https://github.com",
            website: "https://example.com",
          },
          education: [
            { institution: "Sample University", degree: "B.Tech", year: "2024" },
          ],
          skills: ["HTML", "CSS", "JavaScript", "React"],
          projects: [
            {
              title: "Guest Project",
              description: "A sample project by guest user.",
              link: "https://github.com",
            },
          ],
          experiences: [
            {
              company: "Guest Company",
              position: "Frontend Intern",
              startDate: "Jan 2024",
              endDate: "June 2024",
              description: "Worked on UI and React components.",
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

  const profileSummary =
    profile.summary || generateSummaryFromSkills(profile.skills || []);

  return (
    <div className="resume-wrapper">
      <h1 className="name">{profile.name}</h1>
      <p className="contact-info">
        {/* {profile.title && <span><strong>{profile.title}</strong></span>} <br /> */}
        {/* {profile.location && <span>{profile.location}</span>} <br /> */}
        <a href={`tel:${profile.phone}`}>{profile.phone}</a> |{" "}
        <a href={`mailto:${profile.email}`}>{profile.email}</a> <br />
        {profile.website && (
          <>
            <strong>Website:</strong>{" "}
            <a href={profile.website}>{profile.website}</a> <br />
          </>
        )}
        {profile.socialLinks?.linkedin && (
          <>
            <strong>LinkedIn:</strong>{" "}
            <a href={profile.socialLinks.linkedin}>{profile.socialLinks.linkedin}</a> <br />
          </>
        )}
        {/* {profile.socialLinks?.twitter && (
          <>
            <strong>Twitter:</strong>{" "}
            <a href={profile.socialLinks.twitter}>{profile.socialLinks.twitter}</a> <br />
          </>
        )} */}
        {profile.socialLinks?.github && (
          <>
            <strong>GitHub:</strong>{" "}
            <a href={profile.socialLinks.github}>{profile.socialLinks.github}</a>
          </>
        )}
      </p>

      <section>
        <h2>Profile Summary</h2>
        <p>{profileSummary}</p>
      </section>

      <section>
        <h2>Education</h2>
        {profile.education?.map((edu, index) => (
          <div key={index}>
            <p>
              <strong>{edu.institution}</strong> - {edu.degree} ({edu.year})
            </p>
          </div>
        ))}
      </section>

      <section>
        <h2>Technical Skills</h2>
        <ul className="skills-list">
          {profile.skills?.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Projects</h2>
        {profile.projects?.map((proj, index) => (
          <div key={index}>
            <p>
              <strong>{proj.title}</strong><br /><br />{proj.description}
            </p>
            {proj.link && (
              <p>
                Project Link: <a href={proj.link}>{proj.link}</a>
              </p>
            )}
          </div>
        ))}
      </section>

      {profile.experiences && profile.experiences.length > 0 && (
        <section>
          <h2>Experience</h2>
          {profile.experiences.map((exp, index) => (
            <div key={index}>
              <p>
                <strong>{exp.position}</strong> at {exp.company} ({exp.startDate} - {exp.endDate})
              </p>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ResumeTemplate1;
