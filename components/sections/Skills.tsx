'use client';

import React from 'react';
import { Code2, Library, BarChart3, Layers, Cloud, Brain, Binary } from 'lucide-react';
import { skillCategories } from '@/data/portfolio';

const iconMap = {
  'code-2': Code2,
  'library': Library,
  'bar-chart-3': BarChart3,
  'layers': Layers,
  'cloud': Cloud,
  'brain': Brain,
  'binary': Binary,
};

export function Skills() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="skills" className="section-py">
      <div className="container">
        <h2 className="section-title">Skills & Toolkit</h2>
        
        <div className="grid skills-grid">
          {skillCategories.map((cat, idx) => {
            const Icon = iconMap[cat.iconName];
            return (
              <div
                key={idx}
                className="glass-card skill-category-card"
                onMouseMove={handleMouseMove}
              >
                <div className="skill-category-header">
                  {Icon && <Icon className="w-6 h-6" />}
                  <h3 className="skill-category-title">{cat.title}</h3>
                </div>
                <div className="skills-pills">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="skill-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default Skills;
