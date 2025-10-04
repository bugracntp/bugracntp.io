import React, { useEffect, useRef, useState } from 'react';
import styles from './Skills.module.css';
import { useLanguage } from '../../context/LanguageContext';

type Skill = {
  name: string;
  level?: number;
  value?: string;
  icon?: string;
};

type Category = {
  name: string;
  skills: Skill[];
  icon?: string;
};

type SkillsData = {
  title: string;
  categories: Category[];
};

type SkillsProps = {
  data: SkillsData;
  isDark: boolean;
};

const Skills: React.FC<SkillsProps> = ({ data, isDark }) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isTranslationsReady = t('language.tr') !== 'language.tr' && t('language.en') !== 'language.en';

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

  return (
    <section id="skills" className={styles.skills} ref={sectionRef}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={`${styles.header} ${isVisible ? styles.fadeIn : ''}`}>
          <span className={styles.sectionNumber}>02.</span>
          <h2 className={styles.sectionTitle}>{data.title}</h2>
          <div className={styles.divider}></div>
        </div>

        {/* Category Tabs */}
        <div className={`${styles.categoryTabs} ${isVisible ? styles.fadeIn : ''}`}>
          {data.categories.map((category: Category, index: number) => (
            <button
              key={index}
              className={`${styles.categoryTab} ${activeCategory === index ? styles.active : ''}`}
              onClick={() => setActiveCategory(index)}
            >
              <span className={styles.tabIcon}>
                {getCategoryIcon(category)}
              </span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className={styles.skillsContent}>
          {data.categories.map((category: Category, catIndex: number) => (
            <div
              key={catIndex}
              className={`${styles.skillsGrid} ${activeCategory === catIndex ? styles.activeGrid : ''}`}
            >
              {category.skills.map((skill: Skill, skillIndex: number) => {
                const key = (category.icon || category.name || '').toLowerCase();
                const isLanguageCategory = key.includes('language') || key.includes('diller') || key.includes('dil');
                return (
                <div
                  key={skillIndex}
                  className={`${styles.skillCard} ${isVisible ? styles.slideInUp : ''}`}
                  style={{ animationDelay: `${skillIndex * 0.1}s` }}
                >
                  <div className={styles.skillHeader}>
                    <div className={styles.skillInfo}>
                      <h3 className={styles.skillName}>{skill.name}</h3>
                        {!isLanguageCategory && typeof skill.level === 'number' && (
                          <span className={styles.skillLevel}>{skill.level}%</span>
                        )}
                        {isLanguageCategory && skill.value && (
                          <span className={styles.languageValue}>{skill.value}</span>
                        )}
                    </div>
                    <div className={styles.skillIcon}>
                        {skill.icon ? (
                          <img src={skill.icon} alt={skill.name} width={32} height={32} />
                      ) : (
                        getSkillIcon(skill.name)
                      )}
                    </div>
                  </div>

                  {/* Progress Bar (excluded for language category) */}
                  {!isLanguageCategory && typeof skill.level === 'number' && (
                    <div className={styles.progressBarContainer}>
                      <div 
                        className={styles.progressBar}
                        style={{ 
                          width: isVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${skillIndex * 0.1}s`
                        }}
                      >
                        <div className={styles.progressGlow}></div>
                      </div>
                    </div>
                  )}

                  {/* Level Indicator (excluded for language category) */}
                  {!isLanguageCategory && typeof skill.level === 'number' && isTranslationsReady && (
                    <div className={styles.levelIndicator}>
                      {getLevelText(skill.level, t)}
                    </div>
                  )}
                </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        {isTranslationsReady && (
        <div className={`${styles.additionalInfo} ${isVisible ? styles.fadeIn : ''}`}>
          <div className={styles.infoCard}>
            <div className={styles.infoIconWrapper}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
            </div>
            <div className={styles.infoContent}>
              <h4>{t('skills.additionalCards.learning.title')}</h4>
              <p>{t('skills.additionalCards.learning.description')}</p>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIconWrapper}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <div className={styles.infoContent}>
              <h4>{t('skills.additionalCards.teamwork.title')}</h4>
              <p>{t('skills.additionalCards.teamwork.description')}</p>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIconWrapper}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <div className={styles.infoContent}>
              <h4>{t('skills.additionalCards.problemSolving.title')}</h4>
              <p>{t('skills.additionalCards.problemSolving.description')}</p>
            </div>
          </div>
        </div>
        )}
      </div>

      {/* Animated Background */}
      <div className={styles.animatedBg}>
        {/* Grid Pattern */}
        
        {/* Gradient Orb'lar */}
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gradientOrb3}></div>
        <div className={styles.gradientOrb4}></div>
        
        {/* Işık ışınları */}
        <div className={styles.lightBeam1}></div>
        <div className={styles.lightBeam2}></div>
        <div className={styles.lightBeam3}></div>
        
        {/* Parçacık efektleri */}
        <div className={styles.particle1}></div>
        <div className={styles.particle2}></div>
        <div className={styles.particle3}></div>
        <div className={styles.particle4}></div>
        <div className={styles.particle5}></div>
        
        {/* Orijinal floating shape'ler */}
        <div className={styles.floatingShape} style={{ top: '10%', left: '5%', animationDelay: '0s' }}></div>
        <div className={styles.floatingShape} style={{ top: '60%', right: '10%', animationDelay: '2s' }}></div>
        <div className={styles.floatingShape} style={{ bottom: '20%', left: '15%', animationDelay: '4s' }}></div>
      </div>
    </section>
  );
};

// Helper Functions
const getSkillIcon = (skillName: string) => {
  const name = skillName.toLowerCase();
  
  if (name.includes('c#') || name.includes('.net')) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l7.45 3.73L12 11.63 4.55 7.91 12 4.18zM4 9.3l7 3.5v7l-7-3.5v-7zm9 10.5v-7l7-3.5v7l-7 3.5z"/>
      </svg>
    );
  } else if (name.includes('react') || name.includes('vue') || name.includes('javascript')) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    );
  } else if (name.includes('core') || name.includes('framework') || name.includes('entity framework core')) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    );
  } else {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3l1.5 3 3 1.5-3 1.5L12 12l-1.5-3L7.5 7.5 10.5 6z"/>
      <path d="M19 14l.75 1.5L21 16l-1.25.5L19 18l-.75-1.5L17 16l1.25-.5z"/>
      </svg>
    );
  }
};

const getLevelText = (level: number, t: (key: string) => string) => {
  if (level >= 85) return t('skills.level.expert');
  if (level >= 70) return t('skills.level.advanced');
  if (level >= 50) return t('skills.level.intermediate');
  return t('skills.level.beginner');
};

// Category Icon Mapper
const getCategoryIcon = (category: { name: string; icon?: string }) => {
  const key = (category.icon || category.name || '').toLowerCase();

  const strokeIcon = (children: React.ReactNode) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{children}</svg>
  );

  if (key.includes('code') || key.includes('program') || key.includes('programlama') || key.includes('backend')) {
    return strokeIcon(<>
      <path d="M16 18l6-6-6-6"/>
      <path d="M8 6L2 12l6 6"/>
    </>);
  }

  if (key.includes('language') || key.includes('diller') || key.includes('dil')) {
    return strokeIcon(<>
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20"/>
      <path d="M12 2a15.3 15.3 0 010 20"/>
      <path d="M12 2a15.3 15.3 0 000 20"/>
    </>);
  }

  if (key.includes('database') || key.includes('veritaban') || key.includes('db') || key.includes('sql') || key.includes('mongo')) {
    return strokeIcon(<>
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    </>);
  }

  if (key.includes('front') || key.includes('frontend')) {
    return strokeIcon(<>
      <rect x="3" y="4" width="18" height="14" rx="2"/>
      <path d="M3 9h18"/>
    </>);
  }

  if (key.includes('cloud') || key.includes('devops')) {
    return strokeIcon(<>
      <path d="M17.5 19a4.5 4.5 0 00-.5-9 6 6 0 00-11.5 2"/>
      <path d="M12 12l2 2-2 2-2-2 2-2z"/>
    </>);
  }

  if (key.includes('auth') || key.includes('kimlik') || key.includes('güven') || key.includes('security')) {
    return strokeIcon(<>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <circle cx="12" cy="12" r="3"/>
    </>);
  }

  if (key.includes('operating') || key.includes('işletim') || key.includes('system')) {
    return strokeIcon(<>
      <rect x="3" y="4" width="18" height="14" rx="2"/>
      <path d="M8 20h8"/>
      <path d="M12 16v4"/>
    </>);
  }

  if (key.includes('version') || key.includes('kontrol') || key.includes('git')) {
    return strokeIcon(<>
      <circle cx="6" cy="6" r="2"/>
      <circle cx="6" cy="18" r="2"/>
      <circle cx="18" cy="12" r="2"/>
      <path d="M8 7v10M8 7c8 0 8 5 10 5M8 17c8 0 8-5 10-5"/>
    </>);
  }

  if (key.includes('tool') || key.includes('araç')) {
    return strokeIcon(<>
      <path d="M14.7 6.3a4 4 0 105.7 5.7L12 21l-3-3 8.4-8.4z"/>
      <path d="M2 22l4-4"/>
    </>);
  }

  if (key.includes('others') || key.includes('diğer')) {
    return strokeIcon(<>
      <path d="M12 3l1.5 3 3 1.5-3 1.5L12 12l-1.5-3L7.5 7.5 10.5 6z"/>
      <path d="M19 14l.75 1.5L21 16l-1.25.5L19 18l-.75-1.5L17 16l1.25-.5z"/>
    </>);
  }

  return strokeIcon(<>
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </>);
};

export default Skills;