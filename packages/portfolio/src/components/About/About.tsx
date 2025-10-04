import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './About.module.css';
import { portfolioData } from '../../data/PortfolioData';

type AboutData = {
  title: string;
  description: string;
  paragraphs: string[];
  interests: string[];
};

type AboutProps = {
  data: AboutData;
  isDark: boolean;
};

const About: React.FC<AboutProps> = ({ data, isDark }) => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [commitCount, setCommitCount] = useState<number | null>(null);
  const [repoCount, setRepoCount] = useState<number | null>(null);
  const [followersCount, setFollowersCount] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Education verisi (PortfolioData'dan)
  const educationItem = (portfolioData as any)?.[language]?.education?.items?.[0];

  const fetchTotalCommits = async (username: string) => {
    try {
      const res = await fetch(
        `https://api.github.com/search/commits?q=author:${username}`,
        {
          headers: {
            Accept: 'application/vnd.github.cloak-preview+json', // commit search için gerekli
          },
        }
      );
      const data = await res.json();
      if (data.total_count !== undefined) {
        setCommitCount(data.total_count);
      }
    } catch (err) {
      console.error("Commit verisi alınamadı:", err);
    }
  };
  useEffect(() => {
    fetchTotalCommits('bugracntp');
  }, []);

  // GitHub kullanıcı bilgileri (repo ve takipçi sayısı)
  useEffect(() => {
    let isCancelled = false;
    const fetchUserStats = async (username: string) => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) return;
        const data = await res.json();
        if (isCancelled) return;
        if (typeof data.public_repos === 'number') {
          setRepoCount(data.public_repos);
        }
        if (typeof data.followers === 'number') {
          setFollowersCount(data.followers);
        }
      } catch (_err) {
        // sessizce geç
      }
    };
    fetchUserStats('bugracntp');
    return () => { isCancelled = true; };
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

  // Mouse takip efekti
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas parçacık animasyonu
  useEffect(() => {
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
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.4 + 0.2;
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

    // Create particles
    for (let i = 0; i < 30; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle: Particle) => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            context.strokeStyle = isDark
              ? `rgba(239, 68, 68, ${0.05 * (1 - distance / 80)})`
              : `rgba(59, 130, 246, ${0.05 * (1 - distance / 80)})`;
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

  return (
    <section id="about" className={styles.about} ref={sectionRef}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.container}>
        {/* Section Header */}
        <div className={`${styles.header} ${isVisible ? styles.fadeIn : ''}`}>
          <span className={styles.sectionNumber}>01.</span>
          <h2 className={styles.sectionTitle}>{data.title}</h2>
          <div className={styles.divider}></div>
        </div>

        <div className={styles.content}>
          {/* Text Content */}
          <div className={`${styles.textContent} ${isVisible ? styles.slideInLeft : ''}`}>
            <div className={styles.description}>
              {data.paragraphs.map((paragraph: string, index: number) => (
                <p 
                  key={index} 
                  className={styles.paragraph}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Interests Grid 
            <div className={styles.interestsSection}>
              <h3 className={styles.interestsTitle}>
                {language === 'tr' ? 'İlgi Alanlarım' : 'My Interests'}
              </h3>
              <div className={styles.interestsGrid}>
                {data.interests.map((interest: string, index: number) => (
                  <div 
                    key={index} 
                    className={styles.interestCard}
                    style={{ animationDelay: `${0.2 + index * 0.05}s` }}
                  >
                    <span className={styles.interestIcon}>{interest.split(' ')[0]}</span>
                    <span className={styles.interestText}>{interest.substring(2)}</span>
                  </div>
                ))}
              </div>
            </div>*/}

            {/* Quick Info Cards */}
            <div className={styles.quickInfo}>
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                </div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>
                    {language === 'tr' ? 'Konum' : 'Location'}
                  </span>
                  <span className={styles.infoValue}>
                    {language === 'tr' ? 'Tokat, Türkiye' : 'Tokat, Turkey'}
                    <br />
                    {language === 'tr' ? 'Taşınmaya açık' : 'Available for Relocation'}
                  </span>
                </div>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>
                    {language === 'tr' ? 'Çalışma Durumu' : 'Work Status'}
                  </span>
                  <span className={styles.infoValue}>
                    {language === 'tr' ? 'Açık İş Fırsatları' : 'Available for Opportunities'}
                  </span>
                </div>
              </div>

              {/* Education Card */}
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 10l-10-5-10 5 10 5 10-5z"/>
                    <path d="M6 12v5c0 .6.4 1 1 1h10c.6 0 1-.4 1-1v-5"/>
                  </svg>
                </div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>
                    {language === 'tr' ? 'Eğitim' : 'Education'}
                  </span>
                  <span className={styles.infoValue}>
                      <>
                        <strong>{educationItem.school}</strong>
                        <br />
                        {educationItem.field || educationItem.degree || ''}
                        <br />
                        {educationItem.gpa}
                      </>
                  </span>
                </div>
              </div>

              
            </div>
          </div>

          {/* Visual Content */}
          <div className={`${styles.visualContent} ${isVisible ? styles.slideInRight : ''}`}>
            <div className={styles.codeWindow}>
              <div className={styles.codeHeader}>
                <div className={styles.windowButtons}>
                  <span className={styles.windowButton} style={{ background: '#ff5f56' }}></span>
                  <span className={styles.windowButton} style={{ background: '#ffbd2e' }}></span>
                  <span className={styles.windowButton} style={{ background: '#27c93f' }}></span>
                </div>
                <span className={styles.fileName}>bugra-cantepe.cs</span>
              </div>
              <div className={styles.codeContent}>
                <pre className={styles.code}>
                    {`<span class="${styles.keyword}">public class</span> <span class="${styles.className}">Developer</span>
                    {
                        <span class="${styles.keyword}">public string</span> Name { get; set; } 
                            = <span class="${styles.string}">"Buğra Çantepe"</span>;
                        
                        <span class="${styles.keyword}">public string</span> Role { get; set; } 
                            = <span class="${styles.string}">"Jr. Software Engineer"</span>;
                        
                        <span class="${styles.keyword}">public int</span> Experience { get; set; } 
                            = <span class="${styles.number}">2</span>;
                        
                        <span class="${styles.keyword}">public List<string></span> Skills { get; set; } 
                            = <span class="${styles.keyword}">new</span>()
                        {
                            <span class="${styles.string}">".NET Core"</span>,
                            <span class="${styles.string}">"Express.js"</span>,
                            <span class="${styles.string}">"React.js"</span>,
                            <span class="${styles.string}">"Vue.js"</span>
                            <span class="${styles.string}">"Node.js"</span>,
                            <span class="${styles.string}">"SQL"</span>,
                            <span class="${styles.string}">"RESTful API"</span>,
                            <span class="${styles.string}">"Microservices"</span>,

                        };
                        
                        <span class="${styles.keyword}">public void</span> <span class="${styles.method}">Code</span>()
                        {
                            <span class="${styles.keyword}">while</span> (<span class="${styles.boolean}">true</span>)
                            {
                                Console.WriteLine(
                                    <span class="${styles.string}">"Building amazing things!"</span>
                                );
                            }
                        }
                    }`}
                </pre>
              </div>
            </div>

            {/* Floating Stats */}
            <div className={styles.floatingStats}>
              <div className={styles.statBubble} style={{ animationDelay: '0s' }}>
                <span className={styles.statNumber}>{commitCount ? commitCount : '0'}+</span>
                <span className={styles.statLabel}>Commits</span>
              </div>
              <div className={styles.statBubble} style={{ animationDelay: '0.2s' }}>
              <span className={styles.statNumber}>{repoCount != null ? repoCount : '0'}+</span>
                <span className={styles.statLabel}>Repositories</span>
              </div>
              <div className={styles.statBubble} style={{ animationDelay: '0.4s' }}>
              <span className={styles.statNumber}>{followersCount != null ? followersCount : '0'}+</span>
                <span className={styles.statLabel}>Followers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className={styles.bgDecoration}>
        <div className={styles.gridPattern}></div>
        {/* Hero'dan About'a geçiş için gradient orb'lar */}
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gradientOrb3}></div>
        <div className={styles.gradientOrb4}></div>
        <div className={styles.gradientOrb5}></div>
        
        {/* Işık ışınları */}
        <div className={styles.lightBeam1}></div>
        <div className={styles.lightBeam2}></div>
        <div className={styles.lightBeam3}></div>
        
        {/* Parçacık efektleri */}
        <div className={styles.particle1}></div>
        <div className={styles.particle2}></div>
        <div className={styles.particle3}></div>
        <div className={styles.particle4}></div>
        
        {/* Mouse takipli ışık */}
        <div 
          className={styles.mouseLight}
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
          }}
        ></div>
      </div>
    </section>
  );
};

export default About;