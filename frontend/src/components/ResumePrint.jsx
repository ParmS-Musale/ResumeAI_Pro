import React from 'react';

const ResumePrint = ({ resume, personalInfo }) => {
  if (!resume) return null;
  const { summary, skills, experience, projects, education } = resume;

  // Default personal info if not provided
  const info = personalInfo || {
    name: 'YOUR NAME',
    phone: '+91 XXXXXXXXXX',
    location: 'City, India',
    email: 'email@gmail.com',
    linkedin: 'LinkedIn',
    github: 'Github',
    portfolio: 'Portfolio'
  };

  return (
    <div id="resume-print-area">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #resume-print-area, #resume-print-area * { visibility: visible; }
          #resume-print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          @page {
            margin: 0.4in 0.5in;
            size: letter;
          }
        }
        
        #resume-print-area {
          font-family: 'Computer Modern', 'Latin Modern', 'Times New Roman', Georgia, serif;
          color: #000;
          background: #fff;
          max-width: 8.5in;
          margin: 0 auto;
          font-size: 10pt;
          line-height: 1.25;
        }

        .resume-header {
          text-align: center;
          margin-bottom: 4px;
        }
        .resume-header h1 {
          font-size: 20pt;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin: 0 0 2px 0;
          color: #000;
        }
        .resume-header .contact-line {
          font-size: 9pt;
          color: #333;
          margin: 1px 0;
        }
        .resume-header .contact-line a {
          color: #0066cc;
          text-decoration: none;
        }

        .resume-section {
          margin-bottom: 4px;
        }
        .resume-section-title {
          font-size: 10.5pt;
          font-weight: bold;
          text-transform: uppercase;
          color: #000;
          border-bottom: 1.5px solid #000;
          padding-bottom: 1px;
          margin-bottom: 3px;
          letter-spacing: 0.5px;
        }

        .resume-entry {
          margin-bottom: 3px;
        }
        .resume-entry-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .resume-entry-title {
          font-weight: bold;
          font-size: 10pt;
        }
        .resume-entry-date {
          font-size: 9.5pt;
          white-space: nowrap;
        }
        .resume-entry-subtitle {
          display: flex;
          justify-content: space-between;
          font-style: italic;
          font-size: 9.5pt;
          color: #333;
        }

        .resume-bullets {
          margin: 1px 0 0 12px;
          padding-left: 6px;
          list-style-type: disc;
        }
        .resume-bullets li {
          font-size: 9.5pt;
          line-height: 1.3;
          margin-bottom: 1px;
          text-align: justify;
        }

        .resume-skills-grid {
          font-size: 9.5pt;
          line-height: 1.4;
        }
        .resume-skills-grid .skill-row {
          margin-bottom: 0;
        }
        .resume-skills-grid .skill-label {
          font-weight: bold;
        }

        .resume-project-title {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }
        .resume-project-title .proj-link {
          font-size: 9pt;
          color: #0066cc;
          text-decoration: none;
          font-weight: normal;
        }
      `}</style>

      {/* Header */}
      <div className="resume-header">
        <h1>{info.name}</h1>
        <div className="contact-line">
          {info.phone} ◇ {info.location}
        </div>
        <div className="contact-line">
          {info.email} ◇ {info.linkedin} ◇ {info.github}
          {info.portfolio ? ` ◇ ${info.portfolio}` : ''}
        </div>
      </div>

      {/* Objective / Summary */}
      {summary && (
        <div className="resume-section">
          <div className="resume-section-title">Objective</div>
          <div style={{ fontSize: '9.5pt', textAlign: 'justify' }}>{summary}</div>
        </div>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <div className="resume-section">
          <div className="resume-section-title">Education</div>
          {education.map((edu, i) => (
            <div key={i} className="resume-entry">
              <div className="resume-entry-header">
                <span className="resume-entry-title">{edu.degree}</span>
                <span className="resume-entry-date">{edu.year}</span>
              </div>
              <div className="resume-entry-subtitle">
                <span>{edu.institution}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <div className="resume-section">
          <div className="resume-section-title">Experience</div>
          {experience.map((exp, i) => (
            <div key={i} className="resume-entry">
              <div className="resume-entry-header">
                <span className="resume-entry-title">{exp.role}, {exp.company}</span>
                <span className="resume-entry-date">{exp.duration}</span>
              </div>
              {exp.bulletPoints && exp.bulletPoints.length > 0 && (
                <ul className="resume-bullets">
                  {exp.bulletPoints.map((point, j) => (
                    <li key={j}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="resume-section">
          <div className="resume-section-title">Skills</div>
          <div className="resume-skills-grid">
            <div className="skill-row">
              <span className="skill-label">Technologies: </span>
              {skills.join(', ')}
            </div>
          </div>
        </div>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <div className="resume-section">
          <div className="resume-section-title">Projects</div>
          {projects.map((proj, i) => (
            <div key={i} className="resume-entry">
              <div className="resume-entry-header">
                <div className="resume-project-title">
                  <span style={{ fontSize: '9.5pt' }}>•</span>
                  <span className="resume-entry-title">{proj.name}</span>
                  {proj.link && (
                    <span className="proj-link">- ({proj.link})</span>
                  )}
                </div>
              </div>
              {proj.description && (
                <ul className="resume-bullets">
                  {(Array.isArray(proj.description) ? proj.description : [proj.description]).map((desc, j) => (
                    <li key={j}>{desc}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumePrint;
