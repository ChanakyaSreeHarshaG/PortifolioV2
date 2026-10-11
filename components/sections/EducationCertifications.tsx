import React from 'react';
import { educations, certifications } from '@/data/portfolio';

export function EducationCertifications() {
  const primaryEdu = educations[0];
  const featuredCerts = certifications.filter((c) => c.isFeatured);
  const supportingCerts = certifications.filter((c) => !c.isFeatured);

  return (
    <section id="credentials" className="section-py credentials-section">
      <div className="container">
        <div className="cred-two-col-grid">
          {/* EDUCATION COLUMN */}
          <div className="cred-block-col">
            <h3 className="cred-header-h3">Education</h3>

            <div className="edu-simple-box">
              <h4 className="edu-degree-text">{primaryEdu.degree}</h4>
              <div className="edu-school-text">{primaryEdu.school}</div>
              <div className="edu-year-text">{primaryEdu.duration}</div>
            </div>
          </div>

          {/* CERTIFICATIONS COLUMN */}
          <div className="cred-block-col">
            <h3 className="cred-header-h3">Certifications</h3>

            <div className="certs-archival-list">
              {/* FEATURED MICROSOFT CERTIFICATIONS */}
              {featuredCerts.map((cert, idx) => (
                <div key={idx} className="cert-row-item featured">
                  <div>
                    <div className="cert-title-bold">{cert.title}</div>
                    <div className="cert-issuer-sub">{cert.issuer}</div>
                  </div>
                </div>
              ))}

              {/* SUPPORTING CERTIFICATIONS */}
              {supportingCerts.map((cert, idx) => (
                <a
                  key={idx}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-row-item"
                >
                  <div>
                    <div className="cert-title-bold text-sm">{cert.title}</div>
                    <div className="cert-issuer-sub">{cert.issuer}</div>
                  </div>
                  <span className="understated-link">View ↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default EducationCertifications;
