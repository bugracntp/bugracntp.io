// ============================================
// PROJECTS COMPONENT
// src/components/Projects/Projects.jsx
// ============================================

import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import ProjectCard from './ProjectCard';
import styles from './Projects.module.css';
import fallbackProjects, { fetchGithubProjects, Project as RawProject } from './projectsData';

type UIProject = {
  name: string;
  description?: string | null;
  github?: string;
  link?: string;
  technologies: string[];
  highlights?: string[];
  featured?: boolean;
  language?: string | null;
  stars?: number;
  forks?: number;
};

type ProjectsProps = {
  data?: { title?: string; items: UIProject[] };
  isDark?: boolean;
};

const Projects: React.FC<ProjectsProps> = ({ data, isDark }) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [items, setItems] = useState<UIProject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(4);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Veri kaynağını belirle: prop ile geliyorsa onu kullan; yoksa GitHub'dan çek
    const resolveData = async () => {
      if (data && Array.isArray(data.items)) {
        setItems(data.items);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const gh = await fetchGithubProjects('bugracntp');
        const normalized: UIProject[] = (gh && gh.length > 0 ? gh : (fallbackProjects as RawProject[])).map((p: RawProject) => ({
          // projectsData.ts'ten gelen alanlar
          name: (p as any).name || p.title || 'Untitled',
          description: p.description || '',
          github: p.link || (p as any).github || undefined,
          link: p.homepage || p.link || undefined,
          technologies: (p as any).technologies || [],
          highlights: (p as any).highlights || [],
          featured: Boolean((p as any).featured),
          language: (p as any).language || null,
          stars: (p as any).stars,
          forks: (p as any).forks,
        }));
        setItems(normalized);
      } catch (e: any) {
        setError(e?.message || 'Veri yüklenirken bir hata oluştu');
        const normalizedFallback: UIProject[] = ((fallbackProjects as RawProject[]) || []).map((p: RawProject) => ({
          name: (p as any).name || p.title || 'Untitled',
          description: p.description || '',
          github: p.link || (p as any).github || undefined,
          link: p.homepage || p.link || undefined,
          technologies: (p as any).technologies || [],
          highlights: (p as any).highlights || [],
          featured: Boolean((p as any).featured),
          language: (p as any).language || null,
          stars: (p as any).stars,
          forks: (p as any).forks,
        }));
        setItems(normalizedFallback);
      } finally {
        setLoading(false);
      }
    };
    resolveData();
  }, [data]);

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


  const filteredProjects = activeFilter === 'all' 
    ? items 
    : items.filter((project: UIProject) => project.featured);
  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const allTechnologies = [...new Set([
    ...(items || []).flatMap((p: UIProject) => p.technologies || []),
    ...(items || []).map((p: UIProject) => p.language).filter(Boolean)
  ])];

  return (
    <section id="projects" className={styles.projects} ref={sectionRef}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={`${styles.header} ${isVisible ? styles.fadeIn : ''}`}>
          <span className={styles.sectionNumber}>04.</span>
          <h2 className={styles.sectionTitle}>{(data && data.title) || t('projects.title')}</h2>
          <div className={styles.divider}></div>
        </div>

        {/* Filter Buttons */}
        <div className={`${styles.filterButtons} ${isVisible ? styles.fadeIn : ''}`}>
          <button
            className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.active : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6"/>
              <line x1="8" y1="12" x2="21" y2="12"/>
              <line x1="8" y1="18" x2="21" y2="18"/>
              <line x1="3" y1="6" x2="3.01" y2="6"/>
              <line x1="3" y1="12" x2="3.01" y2="12"/>
              <line x1="3" y1="18" x2="3.01" y2="18"/>
            </svg>
            {t('projects.viewAll')}
            <span className={styles.count}>{items.length}</span>
          </button>
          <button
            className={`${styles.filterBtn} ${activeFilter === 'featured' ? styles.active : ''}`}
            onClick={() => setActiveFilter('featured')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            {t('projects.featured')}
            <span className={styles.count}>{items.filter((p: any) => p.featured).length}</span>
          </button>
        </div>

        {/* Projects Grid */}
        {loading && <div className={styles.loading}>Yükleniyor...</div>}
        {error && !loading && <div className={styles.error}>Hata: {error}</div>}
        <div className={styles.projectsGrid}>
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Load More / Show Less */}
        {filteredProjects.length > 0 && (
          <div className={styles.loadMoreWrapper}>
            {visibleCount < filteredProjects.length ? (
              <button
                className={styles.loadBtn}
                onClick={() => setVisibleCount((c) => Math.min(c + 4, filteredProjects.length))}
              >
                {t('projects.viewAll')}
              </button>
            ) : filteredProjects.length > 4 ? (
              <button
                className={styles.loadBtn}
                onClick={() => setVisibleCount(4)}
              >
                {t('projects.viewLess')}
              </button>
            ) : null}
          </div>
        )}

        {/* Tech Cloud Section */}
        <div className={`${styles.techCloud} ${isVisible ? styles.fadeIn : ''}`}>
          <h3 className={styles.techCloudTitle}>{t('projects.technologies')}</h3>
          <div className={styles.techCloudItems}>
            {allTechnologies.map((tech, index) => (
              <span 
                key={index} 
                className={styles.techCloudBadge}
                style={{ 
                  animationDelay: `${index * 0.05}s`,
                  fontSize: `${0.875 + Math.random() * 0.5}rem`
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Animated Background */}
      <div className={styles.animatedBg}>
        {/* Floating Code Symbols */}
        <div className={styles.codeSymbols}>
          {['<', '>', '{', '}', '[', ']', '/', '*', '+', '='].map((symbol, i) => (
            <div
              key={i}
              className={styles.codeSymbol}
              style={{
                left: `${10 + (i * 9)}%`,
                top: `${20 + (i % 3) * 30}%`,
                animationDelay: `${i * 0.5}s`,
                fontSize: `${1.5 + Math.random()}rem`
              }}
            >
              {symbol}
            </div>
          ))}
        </div>

        {/* Binary Rain */}
        <div className={styles.binaryRain}>
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className={styles.binaryColumn}
              style={{
                left: `${(i / 15) * 100}%`,
                animationDuration: `${5 + Math.random() * 5}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            >
              {[...Array(20)].map((_, j) => (
                <span key={j}>{Math.random() > 0.5 ? '1' : '0'}</span>
              ))}
            </div>
          ))}
        </div>

        {/* Particle Network */}
        <div className={styles.particleNetwork}>
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className={styles.networkNode}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${10 + Math.random() * 10}s`
              }}
            ></div>
          ))}
        </div>

        {/* Glowing Orbs */}
        <div className={styles.glowingOrbs}>
          <div className={styles.orb} style={{ top: '20%', left: '10%', animationDelay: '0s' }}></div>
          <div className={styles.orb} style={{ bottom: '20%', right: '10%', animationDelay: '2s' }}></div>
          <div className={styles.orb} style={{ top: '60%', left: '80%', animationDelay: '4s' }}></div>
        </div>

        {/* Grid Lines */}
        <div className={styles.gridLines}>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Wave Animation */}
        <div className={styles.waves}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,50 C300,100 600,0 900,50 C1050,75 1200,50 1200,50 L1200,120 L0,120 Z" className={styles.wave1}/>
            <path d="M0,70 C300,20 600,100 900,70 C1050,55 1200,70 1200,70 L1200,120 L0,120 Z" className={styles.wave2}/>
            <path d="M0,90 C300,60 600,110 900,90 C1050,80 1200,90 1200,90 L1200,120 L0,120 Z" className={styles.wave3}/>
          </svg>
        </div>

        {/* Hexagon Pattern */}
        <div className={styles.hexagonPattern}>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={styles.hexagon}
              style={{
                left: `${(i % 5) * 20}%`,
                top: `${Math.floor(i / 5) * 25}%`,
                animationDelay: `${i * 0.3}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;