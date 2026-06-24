'use client';

import React from 'react';
import { educations } from '@/data/portfolio';

export function Education() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section 
      id="education" 
      className="section-py" 
      style={{ background: 'linear-gradient(180deg, var(--color-bg) 0%, var(--color-bg-alt) 100%)' }}
    >
      <div className="container">
        <h2 className="section-title">Education</h2>
        
        <div className="edu-grid">
          {educations.map((edu, idx) => (
            <div
              key={idx}
              className="glass-card edu-card"
              onMouseMove={handleMouseMove}
            >
              <h3 className="edu-degree">{edu.degree}</h3>
              <span className="edu-school">{edu.school}</span>
              <div className="edu-meta">
                <span>{edu.duration}</span>
                <span className="edu-grade">{edu.grade}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Education;
