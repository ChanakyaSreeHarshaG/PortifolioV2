import React from 'react';
import { aboutParagraph, personalInfo } from '@/data/portfolio';

export function About() {
  return (
    <section id="about" className="stats-section section-py">
      <div className="container">
        <h2 className="section-title">About Me</h2>

        <div className="stats-desc-box">
          <p className="stats-paragraph">
            {aboutParagraph}
          </p>
          <div className="locations-strip">
            <span>📍 Preferred Locations:</span>
            {personalInfo.preferredLocations.map((loc, idx) => (
              <React.Fragment key={loc}>
                <span>{loc}</span>
                {idx < personalInfo.preferredLocations.length - 1 && <span>|</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default About;
