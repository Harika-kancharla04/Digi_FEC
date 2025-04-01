import React, { useEffect, useState } from 'react'
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Clock, Calendar, Award, Activity, Github, Linkedin, Twitter, ExternalLink, Code, Briefcase, BookOpen, Medal, Monitor, Brain, Settings } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import "./Home.css"

const Home = () => {
    const [profile, setProfile] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const userId = localStorage.getItem('userId');
                
                if (userId) {
                    const response = await fetch(`https://digi-be.onrender.com/api/user/${userId}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        }
                    });
                    
                    if (response.ok) {
                        const userData = await response.json();
                        setProfile(userData);

                        setStats({
                            skillCount: userData.skills?.length || 0,
                            expYears: calExpYears(userData.experiences || []),
                            projCount: userData.projects?.length || 0,
                            eduCount: userData.education?.length || 0,
                            profileProgress: calProfileProgress(userData)
                        });
                    } else {
                        console.error('Error fetching user data');
                        setProfile({ name: 'Your Name' });
                    }
                } else {
                    const response = await fetch('https://digi-be.onrender.com/api/user');
                    if (response.ok) {
                        const users = await response.json();
                        if (users.length > 0) {
                            const userData = users[users.length - 1];
                            setProfile(userData);

                            setStats({
                                skillCount: userData.skills?.length || 0,
                                expYears: calExpYears(userData.experiences || []),
                                projCount: userData.projects?.length || 0,
                                eduCount: userData.education?.length || 0,
                                profileProgress: calProfileProgress(userData)
                            });
                        } else {
                            setProfile({ name: 'Your Name' });
                        }
                    } else {
                        console.error('Error fetching user data');
                        setProfile({ name: 'Your Name' });
                    }
                }
            } catch (error) {
                console.error("Backend connection error:", error);
                setProfile({ name: 'Your Name' });
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const calExpYears = (experience) => {
        let totalMonths = 0;

        experience?.forEach(exp => {
            const startDate = new Date(exp.startDate);
            const endDate = exp.endDate ? new Date(exp.endDate) : new Date();

            const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
                (endDate.getMonth() - startDate.getMonth());

            totalMonths += months;
        });

        return Math.round(totalMonths / 12 * 10) / 10;
    };


    const calProfileProgress = (profile) => {
        const sections = [
            { name: 'basic', fields: ['name', 'title', 'location'], weight: 20 },
            { name: 'social', fields: ['socialLinks'], weight: 15 },
            { name: 'skills', fields: ['skills'], weight: 20 },
            { name: 'projects', fields: ['projects'], weight: 20 },
            { name: 'experience', fields: ['experiences'], weight: 15 },
            { name: 'education', fields: ['education'], weight: 10 }
        ];

        let progress = 0;

        sections.forEach(section => {
            let sectionProgress = 0;
            section.fields.forEach(field => {
                if (field === 'socialLinks') {
                    if (profile[field] &&
                        (profile[field].github || profile[field].linkedin || profile[field].twitter)) {
                        sectionProgress += 1;
                    }
                } else if (Array.isArray(profile[field])) {
                    if (profile[field] && profile[field].length > 0) {
                        sectionProgress += 1;
                    }
                } else if (profile[field] && profile[field] !== 'Your Name') {
                    sectionProgress += 1;
                }
            });

            progress += (sectionProgress / section.fields.length) * section.weight;
        });

        return Math.round(progress);
    };

    if (loading) return <div>Loading Profile...</div>;

    if (!profile || profile.name === 'Your Name') {
        return (
            <div className='Home-container'>
                <div className='HomeUpperContainer'>
                    <User size={70} />
                </div>
                <div className='HomeLowerContainer'>
                    <h1>Build Your Digital Identity</h1>
                    <p>Create a stunning professional profile and see your career stats at a glance.</p>
                    <button className="get-started-btn" onClick={() => navigate('/profile')}>
                        Create Your Profile
                    </button>
                </div>
            </div>
        )
    }

    const countSkillsByCategory = (skills, category) => {
        const categoryMap = {
            'technical': [
                'JavaScript', 'Python', 'React', 'Node.js', 'SQL',
                'Java', 'C++', 'TypeScript', 'Swift', 'Kotlin',
                'Django', 'Flask', 'Spring Boot', 'GraphQL', 'Rust', 'HTML', 'CSS'
            ],
            'soft': [
                'Communication', 'Leadership', 'Teamwork', 'Problem Solving',
                'Time Management', 'Critical Thinking', 'Adaptability', 'Creativity',
                'Emotional Intelligence', 'Decision Making', 'Collaboration'
            ],
            'tools': [
                'Git', 'Docker', 'AWS', 'Photoshop', 'Figma',
                'Kubernetes', 'Jenkins', 'Terraform', 'Ansible', 'Postman',
                'VS Code', 'JIRA', 'Slack', 'Notion', 'Trello'
            ],
            'domain': [
                'Marketing', 'Finance', 'Healthcare', 'Education',
                'Cybersecurity', 'E-commerce', 'Data Science', 'Artificial Intelligence',
                'Blockchain', 'Game Development', 'Human Resources', 'Supply Chain'
            ]
        };

        return skills?.filter(skill =>
            categoryMap[category]?.some(cat =>
                skill.toLowerCase().includes(cat.toLowerCase())
            )
        ).length || 0;
    };


    const categorizeProjects = (projects) => {
        const types = {
            'Web Development': 0,
            'Mobile App': 0,
            'Data Science': 0,
            'UI/UX': 0,
            'Other': 0
        };

        projects?.forEach(project => {
            const projectData = (project.name + ' ' + project.description + ' ' + (project.technologies || []).join(' ')).toLowerCase();

            if (projectData.includes('web') || projectData.includes('react') || projectData.includes('html') ||
                projectData.includes('css') || projectData.includes('javascript') || projectData.includes('node')) {
                types['Web Development']++;
            } else if (projectData.includes('mobile') || projectData.includes('app') || projectData.includes('android') ||
                projectData.includes('ios') || projectData.includes('swift') || projectData.includes('kotlin')) {
                types['Mobile App']++;
            } else if (projectData.includes('data') || projectData.includes('analytics') || projectData.includes('ai') ||
                projectData.includes('machine learning') || projectData.includes('python')) {
                types['Data Science']++;
            } else if (projectData.includes('ui') || projectData.includes('ux') || projectData.includes('design') ||
                projectData.includes('figma') || projectData.includes('prototype')) {
                types['UI/UX']++;
            } else {
                types['Other']++;
            }
        });

        return Object.keys(types).map(key => ({
            name: key,
            value: types[key]
        })).filter(item => item.value > 0);
    };


    const groupSkillsByCategory = (skills) => {
        const categoryMap = {
            'technical': {
                name: 'Technical',
                icon: <Code size={20} />,
                skills: []
            },
            'soft': {
                name: 'Soft Skills',
                icon: <Brain size={20} />,
                skills: []
            },
            'tools': {
                name: 'Tools & Platforms',
                icon: <Settings size={20} />,
                skills: []
            },
            'domain': {
                name: 'Domain Knowledge',
                icon: <Briefcase size={20} />,
                skills: []
            }
        };

        const categoryDefinitions = {
            'technical': [
                'JavaScript', 'Python', 'React', 'Node.js', 'SQL',
                'Java', 'C++', 'TypeScript', 'Swift', 'Kotlin',
                'Django', 'Flask', 'Spring Boot', 'GraphQL', 'Rust', 'HTML', 'CSS'
            ],
            'soft': [
                'Communication', 'Leadership', 'Teamwork', 'Problem Solving',
                'Time Management', 'Critical Thinking', 'Adaptability', 'Creativity',
                'Emotional Intelligence', 'Decision Making', 'Collaboration'
            ],
            'tools': [
                'Git', 'Docker', 'AWS', 'Photoshop', 'Figma',
                'Kubernetes', 'Jenkins', 'Terraform', 'Ansible', 'Postman',
                'VS Code', 'JIRA', 'Slack', 'Notion', 'Trello'
            ],
            'domain': [
                'Marketing', 'Finance', 'Healthcare', 'Education',
                'Cybersecurity', 'E-commerce', 'Data Science', 'Artificial Intelligence',
                'Blockchain', 'Game Development', 'Human Resources', 'Supply Chain'
            ]
        };

        skills?.forEach(skill => {
            let assigned = false;

            for (const [category, keywords] of Object.entries(categoryDefinitions)) {
                if (keywords.some(keyword => skill.toLowerCase().includes(keyword.toLowerCase()))) {
                    categoryMap[category].skills.push(skill);
                    assigned = true;
                    break;
                }
            }

            if (!assigned) {
                categoryMap['technical'].skills.push(skill);
            }
        });

        return categoryMap;
    };

    const skillCategoryData = [
        { name: 'Technical', value: countSkillsByCategory(profile.skills || [], 'technical') },
        { name: 'Soft', value: countSkillsByCategory(profile.skills || [], 'soft') },
        { name: 'Tools', value: countSkillsByCategory(profile.skills || [], 'tools') },
        { name: 'Domain', value: countSkillsByCategory(profile.skills || [], 'domain') },
    ];

    const projectTypeData = categorizeProjects(profile.projects || []);
    const groupedSkills = groupSkillsByCategory(profile.skills || []);

    const COLORS = ['#6366F1', '#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

    return (
        <div className='Home-content'>

            <div className='Home-profile'>
                <div className="last-updated">
                    Last updated: {new Date().toLocaleDateString()}
                </div>
                <div className='profile-circle'>
                    <img
                        src={profile.profileImage || "/api/placeholder/200/200"}
                        alt="Profile"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}/>
                </div>
                <div className='profile-data'>
                    <h2>{profile.name}</h2>
                    <p className="profile-title">{profile.title}</p>
                    <p className="profile-location">
                        <span className="location-icon">📍</span> {profile.location || 'Location not set'}
                    </p>
                </div>

                <div className='profile-social'>
                    {profile.socialLinks?.github && (
                        <a href={profile.socialLinks.github} className="social-icon" target="_blank" rel="noopener noreferrer">
                            <Github size={20} />
                        </a>
                    )}
                    {profile.socialLinks?.linkedin && (
                        <a href={profile.socialLinks.linkedin} className="social-icon" target="_blank" rel="noopener noreferrer">
                            <Linkedin size={20} />
                        </a>
                    )}
                    {profile.socialLinks?.twitter && (
                        <a href={profile.socialLinks.twitter} className="social-icon" target="_blank" rel="noopener noreferrer">
                            <Twitter size={20} />
                        </a>
                    )}
                </div>
                <button className="edit-profile-btn" onClick={() => navigate('/profile')}>
                    Edit Profile
                </button>
            </div>

            <div className="stat-cards">
                <div className="stat-card">
                    <div className="stat-icon"><Clock size={24} /></div>
                    <div className="stat-value">{stats?.expYears || 0}</div>
                    <div className="stat-label">Years Experience</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon"><Code size={24} /></div>
                    <div className="stat-value">{stats?.skillCount || 0}</div>
                    <div className="stat-label">Skills</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon"><Briefcase size={24} /></div>
                    <div className="stat-value">{stats?.projCount || 0}</div>
                    <div className="stat-label">Projects</div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon"><Award size={24} /></div>
                    <div className="stat-value">{stats?.eduCount || 0}</div>
                    <div className="stat-label">Education</div>
                </div>
            </div>

            <div className="dashboard-grid">
                <div className="dashboard-card skill-distribution">
                    <h3>Skill Distribution</h3>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={skillCategoryData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#6366F1" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/*Projects Section */}
            <div className="projects-section">
                <div className="section-header">
                    <h2>Featured Projects</h2>
                </div>

                <div className="projects-grid">
                    {profile.projects && profile.projects.length > 0 ? (
                        profile.projects.slice(0, 3).map((project, index) => (
                            <div className="project-card" key={index}>
                                <div className="project-header">
                                    <h3>{project.title || project.name}</h3>
                                    {project.link && (
                                        <a href={project.link} target="_blank" className="project-link" rel="noopener noreferrer">
                                            <ExternalLink size={16} />
                                        </a>
                                    )}
                                </div>
                                <p className="project-description">{project.description}</p>
                                <div className="project-tech">
                                    {project.technologies && project.technologies.map((tech, techIndex) => (
                                        <span className="tech-tag" key={techIndex}>{tech}</span>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-projects-message">
                            <p>You haven't added any projects yet.</p>
                            <button className="add-project-btn" onClick={() => navigate('/profile')}>
                                Add Your First Project
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/*Experience */}
            <div className="timeline-section">
                <div className="section-header">
                    <h2>Experience</h2>
                </div>
                {profile.experiences && profile.experiences.length > 0 ? (
                    <div className="timeline">
                        {profile.experiences.map((exp, index) => (
                            <div className="timeline-item" key={index}>
                                <div className="timeline-content">
                                    <h3>{exp.role}</h3>
                                    <h4>{exp.company}</h4>
                                    <p className="timeline-period">{exp.duration || `${exp.startDate} - ${exp.endDate || 'Present'}`}</p>
                                    <p className="timeline-description">{exp.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-data-message">
                        <p>No experience added yet</p>
                        <button className="add-data-btn" onClick={() => navigate('/profile')}>
                            Add Experience
                        </button>
                    </div>
                )}
            </div>

            {/* Skills & expertise Section */}
            <div className="skills-section">
                <div className="section-header">
                    <h2>Skills & Expertise</h2>
                </div>

                <div className="skills-grid">
                    {Object.values(groupedSkills).map((category, index) => (
                        category.skills.length > 0 && (
                            <div className="skill-category" key={index}>
                                <h3>
                                    {category.icon}
                                    {category.name}
                                </h3>
                                <div className="skill-list">
                                    {category.skills.map((skill, skillIndex) => (
                                        <span className="skill-pill" key={skillIndex}>{skill}</span>
                                    ))}
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>

            {/* Education Section */}
            <div className="education-section">
                <div className="section-header">
                    <h2>Education</h2>
                </div>

                {profile.education && profile.education.length > 0 ? (
                    profile.education.map((edu, index) => (
                        <div className="education-card" key={index}>
                            <h3>{edu.degree}</h3>
                            <h4>{edu.institution}</h4>
                            <p className="education-period">{edu.year}</p>
                            {edu.description && (
                                <p>{edu.description}</p>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="no-data-message">
                        <p>No education details added yet</p>
                        <button className="add-data-btn" onClick={() => navigate('/profile')}>
                            Add Education
                        </button>
                    </div>
                )}
            </div>

            {/* Profile Completion Progress */}
            <div className="dashboard-card" style={{ gridColumn: 'span 12', marginTop: '1.5rem' }}>
                <h3>Profile Completion</h3>
                <div style={{ marginBottom: '1rem' }}>
                    <div style={{
                        height: '10px',
                        width: '100%',
                        backgroundColor: '#e5e7eb',
                        borderRadius: '5px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            height: '100%',
                            width: `${stats?.profileProgress || 0}%`,
                            backgroundColor: '#6366F1',
                            borderRadius: '5px'
                        }}></div>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '0.5rem',
                        fontSize: '0.9rem',
                        color: '#6b7280'
                    }}>
                        <span>Profile Completion: {stats?.profileProgress || 0}%</span>
                        {(!stats || stats.profileProgress < 100) && (
                            <button
                                className="add-data-btn"
                                style={{ margin: 0, padding: '0.3rem 0.6rem' }}
                                onClick={() => navigate('/profile')}
                            >
                                Complete Profile
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;