import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './Contact.module.css';
import { useLanguage } from '../../context/LanguageContext';

type ContactData = {
  title: string;
  subtitle: string;
  form: {
    name: string;
    email: string;
    message: string;
    submit: string;
  };
  info: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
};

type ContactProps = {
  data: ContactData;
  isDark?: boolean;
};

const Contact: React.FC<ContactProps> = ({ data }) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ name: string; email: string; message: string }>({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Precomputed background artifacts so they don't change with mouse movement
  const envelopes = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      key: i,
      leftPct: 10 + i * 12,
      delay: i * 1.5,
      duration: 15 + Math.random() * 10,
    }));
  }, []);

  const bubbles = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      key: i,
      leftPct: Math.random() * 100,
      topPct: Math.random() * 100,
      delay: i * 0.8,
      duration: 8 + Math.random() * 6,
    }));
  }, []);

  const lines = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      key: i,
      x1: Math.random() * 100,
      y1: Math.random() * 100,
      x2: Math.random() * 100,
      y2: Math.random() * 100,
      delay: i * 1,
    }));
  }, []);

  const rings = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      key: i,
      size: 100 + i * 80,
      delay: i * 0.2,
    }));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const el = sectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');

    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }, 2000);
  };

  return (
    <section id="contact" className={styles.contact} ref={sectionRef}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={`${styles.header} ${isVisible ? styles.fadeIn : ''}`}>
          <span className={styles.sectionNumber}>05.</span>
          <h2 className={styles.sectionTitle}>{t('contact.title')}</h2>
          <div className={styles.divider}></div>
        </div>

        <p className={`${styles.subtitle} ${isVisible ? styles.fadeIn : ''}`}>
          {t('contact.subtitle')}
        </p>

        <div className={styles.contactWrapper}>
          {/* Contact Form */}
          <div className={`${styles.formSection} ${isVisible ? styles.slideInLeft : ''}`}>
            <div className={styles.formCard}>
              <form onSubmit={handleSubmit} className={styles.form}>
                {/* Name Input */}
                <div className={styles.inputGroup}>
                  <label htmlFor="name" className={styles.label}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    {t('contact.form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder={t('contact.form.placeholders.name')}
                    required
                  />
                </div>

                {/* Email Input */}
                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.label}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    {t('contact.form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder={t('contact.form.placeholders.email')}
                    required
                  />
                </div>

                {/* Message Input */}
                <div className={styles.inputGroup}>
                  <label htmlFor="message" className={styles.label}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={styles.textarea}
                    placeholder={t('contact.form.placeholders.message')}
                    rows={6}
                    required
                  />
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  className={styles.submitBtn}
                  disabled={formStatus === 'sending'}
                >
                  {formStatus === 'sending' ? (
                    <>
                      <div className={styles.spinner}></div>
                      {t('contact.form.sending')}
                    </>
                  ) : formStatus === 'success' ? (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {t('contact.form.sent')}
                    </>
                  ) : (
                    <>
                      {t('contact.form.send')}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                    </>
                  )}
                </button>

                {/* Success Message */}
                {formStatus === 'success' && (
                  <div className={styles.successMessage}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    {t('contact.form.success')}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className={`${styles.infoSection} ${isVisible ? styles.slideInRight : ''}`}>
            {/* Info Cards */}
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className={styles.infoContent}>
                <h4>{t('contact.info.email')}</h4>
                <a href={`mailto:${data.info.email}`}>{data.info.email}</a>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div className={styles.infoContent}>
                <h4>{t('contact.info.phone')}</h4>
                <a href={`tel:${data.info.phone}`}>{data.info.phone}</a>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className={styles.infoContent}>
                <h4>{t('contact.info.location')}</h4>
                <p>{data.info.location}</p>
              </div>
            </div>

            {/* Social Links */}
            <div className={styles.socialLinks}>
              <h4>{t('contact.social')}</h4>
              <div className={styles.socialIcons}>
                <a href={data.info.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href={data.info.github} target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Animated Background */}
      <div className={styles.animatedBg}>
        {/* Floating Envelopes */}
        <div className={styles.floatingEnvelopes}>
          {envelopes.map((e) => (
            <div
              key={e.key}
              className={styles.envelope}
              style={{
                left: `${e.leftPct}%`,
                animationDelay: `${e.delay}s`,
                animationDuration: `${e.duration}s`
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
          ))}
        </div>

        {/* Message Bubbles */}
        <div className={styles.messageBubbles}>
          {bubbles.map((b) => (
            <div
              key={b.key}
              className={styles.bubble}
              style={{
                left: `${b.leftPct}%`,
                top: `${b.topPct}%`,
                animationDelay: `${b.delay}s`,
                animationDuration: `${b.duration}s`
              }}
            ></div>
          ))}
        </div>

        {/* Connection Lines */}
        <svg className={styles.connectionLines} width="100%" height="100%">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.2"/>
              <stop offset="50%" stopColor="var(--accent-primary)" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0.2"/>
            </linearGradient>
          </defs>
          {lines.map((ln) => (
            <line
              key={ln.key}
              className={styles.line}
              x1={`${ln.x1}%`}
              y1={`${ln.y1}%`}
              x2={`${ln.x2}%`}
              y2={`${ln.y2}%`}
              stroke="url(#lineGradient)"
              strokeWidth="2"
              style={{ animationDelay: `${ln.delay}s` }}
            />
          ))}
        </svg>

        {/* Cursor Trail */}
        <div 
          className={styles.cursorTrail}
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`
          }}
        ></div>

        {/* Glowing Orbs */}
        <div className={styles.glowingOrbs}>
          <div className={styles.orb} style={{ top: '15%', left: '10%', animationDelay: '0s' }}></div>
          <div className={styles.orb} style={{ bottom: '20%', right: '15%', animationDelay: '3s' }}></div>
          <div className={styles.orb} style={{ top: '70%', left: '70%', animationDelay: '6s' }}></div>
        </div>

        {/* Radial Grid */}
        <div className={styles.radialGrid}>
          {rings.map((r) => (
            <div
              key={r.key}
              className={styles.gridCircle}
              style={{
                width: `${r.size}px`,
                height: `${r.size}px`,
                animationDelay: `${r.delay}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;