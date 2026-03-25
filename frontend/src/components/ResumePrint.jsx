import React from 'react';

const ResumePrint = ({ resume }) => {
  if (!resume) return null;
  const { summary, skills, experience, projects, education } = resume;

  return (
    <div id="resume-print" className="bg-white text-black p-10 font-serif leading-relaxed text-[12pt] hidden print:block min-h-screen w-full">
      <style>{`
        @media print {
          @page { margin: 1in; }
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
        }
        .section-title {
          font-variant: small-caps;
          border-bottom: 1px solid black;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          font-size: 14pt;
          font-weight: bold;
        }
        .item-header {
          display: flex;
          justify-content: space-between;
          font-weight: bold;
          margin-bottom: 0.1rem;
        }
        .item-subheader {
          display: flex;
          justify-content: space-between;
          font-style: italic;
          font-size: 11pt;
          margin-bottom: 0.3rem;
        }
        ul { margin-left: 1.25rem; list-style-type: disc; }
        li { margin-bottom: 0.2rem; font-size: 11pt; }
      `}</style>

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-[24pt] font-bold uppercase tracking-tight mb-1">ResumeAI Optimized</h1>
        <p className="text-[10pt]">
          City, State | email@example.com | linkedin.com/in/... | github.com/...
        </p>
      </div>

      {/* Summary */}
      <div className="section-title">Summary</div>
      <p className="text-[11pt]">{summary}</p>

      {/* Skills */}
      <div className="section-title">Technical Skills</div>
      <p className="text-[11pt]">
        <strong>Technologies:</strong> {skills.join(', ')}
      </p>

      {/* Experience */}
      <div className="section-title">Experience</div>
      {experience.map((exp, i) => (
        <div key={i} className="mb-4">
          <div className="item-header">
            <span>{exp.role}</span>
            <span>{exp.duration}</span>
          </div>
          <div className="item-subheader">
            <span>{exp.company}</span>
            <span>Location</span>
          </div>
          <ul>
            {exp.bulletPoints.map((point, j) => (
              <li key={j}>{point}</li>
            ))}
          </ul>
        </div>
      ))}

      {/* Projects */}
      <div className="section-title">Projects</div>
      {projects.map((proj, i) => (
        <div key={i} className="mb-3">
          <div className="item-header">
            <span>{proj.name}</span>
            <span>{proj.link}</span>
          </div>
          <ul>
            {proj.description.map((desc, j) => (
              <li key={j}>{desc}</li>
            ))}
          </ul>
        </div>
      ))}

      {/* Education */}
      <div className="section-title">Education</div>
      {education.map((edu, i) => (
        <div key={i} className="mb-2">
          <div className="item-header">
            <span>{edu.institution}</span>
            <span>{edu.year}</span>
          </div>
          <div className="item-subheader">
            <span>{edu.degree}</span>
            <span>Location</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResumePrint;
