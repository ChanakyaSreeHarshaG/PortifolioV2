'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "Hi! I am Chanakya's AI Assistant. Ask me anything about his skills, projects, work experience, certifications, or education!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages list
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Mouse coordinate tracker for glassmorphic card hover glow
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!chatWindowRef.current) return;
    const card = chatWindowRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Append the message to history and post to our local API route
      const history = [...messages, { role: 'user', text: userMessage }];
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: history }),
      });

      let data;
      try {
        data = await response.json();
      } catch (parseErr) {
        if (!response.ok) {
          throw new Error('API server returned an error.');
        }
        throw parseErr;
      }
      
      if (response.ok && data.success) {
        setMessages((prev) => [...prev, { role: 'model', text: data.text }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'model', text: data.message || 'Sorry, I ran into an error processing that.' },
        ]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: 'Network error. Please make sure the server is active and try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Bubble */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="chat-bubble-btn"
        aria-label="Open AI Assistant"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center relative"
            >
              <MessageSquare className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-400"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            onMouseMove={handleMouseMove}
            className="glass-card chat-window"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          >
            {/* Header */}
            <div className="chat-header">
              <div className="flex items-center gap-2">
                <div className="chat-avatar">
                  <Sparkles className="w-4 h-4 text-teal" />
                </div>
                <div>
                  <h4 className="chat-title">Chanakya's AI</h4>
                  <div className="chat-status">
                    <span className="pulse-dot-green"></span>
                    <span>Assistant · Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="chat-close-btn"
                aria-label="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message History Body */}
            <div className="chat-body">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-message-row ${msg.role === 'user' ? 'user-row' : 'bot-row'}`}
                >
                  <div className={`chat-bubble ${msg.role === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {/* Bouncing Loader Indicator */}
              {isLoading && (
                <div className="chat-message-row bot-row">
                  <div className="chat-bubble bot-bubble flex items-center gap-1.5 py-3 px-4">
                    <span className="chat-dot animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="chat-dot animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="chat-dot animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer Bar */}
            <form onSubmit={handleSend} className="chat-footer">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me about Chanakya..."
                className="form-input chat-input"
                maxLength={200}
                required
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="chat-send-btn"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
export default ChatBot;
