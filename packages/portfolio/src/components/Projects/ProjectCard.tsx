import React, { useState } from 'react';
import styles from './Projects.module.css';

type ProjectCardProps = {
  project: {
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
  index: number;
  isVisible: boolean;
};

const getLanguageColor = (language?: string | null): string => {
  if (!language) return 'var(--accent-primary)';
  const key = language.toLowerCase();
  switch (key) {
    case 'javascript':
      return '#f7df1e';
    case 'typescript':
      return '#3178c6';
    case 'swift':
      return '#f05138';
    case 'python':
      return '#3776ab';
    case 'java':
      return '#b07219';
    case 'c#':
    case 'csharp':
      return '#178600';
    case 'go':
    case 'golang':
      return '#00ADD8';
    case 'kotlin':
      return '#A97BFF';
    case 'dart':
      return '#0175C2';
    case 'ruby':
      return '#cc342d';
    case 'php':
      return '#4F5D95';
    case 'rust':
      return '#DEA584';
    case 'html':
      return '#e34f26';
    case 'css':
      return '#563d7c';
    case 'shell':
    case 'bash':
      return '#89e051';
    default:
      return 'var(--accent-primary)';
  }
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`${styles.projectCard} ${isVisible ? styles.slideInUp : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className={styles.featuredBadge}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          Featured
        </div>
      )}

      {/* Project Header */}
      <div className={styles.projectHeader}>
        <div className={styles.projectIcon}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"/>
            <line x1="2" y1="20" x2="2.01" y2="20"/>
          </svg>
        </div>
        <div className={styles.projectLinks}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Project Name */}
      <h3 className={styles.projectName}>{project.name}</h3>

      {/* Meta Info */}
      <div className={styles.meta}>
        {project.language && (
          <span className={styles.metaItem}>
            <span className={styles.langDot} style={{ background: getLanguageColor(project.language) }}></span>
            {project.language}
          </span>
        )}
        {typeof project.stars === 'number' && (
          <span className={styles.metaItem} title="Stars">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            {project.stars}
          </span>
        )}
        {typeof project.forks === 'number' && (
          <span className={styles.metaItem} title="Forks">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 3v2a4 4 0 0 0 4 4h2a4 4 0 0 1 4 4v2"/>
              <circle cx="7" cy="3" r="2"/>
              <circle cx="17" cy="21" r="2"/>
            </svg>
            {project.forks}
          </span>
        )}
      </div>

      {/* Project Description */}
      <p className={styles.projectDescription}>{project.description}</p>

      {/* Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <div className={styles.highlights}>
          {project.highlights.map((highlight: string, hIndex: number) => (
            <div key={hIndex} className={styles.highlightItem}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {highlight}
            </div>
          ))}
        </div>
      )}

      {/* Technologies */}
      <div className={styles.technologies}>
        {project.technologies.map((tech: string, techIndex: number) => (
          <span key={techIndex} className={styles.techBadge}>
            {tech}
          </span>
        ))}
      </div>

      {/* Hover Glow */}
      {isHovered && (
        <div className={styles.cardGlow}></div>
      )}
    </div>
  );
};

export default ProjectCard;