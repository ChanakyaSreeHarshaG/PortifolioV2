import React from 'react';
import { experiences } from '@/data/portfolio';

export function Experience() {
  return (
    <section 
      id="experience" 
      className="section-py" 
      style={{ background: 'linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-alt) 100%)' }}
    >
      <div className="container">
        <h2 className="section-title">Work Experience</h2>
        
        <div className="timeline">
          {experiences.map((exp, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-header">
                <div>
                  <h3 className="timeline-role">{exp.role}</h3>
                  <span className="timeline-company">{exp.company}</span>
                </div>
                <div className="timeline-date-loc">
                  <span>{exp.duration}</span><br />
                  <span>{exp.location}</span>
                </div>
              </div>
              <ul className="timeline-body">
                {exp.responsibilities.map((resp, respIdx) => (
                  <li key={respIdx}>{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Experience;
