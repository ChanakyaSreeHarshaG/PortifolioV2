'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

export function Footer() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        <p className="footer-text">
          <span>Built with passion for data.</span>
          <span>© 2026 {personalInfo.name}</span>
        </p>
        <button
          onClick={scrollToTop}
          className="back-to-top-btn"
          id="back-to-top"
          aria-label="Back to top"
          style={{
            opacity: visible ? 1 : 0,
            pointerEvents: visible ? 'auto' : 'none',
          }}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </footer>
  );
}
export default Footer;
