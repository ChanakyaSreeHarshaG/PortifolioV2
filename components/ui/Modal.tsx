'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, Calendar, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { Github } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/data/portfolio';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export function Modal({ isOpen, onClose, project }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay open"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="modal-content glass-card"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          >
            <button
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X className="w-[18px] h-[18px]" />
            </button>
            
            <div className="modal-body">
              <div className="modal-header">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="modal-date">
                    <Calendar className="w-4 h-4 inline mr-1 -mt-0.5" /> {project.date}
                  </span>
                  <span className="topic-badge">{project.topic}</span>
                </div>
                <h3 className="modal-title h2">{project.title}</h3>
              </div>
              
              <div 
                className="modal-description text-slate-400"
                dangerouslySetInnerHTML={{ __html: project.longDescription }}
              />

              {project.archSrc && (
                <div className="modal-arch-container">
                  <h4 className="modal-arch-title">{project.diagramTitle || 'Architecture Diagram'}</h4>
                  <div className="arch-placeholder-box">
                    <Image 
                      src={project.archSrc} 
                      alt={`${project.diagramTitle || 'Architecture Diagram'} for ${project.title}`} 
                      width={800}
                      height={450}
                      className="arch-img"
                      unoptimized
                    />
                  </div>
                </div>
              )}

              <div>
                <h4 className="modal-arch-title" style={{ marginBottom: '0.75rem' }}>Technology Stack</h4>
                <div className="modal-tech-stack">
                  {project.tech.map((t) => (
                    <span 
                      key={t} 
                      className="badge" 
                      style={{ borderColor: 'var(--color-teal)', color: 'var(--color-teal)' }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex gap-4 flex-wrap items-center">
                {project.dashboard && (
                  <a 
                    href={project.dashboard} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary" 
                    style={{ backgroundColor: '#22c55e', borderColor: '#22c55e', color: '#0A0A0A', fontWeight: 600 }}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" /> View Live Dashboard →
                  </a>
                )}
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary"
                >
                  <Github className="w-[18px] h-[18px] mr-1" /> View on GitHub →
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
export default Modal;
