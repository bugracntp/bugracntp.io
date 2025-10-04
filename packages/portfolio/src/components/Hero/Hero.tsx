import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from './Hero.module.css';

type HeroStat = {
  label: string;
  value: string;
  icon: string;
};

type HeroData = {
  greeting: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  ctaSecondary: string;
  titles?: string[];
  stats: HeroStat[];
  techStack: string[];
  profileImage?: string;
};

type HeroProps = {
  data: HeroData;
  language: 'tr' | 'en' | string;
};

const Hero: React.FC<HeroProps> = ({ data }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [currentTitleIndex, setCurrentTitleIndex] = useState<number>(0);
  const [displayedTitle, setDisplayedTitle] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  // Mouse takip
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Daktilo efekti
  useEffect(() => {
    const titles = data.titles ?? [];
    if (titles.length === 0) return;

    const currentTitle = titles[currentTitleIndex % titles.length];
    const typingSpeed = isDeleting ? 50 : 150;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedTitle.length < currentTitle.length) {
          setDisplayedTitle(currentTitle.substring(0, displayedTitle.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedTitle.length > 0) {
          setDisplayedTitle(currentTitle.substring(0, displayedTitle.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedTitle, isDeleting, currentTitleIndex, data.titles]);

  // GitHub avatarını çek
  useEffect(() => {
    let isCancelled = false;
    const fetchAvatar = async () => {
      try {
        const response = await fetch('https://api.github.com/users/bugracntp');
        if (!response.ok) return;
        const json = await response.json();
        if (!isCancelled && json?.avatar_url) {
          setAvatarUrl(String(json.avatar_url));
        }
      } catch (_err) {
        // sessizce geç
      }
    };
    fetchAvatar();
    return () => { isCancelled = true; };
  }, []);

  useEffect(() => {
    setIsVisible(true);

    // Canvas Particle Animation - Enhanced
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const canvas = canvasEl as HTMLCanvasElement;
    const ctxMaybe = canvas.getContext('2d');
    if (!ctxMaybe) return;
    const context = ctxMaybe as CanvasRenderingContext2D;
    let animationFrameId: number;
    
    class Particle {
      x: number = 0;
      y: number = 0;
      size: number = 1;
      speedX: number = 0;
      speedY: number = 0;
      opacity: number = 1;
      constructor() { this.reset(); }
      reset(): void {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.6 + 0.2;
      }
      update(): void {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.reset();
        }
      }
      draw(): void {
        context.fillStyle = isDark 
          ? `rgba(239, 68, 68, ${this.opacity})`
          : `rgba(59, 130, 246, ${this.opacity})`;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
      }
    }
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create more particles for richer effect
    for (let i = 0; i < 80; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle: Particle) => {
        particle.update();
        particle.draw();
      });

      // Draw connections with enhanced distance
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            context.strokeStyle = isDark
              ? `rgba(239, 68, 68, ${0.15 * (1 - distance / 120)})`
              : `rgba(59, 130, 246, ${0.15 * (1 - distance / 120)})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(particles[i].x, particles[i].y);
            context.lineTo(particles[j].x, particles[j].y);
            context.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className={styles.hero}>
      <canvas ref={canvasRef} className={styles.canvas} />
      
      <div className={styles.gradientBg}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gradientOrb3}></div>
        {/* Mouse takipli ışık */}
        <div 
          className={styles.mouseLight}
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
          }}
        ></div>
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={`${styles.textContent} ${isVisible ? styles.fadeIn : ''}`}>

            <h1 className={styles.name}>
              <span className={styles.nameGradient}>{data.name}</span>
              <span className={styles.nameUnderline}></span>
            </h1>

            <h2 className={styles.title}>
              {displayedTitle}
              <span className={styles.cursor}>|</span>
            </h2>
            <h3 className={styles.subtitle}>{data.subtitle}</h3>

            <p className={styles.description}>{data.description}</p>

            <div className={styles.buttons}>
              <button 
                className={styles.primaryBtn}
                onClick={() => scrollToSection('projects')}
              >
                <span>{data.cta}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <button 
                className={styles.secondaryBtn}
                onClick={() => scrollToSection('contact')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span>{data.ctaSecondary}</span>
              </button>
            </div>

            <div className={styles.techStack}>
              <span className={styles.techLabel}>Tech Stack:</span>
              {data.techStack.map((tech: string, index: number) => (
                <span key={index} className={styles.techBadge}>
                  <span className={styles.techDot}></span>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.rightColumn}>
            {(avatarUrl || data.profileImage) && (
              <div className={`${styles.avatarContainer} ${isVisible ? styles.fadeIn : ''}`}>
                {/* Rotating gradient ring */}
                <div className={styles.avatarRing}></div>
                
                {/* Pulsing outer glow */}
                <div className={styles.avatarPulse}></div>
                
                {/* Main avatar wrapper */}
                <div className={styles.avatarWrapper}>
                  <img src={avatarUrl || data.profileImage} alt={data.name} className={styles.avatarImage} />
                  <div className={styles.avatarGlow}></div>
                </div>

                {/* Floating particles */}
                <div className={styles.floatingParticle1}></div>
                <div className={styles.floatingParticle2}></div>
              </div>
            )}
            
            <div className={`${styles.statsGrid} ${styles.rightStatsGrid} ${isVisible ? styles.fadeIn : ''}`}>
              {data.stats.map((stat: HeroStat, index: number) => (
                <div 
                  key={index} 
                  className={styles.statCard}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={styles.statCardShine}></div>
                  <div className={styles.statIcon}>
                    {stat.icon === 'clock' && (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                    )}
                    {stat.icon === 'code' && (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="16 18 22 12 16 6"/>
                        <polyline points="8 6 2 12 8 18"/>
                      </svg>
                    )}
                    {stat.icon === 'users' && (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                    )}
                    {stat.icon === 'zap' && (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                      </svg>
                    )}
                    {stat.icon === 'building' && (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.scrollIndicator}>
          <div className={styles.mouse}>
            <div className={styles.mouseWheel}></div>
          </div>
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;