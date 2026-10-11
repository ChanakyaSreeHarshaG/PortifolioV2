'use client';

import React from 'react';
import Image from 'next/image';
import { FileText } from 'lucide-react';
import { Github, Linkedin } from '../ui/Icons';
import { ParticleCanvas } from '../ui/ParticleCanvas';
import { personalInfo } from '@/data/portfolio';

export function Hero() {
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
          <h1 className="hero-h1">{personalInfo.name}</h1>
          
          <div className="typewriter-box">
            <span className="font-space-grotesk text-xl font-semibold text-teal">
              Business Analyst · Data & Analytics
            </span>
          </div>
          
          <p className="hero-bio">
            I’m a Computer Science graduate with experience working on data analysis, SQL, Power BI, and business reporting. I enjoy turning raw data and business requirements into clear insights, reports, and practical solutions.
          </p>
          
          <p className="text-sm text-slate-400 font-mono mt-2 mb-4">
            Currently working as a Business Analyst · Hyderabad, India
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
