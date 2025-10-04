import React, { useEffect, useRef, useState } from 'react';
import styles from './Experience.module.css';

interface Job {
  company: string;
  position: string;
  location: string;
  period: string;
  type: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

interface ExperienceData {
  title: string;
  jobs: Job[];
  stats?: Array<{
    label: string;
    value: string;
    icon: string;
  }>;
}

interface ExperienceProps {
  data: ExperienceData;
  isDark: boolean;
}

const Experience: React.FC<ExperienceProps> = ({ data, isDark }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeJob, setActiveJob] = useState(0);
  const [hoveredJob, setHoveredJob] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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

  // Scroll-based timeline progress
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timeline = timelineRef.current;
      const timelineRect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Timeline'in görünür alanındaki yüzdesini hesapla
      const timelineTop = timelineRect.top;
      const timelineHeight = timelineRect.height;
      const visibleHeight = Math.min(windowHeight - timelineTop, timelineHeight);
      const scrollProgress = Math.max(0, Math.min(1, visibleHeight / timelineHeight));
      
      // Job sayısına göre aktif job'ı hesapla
      const newActiveJob = Math.floor(scrollProgress * data.jobs.length);
      setActiveJob(Math.min(newActiveJob, data.jobs.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // İlk yüklemede çalıştır

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [data.jobs.length]);

  return (
    <section id="experience" className={styles.experience} ref={sectionRef}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={`${styles.header} ${isVisible ? styles.fadeIn : ''}`}>
          <span className={styles.sectionNumber}>03.</span>
          <h2 className={styles.sectionTitle}>{data.title}</h2>
          <div className={styles.divider}></div>
        </div>

        {/* Timeline */}
        <div className={styles.timeline} ref={timelineRef}>
          {/* Timeline Line */}
          <div className={styles.timelineLine}>
            <div 
              className={styles.timelineProgress}
              style={{ 
                height: isVisible ? `${(activeJob + 1) * (100 / data.jobs.length)}%` : '0%'
              }}
            ></div>
          </div>

          {/* Timeline Items */}
          <div className={styles.timelineItems}>
            {data.jobs.map((job, index) => (
              <div
                key={index}
                className={`${styles.timelineItem} ${isVisible ? styles.slideIn : ''} ${
                  activeJob === index ? styles.active : ''
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
                onMouseEnter={() => {
                  setHoveredJob(index);
                }}
                onMouseLeave={() => setHoveredJob(null)}
              >
                {/* Timeline Dot */}
                <div className={styles.timelineDot}>
                  <div className={styles.dotInner}>
                    <div className={styles.dotPulse}></div>
                  </div>
                  <div className={styles.dotRing}></div>
                </div>

                {/* Job Card */}
                <div className={styles.jobCard}>
                  {/* Card Header */}
                  <div className={styles.cardHeader}>
                    <div className={styles.companyInfo}>
                      <div className={styles.companyLogo}>
                        {job.company.substring(0, 2).toUpperCase()}
                      </div>
                      <div className={styles.companyDetails}>
                        <h3 className={styles.companyName}>{job.company}</h3>
                        <div className={styles.jobMeta}>
                          <span className={styles.location}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                              <circle cx="12" cy="10" r="3"/>
                            </svg>
                            {job.location}
                          </span>
                          <span className={styles.jobType}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                            </svg>
                            {job.type}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.period}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      {job.period}
                    </div>
                  </div>

                  {/* Position */}
                  <div className={styles.position}>
                    <h4>{job.position}</h4>
                  </div>

                  {/* Description */}
                  <p className={styles.description}>{job.description}</p>

                  {/* Achievements */}
                  <div className={styles.achievements}>
                    <h5 className={styles.achievementsTitle}>Önemli Başarılar:</h5>
                    <ul className={styles.achievementsList}>
                      {job.achievements.map((achievement, achIndex) => (
                        <li 
                          key={achIndex} 
                          className={styles.achievementItem}
                          style={{ animationDelay: `${achIndex * 0.1}s` }}
                        >
                          <span className={styles.achievementIcon}>▹</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className={styles.technologies}>
                    {job.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className={styles.techBadge}
                        style={{ animationDelay: `${techIndex * 0.05}s` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Hover Effect Overlay */}
                  {hoveredJob === index && (
                    <div className={styles.cardOverlay}>
                      <div className={styles.overlayParticle} style={{ '--x': '20%', '--y': '30%' } as React.CSSProperties}></div>
                      <div className={styles.overlayParticle} style={{ '--x': '80%', '--y': '40%' } as React.CSSProperties}></div>
                      <div className={styles.overlayParticle} style={{ '--x': '50%', '--y': '70%' } as React.CSSProperties}></div>
                    </div>
                  )}
                </div>

                {/* Connection Line to Next Item */}
                {index < data.jobs.length - 1 && (
                  <div className={styles.connectionLine}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className={`${styles.statsSection} ${isVisible ? styles.fadeIn : ''}`}>
          {data.stats?.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statIcon}>
                {stat.icon === 'award' && (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                )}
                {stat.icon === 'users' && (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                )}
                {stat.icon === 'zap' && (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                )}
                {stat.icon === 'code' && (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16 18 22 12 16 6"/>
                    <polyline points="8 6 2 12 8 18"/>
                  </svg>
                )}
                {stat.icon === 'trending-up' && (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                    <polyline points="17 6 23 6 23 12"/>
                  </svg>
                )}
                {stat.icon === 'clock' && (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                )}
                {stat.icon === 'building' && (
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 21h18"/>
                    <path d="M5 21V7l8-4v18"/>
                    <path d="M19 21V11l-6-4"/>
                    <path d="M9 9h.01"/>
                    <path d="M9 12h.01"/>
                    <path d="M9 15h.01"/>
                    <path d="M9 18h.01"/>
                    <path d="M15 9h.01"/>
                    <path d="M15 12h.01"/>
                    <path d="M15 15h.01"/>
                    <path d="M15 18h.01"/>
                  </svg>
                )}
              </div>
              <div className={styles.statContent}>
                <h4>{stat.value}</h4>
                <p>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animated Background */}
      <div className={styles.animatedBg}>
        <div className={styles.gridPattern}></div>
        <div className={styles.floatingCircle} style={{ top: '10%', left: '5%' }}></div>
        <div className={styles.floatingCircle} style={{ top: '60%', right: '8%' }}></div>
        <div className={styles.floatingCircle} style={{ bottom: '15%', left: '10%' }}></div>
        
        {/* About'dan gelen gradient orb'lar */}
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gradientOrb3}></div>
        <div className={styles.gradientOrb4}></div>
        <div className={styles.gradientOrb5}></div>

        
      </div>
    </section>
  );
};

export default Experience;