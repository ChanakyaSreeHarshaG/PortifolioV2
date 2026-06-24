'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FileText } from 'lucide-react';
import { Github, Linkedin } from '../ui/Icons';
import { ParticleCanvas } from '../ui/ParticleCanvas';
import { personalInfo } from '@/data/portfolio';

export function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const roles = personalInfo.roles;
    const currentRole = roles[roleIdx];
    let timer: NodeJS.Timeout;

    const tick = () => {
      if (isDeleting) {
        setDisplayText(currentRole.substring(0, charIdx - 1));
        setCharIdx((prev) => prev - 1);
      } else {
        setDisplayText(currentRole.substring(0, charIdx + 1));
        setCharIdx((prev) => prev + 1);
      }
    };

    if (!isDeleting && charIdx === currentRole.length) {
      timer = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && charIdx === 0) {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setRoleIdx((prev) => (prev + 1) % roles.length);
      }, 400);
    } else {
      timer = setTimeout(tick, isDeleting ? 30 : 70);
    }

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, roleIdx]);

  return (
    <section id="hero" className="hero-section">
      <ParticleCanvas />
      
      <div className="container hero-grid">
        <div className="hero-left">
          <div className="avatar-wrapper">
            <Image
              src="https://github.com/ChanakyaSreeHarshaG.png"
              alt={personalInfo.name}
              width={200}
              height={200}
              className="avatar-img"
              id="hero-avatar"
              unoptimized
            />
          </div>
        </div>
        
        <div className="hero-right">
          <div className="hero-status-container">
            <span className="hero-status-line"></span>
            <span className="hero-status-text">Available for work · 2026</span>
            <span className="pulse-dot-green-standalone"></span>
          </div>

          <h1 className="hero-h1">{personalInfo.name}</h1>
          
          <div className="typewriter-box">
            <span className="typewriter-cursor" id="typewriter">
              {displayText}
            </span>
          </div>
          
          <p className="hero-bio">
            {personalInfo.bio}
          </p>
          
          <div className="hero-ctas">
            <a
              href={personalInfo.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              aria-label="View Resume"
            >
              <FileText className="w-[18px] h-[18px]" /> View Resume
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              aria-label="GitHub Profile"
            >
              <Github className="w-[18px] h-[18px]" /> GitHub →
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-[18px] h-[18px]" /> LinkedIn →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Hero;
