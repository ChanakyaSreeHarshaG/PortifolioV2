'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Github, Linkedin } from '../ui/Icons';
import { personalInfo } from '@/data/portfolio';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement | HTMLFormElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setStatusMessage('');

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";

    if (accessKey === "YOUR_ACCESS_KEY_HERE") {
      setStatus('error');
      setStatusMessage('Web3Forms Access Key is not configured. Please add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to your environment variables.');
      return;
    }

    try {
      const data = new FormData();
      data.append("access_key", accessKey);
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("message", formData.message);
      data.append("subject", `New Portfolio Contact from ${formData.name}`);
      data.append("from_name", "Portfolio Contact Form");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });

      const resData = await response.json();

      if (resData.success) {
        setStatus('success');
        setStatusMessage('Your message has been sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setStatusMessage(resData.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      setStatusMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <section id="contact" className="section-py">
      <div className="container contact-container">
        <h2 
          className="section-title" 
          style={{ display: 'block', textAlign: 'center', width: 'fit-content', marginLeft: 'auto', marginRight: 'auto' }}
        >
          Get In Touch
        </h2>
        
        <div className="grid contact-grid">
          {/* Email */}
          <a 
            href={`mailto:${personalInfo.email}`} 
            className="glass-card contact-card"
            onMouseMove={handleMouseMove}
          >
            <div className="contact-icon-box">
              <Mail className="w-5 h-5" />
            </div>
            <span className="contact-card-title">Email Me</span>
            <span className="contact-card-val">{personalInfo.email}</span>
          </a>

          {/* Phone */}
          <a 
            href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} 
            className="glass-card contact-card"
            onMouseMove={handleMouseMove}
          >
            <div className="contact-icon-box">
              <Phone className="w-5 h-5" />
            </div>
            <span className="contact-card-title">Call Me</span>
            <span className="contact-card-val">{personalInfo.phone}</span>
          </a>

          {/* Location */}
          <div 
            className="glass-card contact-card"
            onMouseMove={handleMouseMove}
          >
            <div className="contact-icon-box">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="contact-card-title">Location</span>
            <span className="contact-card-val">{personalInfo.location}</span>
          </div>
        </div>

        {/* Contact Form */}
        <div 
          className="glass-card contact-form-card"
          onMouseMove={handleMouseMove}
          style={{ marginBottom: '3rem' }}
        >
          <h3 className="contact-form-title">Send Me a Message</h3>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="johndoe@example.com"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="Hi Chanakya, I'd like to discuss a project..."
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
              />
            </div>

            {status !== 'idle' && (
              <div className={`form-status ${status === 'success' ? 'success' : 'error'}`}>
                {statusMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        <div className="contact-socials-box">
          <a 
            href={personalInfo.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-social github" 
            aria-label="Visit GitHub Profile"
          >
            <Github className="w-5 h-5" /> GitHub
          </a>
          <a 
            href={personalInfo.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-social linkedin" 
            aria-label="Visit LinkedIn Profile"
          >
            <Linkedin className="w-5 h-5" /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
export default Contact;
