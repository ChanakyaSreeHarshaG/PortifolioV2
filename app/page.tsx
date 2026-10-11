'use client';

import React, { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Certifications from '@/components/sections/Certifications';
import Education from '@/components/sections/Education';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import Modal from '@/components/ui/Modal';
import Lightbox from '@/components/ui/Lightbox';
import ChatBot from '@/components/ui/ChatBot';
import { Project } from '@/data/portfolio';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState('');
  const [lightboxAlt, setLightboxAlt] = useState('');

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  const handleOpenLightbox = (imgSrc: string, altText: string) => {
    setLightboxImg(imgSrc);
    setLightboxAlt(altText);
    setLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    setLightboxImg('');
    setLightboxAlt('');
  };

  return (
    <>
      <div className="grid-bg-overlay"></div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects onOpenModal={handleOpenModal} onOpenLightbox={handleOpenLightbox} />
        <Certifications />
        <Education />
        <Contact />
      </main>
      <Footer />

      {/* Overlays */}
      <Modal 
        isOpen={modalOpen} 
        onClose={handleCloseModal} 
        project={selectedProject} 
      />
      <Lightbox 
        isOpen={lightboxOpen} 
        onClose={handleCloseLightbox} 
        imgSrc={lightboxImg} 
        altText={lightboxAlt} 
      />
      <ChatBot />
    </>
  );
}

