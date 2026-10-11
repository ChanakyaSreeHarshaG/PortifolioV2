'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Layers, BarChart3, Brain, LayoutGrid } from 'lucide-react';
import { Github } from '../ui/Icons';
import { projects, Project, ProjectTopic } from '@/data/portfolio';

interface ProjectsProps {
  onOpenModal: (project: Project) => void;
  onOpenLightbox: (imgSrc: string, altText: string) => void;
}

const TOPICS: { id: string; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'All', label: 'All Projects', icon: LayoutGrid },
  { id: 'Data Engineering', label: 'Data Engineering', icon: Layers },
  { id: 'Business Intelligence', label: 'Business Intelligence', icon: BarChart3 },
  { id: 'Analytics & Machine Learning', label: 'Analytics & ML', icon: Brain },
];

const TOPIC_DESCRIPTIONS: Record<ProjectTopic, string> = {
  'Data Engineering': 'Scalable ETL pipelines, Medallion Architecture (Bronze → Silver → Gold), Databricks, and dimensional star schemas.',
  'Business Intelligence': 'Interactive Power BI reporting solutions, star-schema modeling, complex DAX measures, and KPI analytics.',
  'Analytics & Machine Learning': 'NLP classification pipelines, exploratory data analysis, sequence modeling, and deep learning architectures.',
};

export function Projects({ onOpenModal, onOpenLightbox }: ProjectsProps) {
  const [activeTopic, setActiveTopic] = useState<string>('All');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const getTopicCount = (topicId: string) => {
    if (topicId === 'All') return projects.length;
    return projects.filter((p) => p.topic === topicId).length;
  };

  // Topics to display based on active filter
  const displayedTopicGroups: ProjectTopic[] = 
    activeTopic === 'All' 
      ? ['Data Engineering', 'Business Intelligence', 'Analytics & Machine Learning']
      : [activeTopic as ProjectTopic];

  const renderProjectCard = (project: Project) => (
    <div
      key={project.id}
      className="glass-card project-card"
      onMouseMove={handleMouseMove}
    >
      {/* Project Image Box (Render only if image exists) */}
      {project.archSrc && (
        <div 
          className="project-image-box"
          onClick={() => onOpenLightbox(project.archSrc!, project.title)}
          title="Click to zoom image"
        >
          <Image
            src={project.archSrc}
            alt={`${project.title} Preview`}
            width={500}
            height={300}
            className="project-card-img"
            unoptimized
          />
        </div>
      )}

      {/* Meta details */}
      <div className="project-meta">
        <span className="topic-badge">{project.topic}</span>
        <span className="project-date">{project.date}</span>
      </div>

      {/* Status indicator row */}
      <div className="project-status-row mb-3 flex items-center justify-between">
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
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mr-1.5 inline-block"></span> 
            {project.status}
          </span>
        )}
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
        <div className="flex gap-2">
          {project.dashboard && (
            <a
              href={project.dashboard}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary p-2"
              title="Open Live Dashboard"
              aria-label={`View ${project.title} Dashboard`}
            >
              <ExternalLink className="w-4 h-4 text-emerald-400" />
            </a>
          )}
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
    </div>
  );

  return (
    <section 
      id="projects" 
      className="section-py" 
      style={{ background: 'linear-gradient(180deg, var(--color-bg-alt) 0%, var(--color-bg) 100%)' }}
    >
      <div className="container">
        <div className="projects-header-wrapper">
          <h2 className="section-title">Projects</h2>
          <p className="text-slate-400 max-w-2xl text-sm -mt-4 mb-6">
            Production-grade data pipelines, business intelligence dashboards, and predictive analytics solutions organized by technical domain.
          </p>

          {/* Interactive Topic Filter Bar */}
          <div className="topic-filter-bar" role="tablist" aria-label="Project topics filter">
            {TOPICS.map((t) => {
              const Icon = t.icon;
              const isActive = activeTopic === t.id;
              const count = getTopicCount(t.id);
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`topic-tab-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTopic(t.id)}
                >
                  <Icon className="w-4 h-4" />
                  <span>{t.label}</span>
                  <span className="topic-tab-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Topic-Separated Sections */}
        {displayedTopicGroups.map((topicName, idx) => {
          const topicProjects = projects.filter((p) => p.topic === topicName);
          if (topicProjects.length === 0) return null;

          return (
            <div key={topicName} className="topic-group-container">
              {/* Show Topic Divider Header when in 'All' view or single view */}
              <div className="topic-section-header">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="topic-section-tag font-mono">0{idx + 1} //</span>
                    <h3 className="topic-section-title">{topicName}</h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 max-w-xl">
                    {TOPIC_DESCRIPTIONS[topicName]}
                  </p>
                </div>
                <span className="topic-section-count">
                  {topicProjects.length} {topicProjects.length === 1 ? 'Project' : 'Projects'}
                </span>
              </div>

              {/* Projects Grid for this Topic */}
              <div className="grid featured-grid">
                {topicProjects.map(renderProjectCard)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Projects;
