'use client';

import React from 'react';
import { Award, ExternalLink } from 'lucide-react';
import { certifications } from '@/data/portfolio';

export function Certifications() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleCardClick = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="certifications" className="section-py">
      <div className="container">
        <h2 className="section-title">Certifications</h2>
        
        <div className="certs-grid">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="glass-card cert-card"
              onMouseMove={handleMouseMove}
              onClick={() => handleCardClick(cert.link)}
            >
              <div className="cert-header">
                <div className="cert-logo-container">
                  <div className="cert-logo-fallback">
                    <Award className="w-[18px] h-[18px]" />
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-500" />
              </div>
              <h3 className="cert-title">{cert.title}</h3>
              <span className="cert-issuer">{cert.issuer}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Certifications;
