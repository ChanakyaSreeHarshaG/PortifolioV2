'use client';

import React from 'react';
import Image from 'next/image';
import { Github } from '../ui/Icons';
import { projects, Project } from '@/data/portfolio';

interface ProjectsProps {
  onOpenModal: (project: Project) => void;
  onOpenLightbox: (imgSrc: string, altText: string) => void;
}

export function Projects({ onOpenModal, onOpenLightbox }: ProjectsProps) {
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
      id="projects" 
      className="section-py" 
      style={{ background: 'linear-gradient(180deg, var(--color-bg-alt) 0%, var(--color-bg) 100%)' }}
    >
      <div className="container">
        <h2 className="section-title">Projects</h2>
        
        <div className="grid featured-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className="glass-card project-card"
              onMouseMove={handleMouseMove}
            >
              {/* Project Image Box */}
              <div 
                className="project-image-box"
                onClick={() => {
                  if (project.archSrc) {
                    onOpenLightbox(project.archSrc, project.title);
                  } else {
                    onOpenLightbox('/portifolio.png', project.title);
                  }
                }}
              >
                <Image
                  src={project.archSrc || '/portifolio.png'}
                  alt={`${project.title} Preview`}
                  width={500}
                  height={300}
                  className="project-card-img"
                  unoptimized
                />
              </div>

              {/* Meta details */}
              <div className="project-meta">
                {project.dashboard ? (
                  <a
                    href={project.dashboard}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="badge badge-avail clickable-badge"
                    title="Click to view live dashboard"
                  >
                    <span className="pulse-dot-green"></span> Live Dashboard
                  </a>
                ) : (
                  <span className="badge badge-avail">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse mr-1 inline-block"></span> 
                    {project.status}
                  </span>
                )}
                <span className="project-date">{project.date}</span>
              </div>

              {/* Title */}
              <h3 
                className="project-title font-space-grotesk" 
                onClick={() => onOpenModal(project)}
                title="Click to view details"
              >
                {project.title}
              </h3>
              <div className="project-title-line"></div>

              {/* Description */}
              <p className="project-desc">
                {project.description}
              </p>

              {/* Spec Cards */}
              <div className="proj-specs-grid">
                <div className="proj-spec-card">
                  <div className="proj-spec-val" title={project.specCard.val1}>{project.specCard.val1}</div>
                  <div className="proj-spec-lbl">{project.specCard.lbl1}</div>
                </div>
                <div className="proj-spec-card">
                  <div className="proj-spec-val" title={project.specCard.val2}>{project.specCard.val2}</div>
                  <div className="proj-spec-lbl">{project.specCard.lbl2}</div>
                </div>
                <div className="proj-spec-card">
                  <div className="proj-spec-val" title={project.specCard.val3}>{project.specCard.val3}</div>
                  <div className="proj-spec-lbl">{project.specCard.lbl3}</div>
                </div>
              </div>

              {/* Tech Pills */}
              <div className="project-tech">
                {project.tech.map((t) => (
                  <span key={t} className="badge">
                    {t}
                  </span>
                ))}
              </div>

              {/* Card Footer actions */}
              <div className="project-footer mt-auto">
                <button 
                  className="btn btn-primary" 
                  onClick={() => onOpenModal(project)}
                  aria-label={`View ${project.title} Details`}
                >
                  View Details →
                </button>
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary" 
                  aria-label={`View ${project.title} GitHub`}
                >
                  <Github className="w-[18px] h-[18px]" /> GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Projects;
